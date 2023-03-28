import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { filter } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import ProductSegment from '../components/ProductSegment';
import ToolBar from '../components/Toolbar';
import './Resource.css';

const Resource: React.FC = () => {
  return (
    <>
      <IonPage id="main-content">
        <ToolBar />
        {/* SEARCH BAR */}
        <IonContent className="ion-padding">
          <b>資源庫</b>
          
          {/* SEARCH BAR */}
          <IonSearchbar placeholder="輸入搜尋內容"></IonSearchbar>
            <IonButtons>
              <IonButton>
                  <IonIcon slot="icon-only" icon={filter}></IonIcon>
              </IonButton>
            </IonButtons>
          {/* SEARCH BAR */}
          <ProductSegment />
          {/* <IonCard>
            <IonCardHeader>
              <IonCardTitle>保底爆星必備英文Grammar</IonCardTitle>

              <IonCardSubtitle>DSE - 英文</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              拆解DSE閱讀及寫作熱門題型，考試技巧為本，實戰閱讀寫作模擬卷。
            </IonCardContent>

            <IonButton fill="clear">詳細資料</IonButton>
            <IonButton fill="clear">免費下載</IonButton>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>保底爆星必備英文Grammar</IonCardTitle>
              <IonCardSubtitle>DSE - 英文</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              拆解DSE閱讀及寫作熱門題型，考試技巧為本，實戰閱讀寫作模擬卷。
            </IonCardContent>

            <IonButton fill="clear">詳細資料</IonButton>
            <IonButton fill="clear">加入購物車</IonButton>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>保底爆星必備英文Grammar</IonCardTitle>
              <IonCardSubtitle>DSE - 英文</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              拆解DSE閱讀及寫作熱門題型，考試技巧為本，實戰閱讀寫作模擬卷。
            </IonCardContent>

            <IonButton fill="clear">詳細資料</IonButton>
            <IonButton fill="clear">加入購物車</IonButton>
          </IonCard> */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Resource;
