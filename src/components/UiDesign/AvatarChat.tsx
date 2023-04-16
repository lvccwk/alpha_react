import React from 'react';
import { IonAvatar, IonContent } from '@ionic/react';
// import './Avatar.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTeacherAll } from '../../api/fetchAll';
// import { fetchTeacher } from '../api/fetchAll';
function AvatarChat() {
    // const params = useParams()
    // const teacherId = Object.values(params)[0]
    // const { data: teacherAll, isLoading, error, refetch } = useQuery({
    //     queryKey: ["chatRoomGetTeacher"],
    //     queryFn: () => fetchTeacherAll(),
    // });
    return (
        <>
            <IonAvatar>
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>

        </>
    );
}
export default AvatarChat;