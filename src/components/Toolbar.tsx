import React from "react";
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar, useIonActionSheet } from '@ionic/react';
import '../components/ActionSheet';
import { personCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./Toolbar.css"
import Refresh from "./Refresh";
import { useDispatch } from "react-redux"
import { useAppSelector } from "../redux/store";



function ToolBar() {
    const history = useHistory();
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)

    const handleUser = () => {
        if(isLoggedIn){
            history.push('/userprofile');
            console.log('yesLOGIN');
       } else {
            history.push('/login');
            console.log('noLOGIN');
       }  
    }

    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="end">
                    <IonIcon slot="icon-only" icon={personCircle} onClick={handleUser} ></IonIcon>
                </IonButtons>
                <IonTitle>Alpha Learning</IonTitle>
            </IonToolbar>
        </IonHeader >
    );
}
export default ToolBar;

