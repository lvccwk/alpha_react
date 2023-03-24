import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonMenu, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical, personCircle, search } from 'ionicons/icons';
import React from 'react';
import { Route } from 'react-router';
import ActionSheet from '../components/ActionSheet';
import Alert from '../components/Alert';
import Card from '../components/Card';
import DateTime from '../components/DateTime';
import ExploreContainer from '../components/ExploreContainer';
import InputForm from '../components/InputForm';
import ToolBar from '../components/Toolbar';
import Cart from './Cart';
import Login from './Login';


const ProductList: React.FC = () => {
    return (
        <>
            <IonMenu contentId="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu Content</IonTitle>

                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">This is the menu content.</IonContent>
            </IonMenu>

            <IonPage id="main-content">
                <ToolBar />

                <IonSegment value="segment">

                    <IonSegmentButton value="default">
                        <IonLabel>Default</IonLabel>
                        <Route path="/cart" render={() => <Cart />} exact={true} />
                    </IonSegmentButton>
                    <IonSegmentButton value="segment">
                        <IonLabel>Segment</IonLabel>

                        <Route path="/caasdrt" render={() => <Login />} exact={true} />
                    </IonSegmentButton>
                </IonSegment>


                <IonContent className="ion-padding"  >
                    {/* SEARCH BAR */}
                    <IonSearchbar placeholder="Custom Placeholder"></IonSearchbar>
                    <ActionSheet />
                    Tap the button in the toolbar to open the menu.
                    {/* SEARCH BAR */}

                    <b>2 per row until md breakpoint, 3 per row for md, equal width for lg and up</b>
                    <InputForm />
                    <IonGrid >
                        <Card />
                        <Card />

                    </IonGrid>


                </IonContent>



            </IonPage>
        </>
    );
};

export default ProductList;
