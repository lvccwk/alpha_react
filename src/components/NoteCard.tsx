import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';
import { useQuery } from "@tanstack/react-query";
import './ListCard.css';
import ButtonX from './ButtonX';
import {
    fetchTeacher,
    fetchUserAll
} from "../api/fetchAll";
import ToolBar from './Toolbar';

interface Any {
    id: number;
    info: string;
}


function ListCard() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: () => fetchTeacher(), //redux login state
    });

    return (
        <>
            {Array.isArray(data) && data.map((item: Any) => (
                <IonCard key={item.id}>
                    <ToolBar />
                    <IonCardContent>
                        <IonList>
                            <IonItem>
                                <IonThumbnail slot="start">
                                    <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                                </IonThumbnail>
                                <IonLabel>${item.id}</IonLabel><ButtonX />
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>
            ))}
        </>
    );
}
export default ListCard;