import React from "react";
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar, useIonActionSheet } from '@ionic/react';
import '../components/ActionSheet';
import { personCircle } from "ionicons/icons";

function ToolBar() {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="end">
                    <IonButton>
                        <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonTitle>Alpha Learning</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
}
export default ToolBar;

