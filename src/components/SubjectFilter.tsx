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
            <IonButton onClick={() => console.log('Hi')}>
                <IonIcon slot="icon-only" icon={filter}></IonIcon>
            </IonButton>
            <div className="d-none chinese">中文</div>
            <div className="d-none subject">英文</div>
            <div className="d-none subject">數學</div>
        </IonButtons>
    );
}
export default SubjectFilter;

