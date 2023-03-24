import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';

import './ListCard.css';
import ButtonX from './ButtonX';

function ListCard() {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Card Title</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>
                    <IonItem>
                        <IonThumbnail slot="start">
                            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                        </IonThumbnail>
                        <IonLabel>Item</IonLabel><ButtonX />

                    </IonItem>

                    <IonItem>
                        <IonThumbnail slot="start">
                            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                        </IonThumbnail>
                        <IonLabel>Item</IonLabel><ButtonX />
                    </IonItem>

                    <IonItem>
                        <IonThumbnail slot="start">
                            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                        </IonThumbnail>
                        <IonLabel>Item</IonLabel><ButtonX />
                    </IonItem>

                    <IonItem lines="none">
                        <IonThumbnail slot="start">
                            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                        </IonThumbnail>
                        <IonLabel>Item</IonLabel><ButtonX />
                    </IonItem>
                </IonList>
            </IonCardContent>
        </IonCard>
    );
}
export default ListCard;