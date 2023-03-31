import React from 'react';
import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel } from '@ionic/react';
import { fetchProduct, fetchTeacher, fetchTeacherAll, } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import AddToCartBtn from './AddToCartBtn';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory, useParams } from 'react-router-dom';
import './TeacherDetail.css';

function ProductDetail() {
    const params = useParams()
    const productId = Object.values(params)[0]
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["productDetail"],
        queryFn: () => fetchProduct(Number(productId)),
    });
    console.log(`ProductDetail`, data)
    return (
        <>
            <IonCard>
                <img alt="Silhouette of mountains" src={photo} />
                <IonCardContent>老師:{data?.teacher.user.username}
                <br/>
                {data?.name} 
                <br/>
                評分:{data?.avg_rating}<AddToCartBtn /></IonCardContent>
            </IonCard>
        </>
    );
}
export default ProductDetail;