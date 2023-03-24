import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import './Card.css';
import Alert from './Alert';









function Card() {
    return (
        <IonCard>
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
            <IonCardHeader>
                <IonCardTitle>$ 100 </IonCardTitle>
                <IonCardSubtitle>中文筆記</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>

                <Alert />
            </IonCardContent>

        </IonCard>
    );
}
export default Card;