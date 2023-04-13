import { IonContent, IonPage } from '@ionic/react';
import React from 'react';

import PurchasedItemDetail from '../components/PurchasedItemDetail';

import ToolBar from '../components/Toolbar';


const PurchasedItem: React.FC = () => {
    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent>
                    <PurchasedItemDetail />
                </IonContent>
            </IonPage>
        </>
    );
};
export default PurchasedItem;

