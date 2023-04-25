import { IonContent, IonPage, IonSearchbar } from '@ionic/react';
import React from 'react';
import Segment from '../components/Segment';
import ToolBar from '../components/Toolbar';


const ProductList: React.FC = () => {
    return (
        <>
            <IonPage>
                <ToolBar />
                <IonSearchbar placeholder="Custom Placeholder"></IonSearchbar>
                <IonContent>
                    <Segment />
                </IonContent>
            </IonPage>
        </>
    );
};

export default ProductList;
