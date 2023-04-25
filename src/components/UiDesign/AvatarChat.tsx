import React from 'react';
import { IonAvatar, IonContent } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTeacherAll } from '../../api/fetchAll';

function AvatarChat() {

    return (
        <>
            <IonAvatar>
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>

        </>
    );
}
export default AvatarChat;