import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonList, IonMenu, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical, personCircle, search } from 'ionicons/icons';
import React from 'react';
import { Route } from 'react-router';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import ToolBar from '../components/Toolbar';


const ShoppingCart: React.FC = () => {
    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent>
                <IonHeader>
                    <IonCardTitle>購物車</IonCardTitle>
                </IonHeader>
                    {/* <IonCard>
                        <IonCardContent>
                            <IonList>  */}
                               <CartItem />
                            {/* </IonList>
                        </IonCardContent>
                    </IonCard> */}
                </IonContent>
            </IonPage>
        </>
    );
};
export default ShoppingCart;
