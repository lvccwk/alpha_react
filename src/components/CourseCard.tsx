import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/react';

import './TeacherCard.css';
import { fetchCourse } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import AddToCartBtn from './AddToCartBtn';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory } from 'react-router';

interface Course {
    id: number;
    name: string;
    price: number;
    avg_rating: number;
    subject_id: number;
}

function CourseCard() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["course"],
        queryFn: fetchCourse,
    });

    const history = useHistory();
    const onClickProductPage = () => {
        history.push('/userprofilesettings');
    }

    return (
        <>
            {Array.isArray(data) && data.map((item: Course) => (
                <IonCard key={item.id}>
                    <button className='btn-card' onClick={onClickProductPage}>
                        <img alt="Silhouette of mountains" src={photo} />
                        {/* <IonCardTitle>${item.id}</IonCardTitle> */}
                        <IonCardContent>{item.name} ${item.price} 評分:{item.avg_rating}<AddToCartBtn /></IonCardContent>
                    </button>
                </IonCard>
            ))}
        </>
    );
}
export default CourseCard;