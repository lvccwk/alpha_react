import { IonButton, IonButtons, IonIcon } from "@ionic/react";
import { addCircle, closeCircle, star } from "ionicons/icons";
import React from "react";

function DeleteButton() {
    return (

        <IonButtons>
            <IonButton>
                <IonIcon slot="icon-only" icon={closeCircle}></IonIcon>
            </IonButton>
        </IonButtons>


    );
}
export default DeleteButton;