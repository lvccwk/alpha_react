import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonMenu, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Route } from 'react-router';
import ActionSheet from '../components/ActionSheet';
import Alert from '../components/Alert';
import DateTime from '../components/DateTime';
import ExploreContainer from '../components/ExploreContainer';
import InputForm from '../components/InputForm';
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
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Alpha Learning</IonTitle>
                    </IonToolbar>
                </IonHeader>

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

                        <IonRow>
                            <IonCol size="6" size-md="4" size-lg="2">1<img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" /> Name{'123'} <br></br>Exp{'123'} <br></br>${'123/hr起'} <Alert /> </IonCol>
                            <IonCol size="6" size-md="4" size-lg="2">1<img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" /> Name{'123'} <br></br>Exp{'123'} <br></br>${'123/hr起'} <Alert /> </IonCol>
                            <IonCol size="6" size-md="4" size-lg="2">1<img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" /> Name{'123'} <br></br>Exp{'123'} <br></br>${'123/hr起'} <Alert /> </IonCol>
                            <IonCol size="6" size-md="4" size-lg="2">1<img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" /> Name{'123'} <br></br>Exp{'123'} <br></br>${'123/hr起'} <Alert /> </IonCol>
                        </IonRow>

                    </IonGrid>


                </IonContent>



            </IonPage>
        </>
    );
};

export default ProductList;
