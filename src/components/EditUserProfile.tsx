import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  useIonViewWillEnter,
} from "@ionic/react";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import { useAppSelector } from "../redux/store";

import {
  FetchUserModel,
  fetchUser,
  fetchUpdateUser,

} from "../api/fetchUser";

export default function EditUserProfile() {
  const id = useAppSelector(state => state.user.id)
  const { data: user, isLoading, error, refetch } = useQuery<FetchUserModel>({
    queryKey: ["userEditProfile"],
    queryFn: () => fetchUser(), //redux login state,
    // enabled: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  const { register, handleSubmit, setValue } = useForm<FetchUserModel>({
  })

  useEffect(() => {
    console.log(user)
    if (user) {
      setValue("username", user ? user.username : "")
      setValue("password", user ? user.password : "")
      setValue("email", user ? user.email : "")
    }
  }, [user])

  const fetchUpdateItem = useMutation(fetchUpdateUser, {
    onSuccess(data, variables, context) {
      refetch();
    },
    onError: (error) => {
      console.error("Failed to update user: ", error);
    },
  });

  const onSubmit = (state: FetchUserModel) => {
    console.log(state)
    fetchUpdateItem.mutate(state);
  }
  const history = useHistory();
  const onClickHomePage = () => {
    history.push('/userprofile');
  }
  return (
    <div>
      <form id="edit-profile" onSubmit={handleSubmit(onSubmit)}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonInput {...register("username")} />
              <IonInput {...register("password")} />
              <IonInput readonly {...register("email")} />
            </IonCol>
            <IonCol>
              <IonButton type="submit" form={"edit-profile"} >Update</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </div>
  )
}