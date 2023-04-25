import React from 'react';
import { IonAvatar, IonContent } from '@ionic/react';
import './Avatar.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function Avatar() {
    const params = useParams()
    const teacherId = Object.values(params)[0]
    return (
        <>
            <IonAvatar className='userPhoto'>
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>

        </>
    );
}
export default Avatar;