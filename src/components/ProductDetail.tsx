import React from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, useIonAlert } from '@ionic/react';
import { fetchAddCart, fetchProduct, fetchTeacher, fetchTeacherAll, } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import AddToCartBtn from './AddToCartBtn';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory, useParams } from 'react-router-dom';
import './TeacherDetail.css';
import { fetchUser } from '../api/fetchUser';
import { useAppSelector } from '../redux/store';

function ProductDetail() {
    const params = useParams()
    const productId = Object.values(params)[0]

        const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: () => fetchUser(),
    });

    const { data } = useQuery({
        queryKey: ["productDetail"],
        queryFn: () => fetchProduct(Number(productId)),
    });
    console.log(`ProductDetail`, data)

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

    const handleAddToCart = (id: any) => {
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
            <IonCard>
                <img alt="Silhouette of mountains" src={photo} />
                <IonCardContent>老師:{data?.teacher.user.username}
                <br/>
                {data?.name} 
                <br/>
                評分:{data?.avg_rating}
                <IonButton onClick={() => handleAddToCart(data?.id)}>
                    加入購物車
                </IonButton>
                </IonCardContent>
            </IonCard>
        </>
    );
}
export default ProductDetail;