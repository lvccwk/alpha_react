import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonMenu, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical, personCircle, search } from 'ionicons/icons';
import React from 'react';
import { Route, useHistory, useParams } from 'react-router';
import Card from '../components/Card';
import ProductDetail from '../components/ProductDetail';
import TeacherDetail from '../components/TeacherDetail';
import ToolBar from '../components/Toolbar';


const ProductPage: React.FC = () => {
    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent>
                    Product Page
                    <ProductDetail />
                </IonContent>
            </IonPage>
        </>
    );
};
export default ProductPage;

