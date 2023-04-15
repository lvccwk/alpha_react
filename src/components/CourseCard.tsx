import React, { useEffect, useMemo, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonSearchbar, SearchbarChangeEventDetail, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import './TeacherCard.css';
import { fetchAddCart, fetchCart, fetchCourse, fetchPurchaseHistory } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
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
    user: UserInterface;
}

function CourseCard() {
    const [phID, setPhID] = useState<number[]>([])
    const [cartID, setCartID] = useState<number[]>([])
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)
    const [searchText, setSearchText] = useState<string>("");
    const { data: course, refetch } = useQuery({
        queryKey: ["course"],
        queryFn: async () => await fetchCourse(),
        // refetchInterval: 500,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });

    const { data: user, refetch: userFetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => await fetchUser(),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });

    // console.log(`user`, user)
    const { data: purchaseHistory } = useQuery({
        queryKey: ["purchasehistorys", user?.id],
        queryFn: async () => {
            if (user?.id) { return await fetchPurchaseHistory(user?.id) }
            return []
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });
    const { data: cart } = useQuery({
        queryKey: ["cartItemss", user?.id, course],
        queryFn: async () => {
            if (user?.id) { return await fetchCart(user?.id) }
            return null
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });

    useIonViewWillEnter(() => {
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
    }, [purchaseHistory, cart, course])

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

    const handleAddToCart = async (id: number) => {
        if (isLoggedIn === false) {
            pleaseLogin()
        } else {
            // console.log({
            //     user
            // })

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

    const handleSearch = (event: CustomEvent<SearchbarChangeEventDetail>) => {
        setSearchText(event.detail.value || "");
    };

    const filteredCourses = course?.filter((item: { teacher: { user: { username: string; }; }; name: string; }) => {
        const lowerCaseSearchText = searchText.toLowerCase();
        const teacherName = item.teacher.user.username.toLowerCase();
        const courseName = item.name.toLowerCase();
        return teacherName.includes(lowerCaseSearchText) || courseName.includes(lowerCaseSearchText);
    });

    // console.log({
    //     course,
    //     phID,
    //     cartID,
    //     user,
    //     cart
    // })
    return (
        <>
            <IonSearchbar value={searchText} onIonChange={handleSearch}></IonSearchbar>
            {Array.isArray(filteredCourses) && Array.isArray(phID) && Array.isArray(cartID) && filteredCourses.map((item: Course) => (
                <IonCard key={item.id}>
                    {/* your existing code ... */}
                    {Array.isArray(course) && Array.isArray(phID) && Array.isArray(cartID) && course.map((item: Course) => (
                        <IonCard key={item.id}>
                            <img alt="Silhouette of mountains" src={photo} />
                            <IonCardContent>老師:{item.teacher.user.username}   {item.name} ${item.price} 評分:{item.avg_rating}
                                <IonButton onClick={() => onClickProductPage(item.id)}>
                                    詳細資料
                                </IonButton>
                                {isLoggedIn === false && (
                                    <IonButton onClick={() => handleAddToCart(item.id)}>
                                        加入購物車
                                    </IonButton>
                                )}
                                {isLoggedIn === true && phID.includes(item.id) && (
                                    <IonButton disabled={true}>
                                        已購買
                                    </IonButton>
                                )}
                                {isLoggedIn === true && cartID.includes(item.id) && (
                                    <IonButton disabled={true}>
                                        已加入購物車
                                    </IonButton>
                                )}
                                {isLoggedIn === true && phID.includes(item.id) === false && cartID.includes(item.id) === false && (
                                    <IonButton onClick={() => handleAddToCart(item.id)}>
                                        加入購物車
                                    </IonButton>
                                )}
                            </IonCardContent>
                        </IonCard>
                    ))}
                </IonCard>
            ))}

        </>
    );
}
export default CourseCard;