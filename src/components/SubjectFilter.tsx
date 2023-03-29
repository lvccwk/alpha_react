import { AlertButton, IonButton, IonButtons, IonContent, IonIcon, IonPopover, useIonAlert } from "@ionic/react";
import { addCircle, closeCircle, filter, star } from "ionicons/icons";
import React from "react";
import AddToCartBtn from "./AddToCartBtn";
import Card from "./Card";
import './SubjectFilter.css';
import SubjectFilterList from "./SubjectFilterList";

function SubjectFilter() {
    return (
        <IonButtons>
            <IonButton id="click-trigger">
                <IonIcon slot="icon-only" icon={filter}></IonIcon>
            </IonButton>
            <IonPopover trigger="click-trigger" triggerAction="click">
                <SubjectFilterList />
            </IonPopover> 
        </IonButtons>
    );
}
export default SubjectFilter;

