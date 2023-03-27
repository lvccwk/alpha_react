import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import Toolbar from '../components/Toolbar';
import { fetchUser, fetchDeleteUser, fetchUpdateUser } from "../api/fetchUser";
import EditUserProfile from '../components/EditUserProfile';

export default function UserProfile() {
  const dispatch = useDispatch();
  const [newUserData, setNewUserData] = useState({
    id: 2,
    username: '',

  }); // State to hold updated user data
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(2), //redux login state,
    // enabled: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  // const callAPI = (cb: ({ ...params }: any) => Promise<any>) => {
  //   useMutation(cb, {
  //     onSuccess: () => {
  //       refetch(); // Refresh user data after update
  //     },
  //     onError: (error) => {
  //       console.error("Failed to update user: ", error);
  //     },
  //   });
  // }
  const { mutate: handleUpdateUser } = useMutation(fetchUpdateUser, {
    onSuccess: () => {
      console.log("handleUpdateUser")
      refetch(); // Refresh user data after update
    },
    onError: (error) => {
      console.error("Failed to update user: ", error);
    },
  });


  const { mutate: handleDeleteUser } = useMutation(fetchDeleteUser, {
    onSuccess: () => {
      console.log("handleDeleteUser")
      refetch(); // Refresh user data after update
    },
    onError: (error) => {
      console.error("Failed to update user: ", error);
    },
  });

  useIonViewWillEnter(() => {
    refetch()
  })

  if (error) {
    return (
      <IonPage>
        <Toolbar />
        <IonContent>
          <div>
            Error: {JSON.stringify(error)}
            成功刪除用戶
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
            <div>
              <input
                type="text"
                placeholder="New username"
                onChange={(e) =>
                  setNewUserData({
                    ...newUserData,
                    username: e.target.value,
                  })
                }
              />
              <button onClick={() => handleUpdateUser(newUserData)}>Update User</button>
            </div>
            <button onClick={() => handleDeleteUser(2)}>DEL !!!!</button>
            <div>Delete Account Button</div>
          </div>

        </IonContent>
      </IonPage>
    );
  }
}
