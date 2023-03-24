import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonMenu, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Alpha Learning</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* SEARCH BAR */}
        <IonContent className="ion-padding">

          <b>精選筆記</b>

          {/* SEARCH BAR */}
          <IonSearchbar placeholder="Custom Placeholder"></IonSearchbar>
          Tap the button in the toolbar to open the menu.
          {/* SEARCH BAR */}
          <IonCard>
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
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Tab3;
