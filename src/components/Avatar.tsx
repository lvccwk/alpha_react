import React from 'react';
import { IonAvatar, IonContent } from '@ionic/react';
import './Avatar.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTeacher } from '../api/fetchAll';
function Avatar() {
    const params = useParams()
    const teacherId = Object.values(params)[0]
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["userProfileImage"],
        queryFn: () => fetchTeacher(Number(teacherId)),
    });
    return (
        <>
            <IonAvatar>
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>

        </>
    );
}
export default Avatar;