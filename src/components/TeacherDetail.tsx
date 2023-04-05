import React, { useEffect, useRef, useState } from 'react';
import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel } from '@ionic/react';
import { fetchTeacher } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import AddToCartBtn from './AddToCartBtn';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory, useParams } from 'react-router-dom';
import './TeacherDetail.css';




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
            </IonCard>

        </>
    );
}
export default TeacherDetail;