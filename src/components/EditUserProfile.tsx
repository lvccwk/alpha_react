import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonCol,
  IonContent,
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
import './../../src/components/UiDesign/EditProfile.css'
import {
  FetchUserModel,
  fetchUser,
  fetchUpdateUser,

} from "../api/fetchUser";
import Avatar from "./Avatar";

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
      <IonCard className="editProfilCard">
        {/* <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" /> */}
        <IonCardHeader>
          <IonCardTitle> 編輯個人資料 </IonCardTitle>
          <div className='userlogo'><Avatar /></div>

          {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
        </IonCardHeader>
        <IonCardContent>
          <form className='editProfileSetting' id="edit-profile" onSubmit={handleSubmit(onSubmit)}>
            <IonInput aria-label="Custom input" class="custom" {...register("username")} /><br></br>
            <IonInput aria-label="Custom input" class="custom" {...register("password")} /><br></br>
            <IonInput aria-label="Custom input" class="custom" readonly {...register("email")} /><br></br>
            <IonButton type="submit" form={"edit-profile"} >Update</IonButton>
          </form>
        </IonCardContent>
      </IonCard>
    </div >
  )
}