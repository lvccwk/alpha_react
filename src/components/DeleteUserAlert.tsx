import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonAlert, useIonAlert } from '@ionic/react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router';
import { useAppSelector } from "../redux/store";
import { userLogout } from "../redux/userSlice";
import { fetchDeleteUser } from "../api/fetchUser";


function DeleteUserAlert(){
    const [presentAlert] = useIonAlert();
    // const [handlerMessage, setHandlerMessage] = useState('');
    // const [roleMessage, setRoleMessage] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const id = useAppSelector(state => state.user.id)
    const loggedIn = useAppSelector(state => state.user.isLoggedIn)
    return (
      <IonButton
      onClick={() =>
          presentAlert({
              header: 'ARE YOU SURE TO DELETE YOUR ACCOUNT?',
              // subHeader: '',
              // message: '',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                },
                {
                  text: 'OK',
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
      DELETE ACCOUNT
  </IonButton>
    );
} 

export default DeleteUserAlert;
