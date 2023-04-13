import React, { useEffect, useState } from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import { fetchAddCart, fetchCart, fetchProduct, fetchPurchaseHistory, fetchTeacher, fetchTeacherAll, } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory, useParams } from 'react-router-dom';
import './TeacherDetail.css';

function PurchasedItemDetail() {
    const params = useParams()
    const productId = Object.values(params)[0]

    const { data: product, refetch } = useQuery({
        queryKey: ["productDetail"],
        queryFn: async () => await fetchProduct(Number(productId)),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });

    useIonViewWillEnter(()=>{
        refetch()
      })

    return (
        <>
            <IonCard>
                <img alt="Silhouette of mountains" src={photo} />
                <IonCardContent>老師:{product?.teacher.user.username}
                    <br />
                    {product?.name}
                    <br />
                    評分:{product?.avg_rating}
                    <br />
                    詳細內容:{product?.info}
                    <br />
                </IonCardContent>
            </IonCard>
        </>
    );
}
export default PurchasedItemDetail;