import { IonButton, IonCard, IonCardTitle, IonContent, IonPage } from '@ionic/react';
import React from 'react';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import ToolBar from '../components/Toolbar';
import { useAppSelector } from '../redux/store';
import SignInUpCard from '../components/UiDesign/SignInUpCard';
import './../../src/components/UiDesign/CartPage.css'

const ShoppingCart: React.FC = () => {
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)

    return (
        <>
            <IonPage>
                <ToolBar />
                {isLoggedIn === false && (
                    <IonContent className='shoppingCart'>
                        {/* <IonCard className='shoppingCartCard'> */}
                            <IonCardTitle className='ion-padding' >你的購物車</IonCardTitle>
                            <SignInUpCard />
                        {/* </IonCard> */}
                    </IonContent>
                )}
                {isLoggedIn === true && (
                    <IonContent className='shoppingCart'>
                        <IonCardTitle className='ion-padding' >你的購物車</IonCardTitle>
                        <IonCard className='shoppingCartCard'>
                            {/* <IonCardTitle>你的購物車</IonCardTitle> */}
                            <CartItem />
                        </IonCard>
                    </IonContent>
                )}
            </IonPage>
        </>
    );
};
export default ShoppingCart;
