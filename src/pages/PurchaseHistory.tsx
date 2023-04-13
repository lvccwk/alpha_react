import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonList, IonMenu, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { Route } from 'react-router';

import ToolBar from '../components/Toolbar';
import PurchasedItem from '../components/PurchasedItem';

const PurchaseHistory: React.FC = () => {

    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent>
                    <IonCardTitle>Purchase History</IonCardTitle>
                    <PurchasedItem />
                </IonContent>
            </IonPage>
        </>
    );
};
export default PurchaseHistory;
