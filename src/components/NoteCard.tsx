import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/react';

import './TeacherCard.css';
import { fetchProduct } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import AddToCartBtn from './AddToCartBtn';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory } from 'react-router';

interface Note {
    id: number;
    name: string;
    price: number;
    rating: number;
}

function NoteCard() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["note"],
        queryFn: fetchProduct,
    });

    const history = useHistory();
    const onClickProductPage = () => {
        history.push('/ProductPage');
    }

    return (
        <>
            {Array.isArray(data) && data.map((item: Note) => (
                <IonCard key={item.id}>
                    <button className='btn-card' onClick={onClickProductPage}>
                        <img alt="Silhouette of mountains" src={photo} />
                        {/* <IonCardTitle>${item.id}</IonCardTitle> */}
                        <IonCardContent>{item.name} ${item.price}<AddToCartBtn /></IonCardContent>
                    </button>
                </IonCard>
            ))}
        </>
    );
}
export default NoteCard;