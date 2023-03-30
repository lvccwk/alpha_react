import React from 'react';
import { IonButton, IonCard, IonCardContent } from '@ionic/react';
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
<<<<<<< HEAD
    teacher: string;
    teacher_id: number;
=======
    teacher: any;
    username: string;
>>>>>>> 6fcd6032ee335b551b080dda22e72f26fdc51cb9
}

function CourseCard() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["course"],
        queryFn: fetchCourse,
    });

    const history = useHistory();
    const onClickProductPage = (id: number) => {
        console.log("course= " + id)
        history.push(`/productpage/` + id);
    }

    return (
        <>
            {Array.isArray(data) && data.map((item: Course) => (
                <IonCard key={item.id}>
                    <img alt="Silhouette of mountains" src={photo} />
                    <IonCardContent>老師:{item.teacher.user.username}{item.name} ${item.price} 評分:{item.avg_rating}
                        <IonButton onClick={() => onClickProductPage(item.id)}>
                            詳細資料
                        </IonButton>
                        <AddToCartBtn />
                    </IonCardContent>
                </IonCard>
            ))}
        </>
    );
}
export default CourseCard;