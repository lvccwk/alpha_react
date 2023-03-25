import { IonContent, IonPage } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
//import { UserState } from "../redux/userSlice";
import { IRootState } from "../redux/store";

import {
  fetchUser, fetchDeleteUser
} from "../api/fetchUser";
import Toolbar from '../components/Toolbar';


export default function UserProfile() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(2), //redux login state
  });
  //const [user, setUser] = useState();

  if (isLoading || !data) {
    return (
      <IonPage>
        <Toolbar />
        <IonContent>
          <div>
            LOADING12312
          </div>
        </IonContent>
      </IonPage>
    );
  } else {
    //if (error) return <div>Error: {error.message}</div>;
    return (
      <IonPage>
        <Toolbar />
        <IonContent>
          <div>
            <div>Profile</div>
            <div>{data.image}/</div>
            <div>{data.username}/</div>
            <div>{data.user_type}/</div>
            <div>{data.email}/</div>
            <div>Edit Profile</div>
            <button onClick={() => fetchDeleteUser(2)}
            >DEL !!!! </button>
            <div>Delete Account Button</div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}