import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './UiCard.css'
function UiCard() {
    return (
        <IonCard>
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
        </IonCard>
    );
}
export default UiCard;