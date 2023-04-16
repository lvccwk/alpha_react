import { IonContent, IonPage, IonGrid, useIonViewWillEnter, IonButton, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent, IonIcon } from '@ionic/react';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import Toolbar from '../components/Toolbar';
import DeleteUserAlert from '../components/DeleteUserAlert';
import { fetchUser, fetchDeleteUser, fetchUpdateUser } from "../api/fetchUser";
import { userLogout } from "../redux/userSlice";
import { useAppSelector } from "../redux/store";
import jwtDecode from 'jwt-decode';
import './../../src/components/UiDesign/UserProfile.css'
import Avatar from '../components/Avatar';
import { exitOutline, power } from 'ionicons/icons';

export default function UserProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useAppSelector(state => state.user.id)
  const loggedIn = useAppSelector(state => state.user.isLoggedIn)

  console.log("id", id)
  console.log("login:", loggedIn)

  const handleEditProfile = () => {
    history.push('/userprofilesettings');
  }

  const handleLogout = () => {
    remove()
    dispatch(userLogout());
    console.log("yesLOGOUT");
    history.push("/home")
  }

  const handlePurchaseHistory = () => {
    history.push("/purchasehistory")
  }

  const { data, isLoading, error, refetch, remove } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(), //redux login state,
    // enabled: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  console.log(data)
  console.log('teacher_id', data?.teacher[0].id)
  const teacher_id = (Number(data?.teacher[0]?.id))

  const handleRedirectUpload = () => {
    history.push(`/uploadproduct/${teacher_id}`)
  }

  const handleAvailableTime = () => {
    history.push(`/availabletime/${teacher_id}`)
  }

  useIonViewWillEnter(() => {
    console.log("ionViewWillEnter")
    refetch()
  })

  if (error) {
    return (
      <IonPage>
        <Toolbar />
        <IonContent className='ion-padding'>
          <div className='userprofile'>
            錯誤: {JSON.stringify(error)}
          </div>
        </IonContent>
      </IonPage>
    )
  }
  if (data?.user_type !== 'student') {
    console.log('teacher')
    return (
      <IonPage className='userprofilepage'>
        <Toolbar />
        <IonContent className='userCard'>
          <IonButton className='exitbtn' color="danger" onClick={handleLogout}><IonIcon icon={power} className='exit' ></IonIcon></IonButton>
          <div className='userlogo'><Avatar /></div>
          <IonCard className='profileCard' >

            <div className='CardContent'>
              <IonCardHeader >
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                <IonCardTitle>{data?.username}</IonCardTitle>
                <br /> <br /><br />
              </IonCardHeader>

              <IonCardContent className='userButtonContainer' >
                <IonButton className='userButtonleft' onClick={handleEditProfile}>更改個人資料</IonButton>
                <IonButton className='userButtonright' onClick={handlePurchaseHistory}>購買資料</IonButton>
              </IonCardContent>

            </div>
            <br /><br /><br /><br /><br /><br />
          </IonCard>

          <IonCard className='infocardDetail'>

            <div className='infocardInside'>
              <br /> <br />
              用戶名稱: {data?.username}
              <br />
              用戶類別 : {data?.user_type}
              <br />
              電郵 : {data?.email}
              <br />
              <IonCardContent className='userButtonContainer' >
                <IonButton className='userButtonleft' onClick={handleRedirectUpload}>上載課程/筆記</IonButton>
                <IonButton className='userButtonright' onClick={handlePurchaseHistory}>上載記錄</IonButton>
              </IonCardContent>
              {/* <IonButton onClick={handleRedirectUpload}>UPLOAD COURSE / NOTES</IonButton> */}
              <br /><br /><br />
              <DeleteUserAlert />
            </div>

            <br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br />
          </IonCard>
        </IonContent>
      </IonPage>
    );
  } else {
    //if (error) return <div>Error: {error.message}</div>;
    console.log('student')
    return (
      <div>學生版</div>
    );
  }
}
