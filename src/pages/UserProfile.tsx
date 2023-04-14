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
import { exitOutline } from 'ionicons/icons';

export default function UserProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useAppSelector(state => state.user.id)
  const loggedIn = useAppSelector(state => state.user.isLoggedIn)

  console.log("id", id)
  console.log("login:", loggedIn)
  // const [userData, setUserData] = useState({
  //   id: "",
  //   //username: '',

  // }); // State to hold updated user data

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
  // console.log(data)
  // console.log('teacher_id', data?.teacher[0].id)
  const teacher_id = (Number(data?.teacher[0].id))

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
        <IonContent className='ion-padding'>
          <IonButton className='exitbtn' onClick={handleLogout}><IonIcon icon={exitOutline} className='exit' color="white"  ></IonIcon></IonButton>
          <IonCard className='profileCard' >
            <div className='userlogo'><Avatar /></div>
            <IonCardHeader>
              {/* <IonButton onClick={handleEditProfile}>EDIT USER PROFILE</IonButton>
              <IonButton onClick={handlePurchaseHistory}>PURCHASE HISTORY</IonButton>
              <IonButton onClick={handleRedirectUpload}>UPLOAD COURSE / NOTES</IonButton>
              <IonButton onClick={handleAvailableTime}>UPLOAD Available_time</IonButton> */}
              <h1>老師版</h1>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              <IonCardTitle>{data?.username}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              用戶名稱: {data?.username}
              <br></br>
              用戶類別 : {data?.user_type}
              <br></br>
              電郵 : {data?.email}
            </IonCardContent>
            <IonCardHeader>
              <IonButton onClick={handleEditProfile}>EDIT USER PROFILE</IonButton>
              <IonButton onClick={handlePurchaseHistory}>PURCHASE HISTORY</IonButton>
              <IonButton onClick={handleRedirectUpload}>UPLOAD COURSE / NOTES</IonButton>
              <IonButton onClick={handleAvailableTime}>UPLOAD Available_time</IonButton>
            </IonCardHeader>
          </IonCard>

          <div className='userprofile'>
            <br></br>

            <br></br>
            <DeleteUserAlert />
          </div>
        </IonContent>
      </IonPage>
    );
  } else {
    //if (error) return <div>Error: {error.message}</div>;
    console.log('student')
    return (
      <IonPage className='userprofilepage'>
        <Toolbar />
        <IonContent className='ion-padding'>

          <IonButton className='exitbtn' onClick={handleLogout}><IonIcon icon={exitOutline} className='exit' color="white"  ></IonIcon></IonButton>

          <IonCard className='profileCard' >
            <div className='userlogo'><Avatar /></div>
            <IonCardHeader>
              <IonButton onClick={handleEditProfile}>EDIT USER PROFILE</IonButton>
              <IonButton onClick={handlePurchaseHistory}>PURCHASE HISTORY</IonButton>
              <h1>學生版</h1>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              <IonCardTitle>{data.username}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              用戶名稱: {data.username}
              <br></br>
              用戶類別 : {data.user_type}
              <br></br>
              12321電郵 : {data.email}
            </IonCardContent>
          </IonCard>
          <div className='userprofile'>
            <br></br>

            <br></br>
            <DeleteUserAlert />
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
