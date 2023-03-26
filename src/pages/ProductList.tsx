import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonMenu, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical, personCircle, search } from 'ionicons/icons';
import React from 'react';
import { Route } from 'react-router';
import ActionSheet from '../components/ActionSheet';
import Card from '../components/Card';
import DateTime from '../components/DateTime';
import ExploreContainer from '../components/ExploreContainer';
import InputForm from '../components/InputForm';
import Segment from '../components/Segment';
import ToolBar from '../components/Toolbar';
// import Cart from './Cart';
import Login from './Login';


const ProductList: React.FC = () => {
    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent>
                    <Card />
                </IonContent>
            </IonPage>
        </>
    );
};
export default ProductList;
