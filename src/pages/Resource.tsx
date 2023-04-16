import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { filter } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import ProductSegment from '../components/ProductSegment';
import SubjectFilter from '../components/SubjectFilter';
import ToolBar from '../components/Toolbar';
import './../../src/components/UiDesign/Resource.css';

const Resource: React.FC = () => {
  return (
    <>
      <IonPage >
        <ToolBar />
        <IonContent className='resource' >
          <IonCardTitle className='ion-padding'>資源列表</IonCardTitle>
          <br></br>
          <ProductSegment />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Resource;
