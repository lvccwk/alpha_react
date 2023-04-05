import React from 'react';
import { IonCard, IonCardContent, IonNav } from '@ionic/react';
import './TeacherCard.css';
import { fetchTeacher, fetchTeacherAll } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import AddToCartBtn from './AddToCartBtn';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory } from 'react-router-dom';
import TutorProfile from '../pages/TutorProfile';
import { TeacherInterface } from '../interface/interface';
import { fetchUser } from '../api/fetchUser';


function TeacherCard() {
    const history = useHistory();
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["teacherAllABC"],
        queryFn: fetchTeacherAll,
    });


    const onClickEditProfile = (id: number) => {
        history.push(`/tutorprofile/` + id);
        // <IonNav root={() => <TutorProfile />}></IonNav>
    }

    console.log("rendering TeacherCard with data:", data);

    return (
        <>
            {Array.isArray(data) && data.map((item: TeacherInterface) => (
                <IonCard key={item.id}>
                    <button className='btn-card' onClick={() => onClickEditProfile(item.id)}>
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







