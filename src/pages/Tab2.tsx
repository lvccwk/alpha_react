import { IonAvatar, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonMenu, IonMenuButton, IonPage, IonRow, IonSearchbar, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';



const Tab2: React.FC = () => {
  return (
    <>

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonSegmentButton>USER</IonSegmentButton>
            </IonButtons>
            <IonTitle>Alpha Learning</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* SEARCH BAR */}
        <IonContent className="ion-padding">

          {/* CARD */}
          <IonCard >
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
            <IonCardHeader>

              <IonCardSubtitle>提供全科24小時功課問
                答、過千條影片課程、實時操題訓練。學習無界限。</IonCardSubtitle>
              <IonCardTitle>線上補習問功課平台</IonCardTitle>
            </IonCardHeader>
          </IonCard>
          {/* CARD */}

          {/* SEARCH BAR */}
          <IonSearchbar placeholder="Custom Placeholder">

          </IonSearchbar>

          {/* SEARCH BAR */}

          <b className=''>一站式中小學補習問功課平台，提供全科24小時功課問
            答、過千條影片課程、實時操題訓練。</b>
          <IonGrid>
            <IonRow>
              <IonCol size="6" size-md="4" size-lg="2">1<img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />中文</IonCol>
              <IonCol size="6" size-md="4" size-lg="2">1<img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />英文</IonCol>
              <IonCol size="6" size-md="4" size-lg="2">1<img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />數學</IonCol>
              <IonCol size="6" size-md="4" size-lg="2">1<img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />通識</IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Tab2;
