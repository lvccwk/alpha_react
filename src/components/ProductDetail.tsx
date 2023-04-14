import React, { useEffect, useState } from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import { fetchAddCart, fetchCart, fetchProduct, fetchPurchaseHistory, fetchTeacher, fetchTeacherAll, } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory, useParams } from 'react-router-dom';
import './TeacherDetail.css';
import { fetchUser } from '../api/fetchUser';
import { useAppSelector } from '../redux/store';

function ProductDetail() {
    const params = useParams()
    const productId = Object.values(params)[0]
    const [phID, setPhID] = useState<number[]>([])
    const [cartID, setCartID] = useState<number[]>([])
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)

    const { data: user, refetch: userFetch } = useQuery({
        queryKey: ["user"],
        queryFn: async () => await fetchUser(),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });

    const { data: product, refetch } = useQuery({
        queryKey: ["productDetail"],
        queryFn: async () => await fetchProduct(Number(productId)),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });
    
    const { data: purchaseHistory } = useQuery({
        queryKey: ["purchasehistory", user?.id],
        queryFn: async () => {
            if (user?.id) { return await fetchPurchaseHistory(user?.id) }
            return []
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });
    const { data: cart } = useQuery({
        queryKey: ["cartItems", user?.id, product],
        queryFn: async () => {
            if (user?.id) { return await fetchCart(user?.id) }
            return null
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });

    useIonViewWillEnter(()=>{
        refetch()
        userFetch()
      })
     
    useEffect(() => {
        if (user) {
        }
        setPhID(purchaseHistory?.map((obj: { product_id: any; }) => {
            return obj.product_id;
        }))

        if (cart?.cart_detail) {
            setCartID(cart?.cart_detail?.map((obj: { product_id: any; }) => {
                return obj.product_id;
            }))
        }
    }, [purchaseHistory, cart, product])

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

    const handleAddToCart = async (id: any) => {
        if (isLoggedIn === false) {
            pleaseLogin()
        } else {
            let obj = {
                cart_id: user?.cart[0].id,
                product_id: id,
                is_buying: false,
            };
            await fetchAddCart(obj)
            addToCartAlert()
            refetch()
        }
    }

    // console.log(cartID)
    const addToCartCondition1 = phID.includes(Number(productId))
    const addToCartCondition2 = cartID.includes(Number(productId))

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
                    {isLoggedIn === false && (
                        <IonButton onClick={() => handleAddToCart(productId)}>
                            加入購物車
                        </IonButton>
                    )}
                    {isLoggedIn === true && addToCartCondition1 === true && (
                        <IonButton disabled={true}>
                            已購買
                        </IonButton>
                    )}
                    {isLoggedIn === true && addToCartCondition2 === true && (
                        <IonButton disabled={true}>
                            已加入購物車
                        </IonButton>
                    )}
                    {isLoggedIn === true && addToCartCondition1 === false && addToCartCondition2 === false && (
                        <IonButton onClick={() => handleAddToCart(Number(productId))}>
                            加入購物車
                        </IonButton>
                    )}
                </IonCardContent>
            </IonCard>
        </>
    );
}
export default ProductDetail;