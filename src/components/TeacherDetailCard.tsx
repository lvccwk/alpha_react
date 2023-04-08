import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';

import './TeacherDetailCard';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTeacher } from '../api/fetchAll';

function TeacherDetailCard() {
    const params = useParams()
    const teacherId = Object.values(params)[0]
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["teacherDetailCard"],
        queryFn: () => fetchTeacher(Number(teacherId)),
    });
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{data?.user.username} 時間表</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>
                    <IonItem>
                        <IonThumbnail slot="start">
                            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                        </IonThumbnail>
                        <IonLabel>Item</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonThumbnail slot="start">
                            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                        </IonThumbnail>
                        <IonLabel>Item</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonThumbnail slot="start">
                            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                        </IonThumbnail>
                        <IonLabel>Item</IonLabel>
                    </IonItem>

                    <IonItem lines="none">
                        <IonThumbnail slot="start">
                            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                        </IonThumbnail>
                        <IonLabel>Item</IonLabel>
                    </IonItem>
                </IonList>
            </IonCardContent>
        </IonCard>
    );
}
export default TeacherDetailCard;