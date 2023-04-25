import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonCol,
  IonContent,
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
import Avatar from "./Avatar";
import './../../src/components/UiDesign/UserProfile.css'
import AvatarChat from "./UiDesign/AvatarChat";



export default function EditUserProfile() {
  const [showAlert, setShowAlert] = useState(false);
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
    if (user) {
      setValue("username", user ? user.username : "")
      setValue("password", user ? user.password : "")
      setValue("email", user ? user.email : "")
    }
  }, [user])

  const fetchUpdateItem = useMutation(fetchUpdateUser, {
    onSuccess(data, variables, context) {
      refetch();
      setShowAlert(true);
    },
    onError: (error) => {
      console.error("Failed to update user: ", error);
    },
  });

  const onSubmit = (state: FetchUserModel) => {
    fetchUpdateItem.mutate(state);
  }

  const history = useHistory();
  const onClickHomePage = () => {
    history.push('/userprofile');
  }


  return (

    <IonCard className="editProfilCard">
      <IonCardHeader>
        <IonCardTitle> 編輯個人資料 </IonCardTitle>
        <div className='userlogo'> </div>
      </IonCardHeader>
      <IonCardContent>
        <form className='editProfileSetting' id="edit-profile" onSubmit={handleSubmit(onSubmit)}>用戶名稱
          <IonInput aria-label="Custom input" class="custom" {...register("username")} /><br></br>密碼
          <IonInput aria-label="Custom input" type="password" class="custom" {...register("password")} /><br></br>*電郵不能更改
          <IonInput aria-label="Custom input" class="custom" readonly {...register("email")} /><br></br>
          <IonButton type="submit" form={"edit-profile"} >更新</IonButton>
        </form>
      </IonCardContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'更新成功'}
        message={'您的個人資料已更新。'}
        buttons={['確定']}
        onClick={onClickHomePage}
      />
    </IonCard>
  )
}