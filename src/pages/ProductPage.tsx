import { IonContent, IonPage } from '@ionic/react';
import React from 'react';

import ProductDetail from '../components/ProductDetail';

import ToolBar from '../components/Toolbar';


const ProductPage: React.FC = () => {
    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent>
                    <ProductDetail />
                </IonContent>
            </IonPage>
        </>
    );
};
export default ProductPage;

