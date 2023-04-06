import { IonButton, IonButtons, IonIcon } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { addCircle, closeCircle, star } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../redux/store";

function DeleteButton() {


    return (

        <IonButtons>
            <IonButton>
                <IonIcon slot="icon-only" icon={closeCircle} ></IonIcon>
            </IonButton>
        </IonButtons>


    );
}
export default DeleteButton;