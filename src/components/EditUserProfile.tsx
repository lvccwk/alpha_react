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
    queryKey: ["user"],
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
  });

  const onSubmit = (state: FetchUserModel) => {
    console.log(state)
    fetchUpdateItem.mutate(state);
  }
  const history = useHistory();
  const onClickHomePage = () => {
    history.push('/home');
  }
  return (
    <div>
      <form id="edit-profile" onSubmit={handleSubmit(onSubmit)}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonInput
                {...register("username")}
              ></IonInput>
              <IonInput
                {...register("password")}
              ></IonInput>
              <IonInput
                {...register("email")}
              ></IonInput>
            </IonCol>
            <IonCol>
              <IonButton type="submit" form={"edit-profile"} onClick={onClickHomePage}>Update</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </div>
  )
}