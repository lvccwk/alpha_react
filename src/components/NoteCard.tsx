import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonFooter, IonGrid, IonRow, IonSearchbar, SearchbarChangeEventDetail, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import './TeacherCard.css';
import { fetchAddCart, fetchCart, fetchNote, fetchPurchaseHistory } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory } from 'react-router';
import { useAppSelector } from "../redux/store";
import { fetchUser } from '../api/fetchUser';
import { TeacherInterface, UserInterface } from '../interface/interface';
import './../../src/components/UiDesign/Resource.css'
interface Note {
    id: number;
    name: string;
    price: number;
    avg_rating: number;
    subject_id: number;
    teacher: TeacherInterface;
    teacher_id: number;
    user: UserInterface;
}

function NoteCard() {
    const [phID, setPhID] = useState<number[]>([])
    const [cartID, setCartID] = useState<number[]>([])
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)
    const [searchText, setSearchText] = useState<string>("");
    const { data: note, refetch } = useQuery({
        queryKey: ["note"],
        queryFn: async () => await fetchNote(),
        // refetchInterval: 500,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });

    const { data: user, refetch: userFetch } = useQuery({
        queryKey: ["user"],
        queryFn: async () => await fetchUser(),
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
        queryKey: ["cartItems", user?.id, note],
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

        setCartID(cart?.cart_detail?.map((obj: { product_id: any; }) => {
            return obj.product_id;
        }))
    }, [purchaseHistory, cart, note])

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

    const filteredCourses = note?.filter((item: { teacher: { user: { username: string; }; }; name: string; }) => {
        const lowerCaseSearchText = searchText.toLowerCase();
        const teacherName = item.teacher.user.username.toLowerCase();
        const courseName = item.name.toLowerCase();
        return teacherName.includes(lowerCaseSearchText) || courseName.includes(lowerCaseSearchText);
    });
    return (
        <>
            <IonSearchbar value={searchText} onIonChange={handleSearch}></IonSearchbar>
            {Array.isArray(filteredCourses) && Array.isArray(phID) && Array.isArray(cartID) && filteredCourses.map((item: Note) => (
                <div key={item.id}>
                    {/* your existing code ... */}
                    {Array.isArray(note) && Array.isArray(phID) && Array.isArray(cartID) && note.map((item: Note) => (
                        <IonCard className='courseCardBackground' key={item.id}>
                            <img alt="Silhouette of mountains" src={photo} />
                            <IonCardContent>老師:{item.teacher.user.username}   {item.name} ${item.price} 評分:{item.avg_rating}

                            </IonCardContent>
                            <IonFooter className='courseItemPrice'>
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
                            </IonFooter>
                        </IonCard>
                    ))}
                </div>
            ))}
        </>
    );
}
export default NoteCard;