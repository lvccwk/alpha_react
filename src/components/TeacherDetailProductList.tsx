import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonItem, IonLabel, IonButton, IonThumbnail, IonButtons, IonIcon, IonCheckbox, useIonViewWillEnter, IonCard, IonCardHeader, IonCardTitle, IonContent } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import { fetchTeacherProduct } from '../api/fetchAll';
import { useHistory } from 'react-router';

interface ProductInterface {
    id: number;
    name: string;
    price: number;
    product_type: string;
    avg_rating: number;
    file_url: string;
    image: string;
    user_id: number;
    subject_id?: number;
    teacher_id: number;
    created_at: Date;
    updated_at: Date;
  }

function TeacherProduct () {
    const params = useParams()
    const teacherId = Object.values(params)[0]
    console.log(teacherId)
    const { data } = useQuery({
        queryKey: ["teacherDetailProduct"],
        queryFn: () => fetchTeacherProduct(Number(teacherId)),
    });
    console.log(data)

    const history = useHistory();
    const onClickProductPage = (id: number) => {
        history.push(`/productpage/` + id);
    }

    return(
        <>
            {Array.isArray(data) && data.map((item: ProductInterface) => (
              <IonItem key={item.id}>
                <IonThumbnail slot="start">
                  <img src={`${item.image}`} />
                </IonThumbnail>
                <IonLabel>{item.name}</IonLabel>
                {item.product_type === "course" && (
                    "課程"
                )}
                {item.product_type === "note" && (
                    "筆記"
                )}
                ${item.price}
                <IonButton onClick={() => onClickProductPage(item.id)}>
                  詳細
                </IonButton>
              </IonItem>
            ))}
        </>
    )
}
export default TeacherProduct;