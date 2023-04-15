import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonAlert, useIonAlert } from '@ionic/react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router';
import { useAppSelector } from "../redux/store";
import { userLogout } from "../redux/userSlice";
import { fetchDeleteUser } from "../api/fetchUser";


function DeleteUserAlert() {
  const [presentAlert] = useIonAlert();
  // const [handlerMessage, setHandlerMessage] = useState('');
  // const [roleMessage, setRoleMessage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useAppSelector(state => state.user.id)
  const loggedIn = useAppSelector(state => state.user.isLoggedIn)
  return (
    <IonButton color={'danger'}
      onClick={() =>
        presentAlert({
          header: '確定要刪除您的帳戶嗎?',
          // subHeader: '',
          // message: '',
          buttons: [
            {
              text: '取消',
              role: 'cancel',
            },
            {
              text: '確定',
              handler: () => { //logic
                if (loggedIn) {
                  fetchDeleteUser()
                  dispatch(userLogout());
                  history.push('/');
                }

              },
            },
          ],
        })
      }
    >
      刪除帳戶
    </IonButton>
  );
}

export default DeleteUserAlert;
