import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/react';

import './TeacherCard.css';
import { fetchTeacher, fetchUserAll } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import AddToCartBtn from './AddToCartBtn';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'

interface Teacher {
    id: number;
    info: string;
}

function TeacherCard() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: () => fetchTeacher(),
    });

    return (
        <>
            {Array.isArray(data) && data.map((item: Teacher) => (
                <IonCard key={item.id}>
                    <img alt="Silhouette of mountains" src={photo} />
                    {/* <IonCardTitle>${item.id}</IonCardTitle> */}
                    <IonCardContent>${item.info}</IonCardContent>
                </IonCard>
            ))}
        </>
    );
}
export default TeacherCard;