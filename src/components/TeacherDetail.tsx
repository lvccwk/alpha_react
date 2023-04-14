import { useEffect, useRef, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { fetchTeacher } from '../api/fetchAll';
import TeacherBookmark from './TeacherBookmark';
import { useQuery } from '@tanstack/react-query';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory, useParams } from 'react-router-dom';
import './TeacherDetail.css';
import Avatar from './Avatar';
import TimePicker from './TimePicker';
import DateTime from './DateTime';

function TeacherDetail() {
    const params = useParams()
    const teacherId = Object.values(params)[0]
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["teacherDetail"],
        queryFn: () => fetchTeacher(Number(teacherId)),
    });

    console.log(`TeacherId =`, teacherId)

    const history = useHistory();
    const onClickAppoinmentPage = (id: number) => {
        history.push(`/timeslot/` + id);
    }

    const onClickContactPage = (id: number) => {
        history.push(`/chatroom/` + id);
    }
    return (
        <>
            <IonCard>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                    <IonButton onClick={() => onClickAppoinmentPage(Number(teacherId))}>預約 {data?.user.username}</IonButton>  <IonButton onClick={() => onClickContactPage(Number(teacherId))}>聯絡 {data?.user.username}</IonButton>
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>  <Avatar /></div>
                <IonCardTitle>{data?.user.username}</IonCardTitle>
                <IonCardSubtitle>Email : {data?.user.email}</IonCardSubtitle>
                <IonCardSubtitle>教學年資： 1</IonCardSubtitle>

                <TeacherBookmark />
                <img alt="Silhouette of mountains" src={photo} />
                <IonCardContent>
                    <IonCardSubtitle>導師介紹</IonCardSubtitle><br></br>
                    {data?.info}
                </IonCardContent>
                <IonCardContent className="ion-padding">
                    <div style={{ display: 'flex', justifyContent: 'center' }}><h2>{data?.user.username} 的時間表</h2> </div>
                    <br></br>
                    <DateTime />
                </IonCardContent>
                {/* <TimePicker /> */}
            </IonCard>

        </>
    );
}
export default TeacherDetail;