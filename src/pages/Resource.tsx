import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { filter } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import ProductSegment from '../components/ProductSegment';
import SubjectFilter from '../components/SubjectFilter';
import ToolBar from '../components/Toolbar';
import './Resource.css';

const Resource: React.FC = () => {
  return (
    <>
      <IonPage id="main-content">
        <ToolBar />
        <IonContent className="ion-padding">
          <b>資源庫</b>
          <IonSearchbar placeholder="輸入搜尋內容"></IonSearchbar>
          <SubjectFilter />

          <ProductSegment />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Resource;
