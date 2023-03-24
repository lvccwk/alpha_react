
import React from 'react';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import ListCard from '../components/ListCard';
import ToolBar from '../components/Toolbar';
import { star } from 'ionicons/icons';

const Cart: React.FC = () => {
    return (
        <>
            {/* <IonMenu contentId="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu Content</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">This is the menu content.</IonContent>
            </IonMenu> */}
            <ToolBar />

            <ListCard />
            <IonGrid>
                <IonRow class="ion-justify-content-center">
                    <IonButton>
                        <IonIcon slot="start" icon={star}></IonIcon>
                        Left Icon
                    </IonButton>
                    <IonButton>
                        Right Icon
                        <IonIcon slot="end" icon={star}></IonIcon>
                    </IonButton>
                </IonRow>
            </IonGrid>
        </>
    );
};

export default Cart;
