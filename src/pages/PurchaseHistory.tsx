import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonList, IonMenu, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { Route } from 'react-router';

import ToolBar from '../components/Toolbar';
import PurchasedHistoryList from '../components/PurchasedHistoryList';
import './../../src/components/UiDesign/CartPage.css'
import { person } from 'ionicons/icons';
const PurchaseHistory: React.FC = () => {

    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent className='purchaseHistory'>
                    <IonCardTitle className='ion-padding' >購買記錄</IonCardTitle>
                    <PurchasedHistoryList />
                </IonContent>
            </IonPage>
        </>
    );
};
export default PurchaseHistory;
