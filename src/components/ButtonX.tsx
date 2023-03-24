import { IonButton, IonButtons, IonIcon } from "@ionic/react";
import { addCircle, closeCircle, star } from "ionicons/icons";
import React from "react";

function ButtonX() {
    return (

        <IonButtons slot="end">
            <IonButton>
                <IonIcon slot="icon-only" icon={closeCircle}></IonIcon>
            </IonButton>
        </IonButtons>


    );
}
export default ButtonX;