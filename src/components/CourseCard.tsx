import React from 'react';
import { IonButton, IonCard, IonCardContent, useIonAlert } from '@ionic/react';
import './TeacherCard.css';
import { fetchAddCart, fetchCourse, fetchProduct } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import AddToCartBtn from './AddToCartBtn';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory } from 'react-router';
import { useAppSelector } from "../redux/store";
import { fetchUser } from '../api/fetchUser';
import { TeacherInterface, UserInterface } from '../interface/interface';

interface Course {
    id: number;
    name: string;
    price: number;
    avg_rating: number;
    subject_id: number;
    teacher: TeacherInterface;
    teacher_id: number;
    user: UserInterface
}

function CourseCard() {
    const { data: course } = useQuery({
        queryKey: ["course"],
        queryFn: fetchCourse,
    });

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: () => fetchUser(),
    });

    console.log("cartID=" + user?.cart[0].id)



    const history = useHistory();
    const onClickProductPage = (id: number) => {
        history.push(`/productpage/` + id);
    }

    const [presentAlert] = useIonAlert();
    const addToCartAlert = () => {
        presentAlert({
            header: '提示信息',
            message: '加入購物車',
            buttons: ['OK'],
        })
    }

    const pleaseLogin = () => {
        presentAlert({
            header: '提示信息',
            message: '請先登入再進行操作',
            buttons: ['OK'],
        })
    }

    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)

    const handleAddToCart = (id: number) => {
        if (isLoggedIn === false) {
            pleaseLogin()
        } else {
            let obj = {
                cart_id: user?.cart[0].id,
                product_id: id,
                is_buying: false,
            };
            console.log(obj)
            fetchAddCart(obj)

            addToCartAlert()
        }
    }

    return (
        <>
            {Array.isArray(course) && course.map((item: Course) => (
                <IonCard key={item.id}>
                    <img alt="Silhouette of mountains" src={photo} />
                    <IonCardContent>老師:{item.teacher.user.username}   {item.name} ${item.price} 評分:{item.avg_rating}
                        <IonButton onClick={() => onClickProductPage(item.id)}>
                            詳細資料
                        </IonButton>
                        <IonButton onClick={() => handleAddToCart(item.id)}>
                            加入購物車
                        </IonButton>
                    </IonCardContent>
                </IonCard>
            ))}
        </>
    );
}
export default CourseCard;