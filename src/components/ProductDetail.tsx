import React from 'react';
import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel } from '@ionic/react';
import { fetchProduct, fetchTeacher, fetchTeacherAll,  } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import AddToCartBtn from './AddToCartBtn';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory, useParams } from 'react-router-dom';
import './TeacherDetail.css';


interface Product {
    id: number;
    name: string;
    price: any;
    avg_rating: any;
    image: any;
}

function ProductDetail() {
    const params = useParams()
    const productId = Object.values(params)[0]
    console.log("PDID= "+productId)
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["productDetail"],
        queryFn: () => fetchProduct(Number(productId)),
    });
    console.log(data)
    return (
        <>
            {Array.isArray(data) && data.map((item: Product) => (
                <IonCard key={item.id}>
                        <img alt="Silhouette of mountains" src={photo} />
                        ProductDetail
                        <IonCardContent>{item.name} ${item.price} 評分:{item.avg_rating}<AddToCartBtn /></IonCardContent>
                </IonCard>
            ))}
        </>
    );
}
export default ProductDetail;