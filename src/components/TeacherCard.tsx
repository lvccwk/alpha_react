import React from 'react';
import { IonCard, IonCardContent, IonNav } from '@ionic/react';
import './TeacherCard.css';
import { fetchTeacher, fetchTeacherAll } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import AddToCartBtn from './AddToCartBtn';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory } from 'react-router-dom';
import TutorProfile from '../pages/TutorProfile';

interface Teacher {
    id: number;
    info: string;
    username: string;
    user: any;
}

function TeacherCard() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["teacherAll"],
        queryFn: fetchTeacherAll,
    });

    const history = useHistory();
    const onClickEditProfile = () => {
        history.push(`/tutorprofile`);
        // <IonNav root={() => <TutorProfile />}></IonNav>
    }

    return (
        <>
            {Array.isArray(data) && data.map((item: Teacher) => (
                <IonCard key={item.id}>
                    <button className='btn-card' onClick={onClickEditProfile}>
                        <img alt="Silhouette of mountains" src={photo} />
                        {/* <IonCardTitle>${item.id}</IonCardTitle> */}
                        <IonCardContent>{item.user.username}</IonCardContent>
                    </button>
                </IonCard>
            ))}
        </>
    );
}
export default TeacherCard;


