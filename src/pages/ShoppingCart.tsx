import { IonButton, IonCardTitle, IonContent, IonPage, } from '@ionic/react';
import React from 'react';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import ToolBar from '../components/Toolbar';


const ShoppingCart: React.FC = () => {

    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent>
                    <IonCardTitle>購物車</IonCardTitle>
                    <CartItem />
                    <IonButton>
                        前往付款
                    </IonButton>
                    <Button />
                </IonContent>
            </IonPage>
        </>
    );
};
export default ShoppingCart;
