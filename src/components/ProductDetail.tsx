import React, { useEffect, useState } from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import { fetchAddCart, fetchCart, fetchProduct, fetchPurchaseHistory, fetchTeacher, fetchTeacherAll, fetchTeacherProduct, } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory, useParams } from 'react-router-dom';
import './TeacherDetail.css';
import { fetchUser } from '../api/fetchUser';
import { useAppSelector } from '../redux/store';

function ProductDetail() {
    const params = useParams()
    const productId = Object.values(params)[0]
    const [phID, setPhID] = useState<number[] | null>(null);
    const [cartID, setCartID] = useState<number[]>([])
    const [teacherProductID, setTeacherProductID] = useState<number[]>([])
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

    const { data: purchaseHistory, refetch: purchaseHistoryFetch } = useQuery({
        queryKey: ["purchasehistory", user?.id],
        queryFn: async () => {
            if (user?.id) { return await fetchPurchaseHistory(user?.id) }
            return []
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });
    const { data: cart, refetch: cartFetch } = useQuery({
        queryKey: ["cartItems", user?.id, product],
        queryFn: async () => {
            if (user?.id) { return await fetchCart(user?.id) }
            return null
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });

    const { data: teacherProduct } = useQuery({
        queryKey: ["teacherproduct", user?.teacher[0]?.id],
        queryFn: async () => {
            if (user?.teacher[0].id) { return await fetchTeacherProduct(user?.teacher[0].id) }
            return null
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });

    useIonViewWillEnter(() => {
        refetch()
        userFetch()
        purchaseHistoryFetch()
        cartFetch()
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

        if (user?.user_type === "teacher") {
            setTeacherProductID(teacherProduct?.map((obj: { id: any; }) => {
                return obj.id;
            }))
        }
    }, [purchaseHistory, cart, teacherProduct, product])

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

    const history = useHistory();
    const onClickEditPage = (id: any) => {
        history.push(`/editproduct/` + id);
    }

    const addToCartCondition1 = phID?.includes(Number(productId))
    const addToCartCondition2 = cartID.includes(Number(productId))
    const editProductCondition = teacherProductID?.includes(Number(productId))

    return (
        <>
            <IonCard className='card-container'>
                <img className='card-image' alt="Product thumbnail" src={product?.image} />
                <IonCardContent className='card-title'>{product?.name}
                    <br />
                    老師:{product?.teacher.user.username}
                    <br />
                    價格:${product?.price}
                    <br />
                    評分:{product?.avg_rating ? product?.avg_rating : "暫無"}
                    <br />
                    詳細內容:{product?.info}
                    <br />
                    {isLoggedIn === false && editProductCondition === false && (
                        <IonButton onClick={() => handleAddToCart(productId)}>
                            加入購物車
                        </IonButton>
                    )}
                    {isLoggedIn === true && editProductCondition === true && (
                        <IonButton onClick={() => onClickEditPage(productId)}>
                            修改課程/筆記資料
                        </IonButton>
                    )}
                    {isLoggedIn === true && addToCartCondition1 === true && editProductCondition === false && (
                        <IonButton disabled={true}>
                            已購買
                        </IonButton>
                    )}
                    {isLoggedIn === true && addToCartCondition2 === true && editProductCondition === false && (
                        <IonButton disabled={true}>
                            已加入購物車
                        </IonButton>
                    )}
                    {isLoggedIn === true && addToCartCondition1 === false && addToCartCondition2 === false && editProductCondition === false && (
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