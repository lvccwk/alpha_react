import { IonButton, IonCardTitle, IonContent, IonPage } from '@ionic/react';
import React from 'react';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import ToolBar from '../components/Toolbar';
import { useAppSelector } from '../redux/store';
import SignInUpCard from '../components/UiDesign/SignInUpCard';


const ShoppingCart: React.FC = () => {
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)

    return (
        <>
            <IonPage>
                <ToolBar />
                {isLoggedIn === false && (
                    <IonContent className='ion-padding'>
                        <IonCardTitle>你的購物車</IonCardTitle>
                        <SignInUpCard />
                    </IonContent>
                )}
                {isLoggedIn === true && (
                    <IonContent className='ion-padding' >
                        <IonCardTitle>你的購物車</IonCardTitle>
                        <CartItem />
                    </IonContent>
                )}
            </IonPage>
        </>
    );
};
export default ShoppingCart;
