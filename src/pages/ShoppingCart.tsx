import { IonButton, IonCardTitle, IonContent, IonPage } from '@ionic/react';
import React from 'react';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import ToolBar from '../components/Toolbar';
import { useAppSelector } from '../redux/store';


const ShoppingCart: React.FC = () => {
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)
    


    return (
        <>
            <IonPage>
                <ToolBar />
                {isLoggedIn === false && (
                    <IonContent>
                        你尚未登入
                    </IonContent>
                )}
                {isLoggedIn === true && (
                <IonContent>
                    <IonCardTitle>購物車</IonCardTitle>
                    <CartItem />
                </IonContent>
                )}
            </IonPage>
        </>
    );
};
export default ShoppingCart;
