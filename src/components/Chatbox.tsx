import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';
import { useQuery } from "@tanstack/react-query";
import './ListCard.css';
import ButtonX from './ButtonX';
import {
    fetchUserAll
} from "../api/fetchAll";

function Chatbox() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: () => fetchUserAll(1), //redux login state
    });


    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle >Card Title</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                Here's a small text description for the card content. Nothing more, nothing less.
            </IonCardContent>
        </IonCard>
    );
}
export default Chatbox;

