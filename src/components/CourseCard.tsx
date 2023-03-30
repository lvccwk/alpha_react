import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/react';

import './TeacherCard.css';
import { fetchCourse, fetchProduct } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import AddToCartBtn from './AddToCartBtn';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory } from 'react-router';
import ProductDetail from './ProductDetail';

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
    const onClickProductPage = (id:number) => {
        console.log("course= "+id)
        history.push(`/productpage/`+id);
    }

    return (
        <>
            {Array.isArray(data) && data.map((item: Course) => (
                <IonCard key={item.id}>
                    <button className='btn-card' onClick={() => {onClickProductPage(item.id);}}>
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