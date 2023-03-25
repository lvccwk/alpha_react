import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';
import { useQuery } from "@tanstack/react-query";
import './ListCard.css';
import ButtonX from './ButtonX';
import {
    fetchUserAll
} from "../api/fetchAll";

function ListCard() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: () => fetchUserAll(1), //redux login state
    });


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
                        <IonLabel>$123</IonLabel><ButtonX />

                    </IonItem>

                    {/* <IonItem>
                        <IonThumbnail slot="start">
                            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                        </IonThumbnail>
                        <IonLabel>Item</IonLabel><ButtonX />
                    </IonItem> */}

                </IonList>
            </IonCardContent>
        </IonCard>
    );
}
export default ListCard;