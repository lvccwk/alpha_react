import React from "react";
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar, useIonActionSheet } from '@ionic/react';
import '../components/ActionSheet';
import { personCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./Toolbar.css"
import Refresh from "./Refresh";


function ToolBar() {
    const history = useHistory();
    const onClickUser = () => {
        history.push('/userprofile');
    }
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="end">
                    <IonIcon slot="icon-only" icon={personCircle} onClick={onClickUser} ></IonIcon>
                </IonButtons>
                <IonTitle>Alpha Learning</IonTitle>
            </IonToolbar>
        </IonHeader >
    );
}
export default ToolBar;

