import React from 'react';
import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel } from '@ionic/react';
import { fetchTeacher } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import AddToCartBtn from './AddToCartBtn';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory } from 'react-router-dom';
import './TeacherDetail.css';


interface Teacher {
    id: number;
    info: string;
    username: string;
    user: any;
}

function TeacherDetail() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["teacherDetail"],
        queryFn: () => fetchTeacher(1),
    });

    // const history = useHistory();
    // const onClickEditProfile = () => {
    //     history.push('/tutorprofile');
    // }

    console.log(data)
    return (
        <>

            <IonCard>
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                <IonCardHeader>
                    <IonCardTitle>{data?.info}</IonCardTitle>

                    <IonCardSubtitle>{data?.user.username}Card Subtitle</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                    Here's a small text description for the card content. Nothing more, nothing less.
                </IonCardContent>
            </IonCard>

        </>
    );
}
export default TeacherDetail;