import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import Toolbar from '../components/Toolbar';
import { fetchUser, fetchDeleteUser, fetchUpdateUser} from "../api/fetchUser";
import { fbLogin, userLogout } from "../redux/userSlice";
import { useAppSelector } from "../redux/store";
import jwtDecode from 'jwt-decode';


export default function UserProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useAppSelector(state => state.user.id)
  const log = useAppSelector(state => state.user.isLoggedIn)
  console.log("id", id)
  console.log("login:", log)
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
        <IonContent>
          <div>
            Error: {JSON.stringify(error)}
          </div>
        </IonContent>
      </IonPage>
    )
  }
  if (isLoading || !data) {
    return (
      <IonPage>
        <Toolbar />
        <IonContent>
          <div>
            LOADING11232131
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
            <h1>Profile</h1>
            <div>IMAGE|{data.image}</div>
            <div>USERNAME|{data.username}</div>
            <div>USERTYPE|{data.user_type}</div>
            <div>EMAIL|{data.email}</div>
            {/* <div>
              <input
                type="text"
                placeholder="New Username"
                onChange={(e) =>
                  setNewUserData({
                    ...newUserData,
                    username: e.target.value,
                  })
                }
              />
              <button onClick={() => handleUpdateUser(newUserData)}>Update User</button>
            </div>
            <button onClick={() => handleDeleteUser(2)}>DEL !!!!</button> */}

            <button onClick={handleEditProfile}>EDIT USER PROFILE</button>
            <br></br>
            <button>PURCHASE HISTORY</button>
            <br></br>
            <button onClick={handleLogout}>LOGOUT</button>
          </div>

        </IonContent>
      </IonPage>
    );
  }
}
