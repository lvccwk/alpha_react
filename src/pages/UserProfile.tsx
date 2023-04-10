import { IonContent, IonPage, IonGrid, useIonViewWillEnter, IonButton, IonCard, IonCardTitle, IonCardSubtitle } from '@ionic/react';
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
    dispatch(userLogout());
    console.log("yesLOGOUT");
    history.push("/home")
  }

  const handlePurchaseHistory = () => {
    history.push("/purchasehistory")
  }


  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(), //redux login state,
    // enabled: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

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
  if (isLoading || !data) {
    return (
      <IonPage>
        <Toolbar />
        <IonContent className='ion-padding'>
          <div className='userprofile'>
            資料載入中...
          </div>
        </IonContent>
      </IonPage>
    );
  } else {
    //if (error) return <div>Error: {error.message}</div>;
    return (
      <IonPage className='userprofilepage'>
        <Toolbar />
        <IonContent className='ion-padding'>
          <div className='userlogo'><Avatar /></div>

          <div className='userprofile'>

            <IonCard className='profileCard'>
              <IonContent>
                <IonCardTitle>個人資料</IonCardTitle>
                {/* <IonContent>|{data.image}</IonContent> */}
                <IonCardSubtitle>USERNAME|{data.username}</IonCardSubtitle>
                <IonCardSubtitle>USERTYPE|{data.user_type}</IonCardSubtitle>
                <IonCardSubtitle>EMAIL|{data.email}</IonCardSubtitle>
              </IonContent>
            </IonCard>
            <IonButton onClick={handleEditProfile}>EDIT USER PROFILE</IonButton>
            <br></br>
            <IonButton onClick={handlePurchaseHistory}>PURCHASE HISTORY</IonButton>
            <br></br>
            <IonButton onClick={handleLogout}>LOGOUT</IonButton>
            <br></br>
            <DeleteUserAlert />
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
