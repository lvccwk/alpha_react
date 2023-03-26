import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import './Card.css';
import Alert from './Alert';
import { useQuery } from '@tanstack/react-query';
import { fetchUserAll } from '../api/fetchAll';



function Card() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: () => fetchUserAll(1), //redux login state
    });

    return (
        <IonCard>
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
            <IonCardHeader>
                <IonCardTitle>${data?.product.price}  </IonCardTitle>
                <IonCardTitle>{data?.product.name}  <IonCardSubtitle>({data?.product.product_type}) </IonCardSubtitle> </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <Alert />
            </IonCardContent>
        </IonCard>
    );
}
export default Card;