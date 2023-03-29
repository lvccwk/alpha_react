import { AlertButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPopover, IonThumbnail, useIonAlert } from "@ionic/react";
import { addCircle, closeCircle, filter, star } from "ionicons/icons";
import React from "react";
import AddToCartBtn from "./AddToCartBtn";
import Card from "./Card";
import DeleteButton from "./DeleteButton";
import './SubjectFilterList.css';

function SubjectFilterList() {
    return (
          <IonList> 
            <IonItem onClick={() =>console.log('HI')}>
              中文
            </IonItem>
            <IonItem>
              英文
            </IonItem>
            <IonItem>
              數學
            </IonItem>
          </IonList>
    );
}
export default SubjectFilterList;