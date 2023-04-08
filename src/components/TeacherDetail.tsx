import { useEffect, useRef, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { fetchTeacher } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useParams } from 'react-router-dom';
import './TeacherDetail.css';
import Avatar from './Avatar';

function TeacherDetail() {
    const params = useParams()
    const teacherId = Object.values(params)[0]
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["teacherDetail"],
        queryFn: () => fetchTeacher(Number(teacherId)),
    });

    console.log(`TeacherId =`, data?.id)

    const [visitCount, setVisitCount] = useState(0);
    const visitCountRef = useRef(0);
    useEffect(() => {
        const storedCount = localStorage.getItem('visitCount');
        if (storedCount) {
            setVisitCount(parseInt(storedCount) + 1);
            visitCountRef.current = parseInt(storedCount) + 1;
        } else {
            setVisitCount(1);
            visitCountRef.current = 1;
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('visitCount', String(visitCountRef.current));
    }, [visitCount]);


    return (
        <>
            <IonCard>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                    <IonButton>預約 {data?.user.username}</IonButton>  <IonButton>聯絡 {data?.user.username}</IonButton>
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>  <Avatar /></div>
                <IonCardTitle>{data?.user.username}</IonCardTitle>
                <IonCardSubtitle>Email : {data?.user.email}</IonCardSubtitle>
                <IonCardSubtitle>教學年資： 1</IonCardSubtitle>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p>瀏覽次數：{visitCount}</p>
                </div>
                <img alt="Silhouette of mountains" src={photo} />
                <IonCardContent>
                    <IonCardSubtitle>導師介紹</IonCardSubtitle><br></br>
                    {data?.info}
                </IonCardContent>
                <IonCardContent className="ion-padding">
                    <div style={{ display: 'flex', justifyContent: 'center' }}><h2>{data?.user.username} 的時間表</h2> </div>
                    <br></br>
                </IonCardContent>
            </IonCard>

        </>
    );
}
export default TeacherDetail;