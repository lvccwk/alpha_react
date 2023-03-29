import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';
import { fetchTeacher, fetchTeacherAll, fetchUserAll } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import AddToCartBtn from './AddToCartBtn';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory } from 'react-router-dom';
import './TeacherDetail.css';


interface Teacher {
    id: number;
    info: string;
    username: string;
}

function TeacherCard() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: fetchTeacherAll,
    });

    const history = useHistory();
    const onClickEditProfile = () => {
        history.push('/userprofilesettings');
    }

    return (
        <>
            {Array.isArray(data) && data.map((item: Teacher) => (
                <IonCard key={item.id}>
                    <button className='btn-card' onClick={onClickEditProfile}>
                        <img alt="Silhouette of mountains" src={photo} />
                        {/* <IonCardTitle>${item.id}</IonCardTitle> */}
                        <IonCardContent>${item.username}</IonCardContent>
                    </button>
                </IonCard>

            ))}
        </>
    );
}
export default TeacherCard;