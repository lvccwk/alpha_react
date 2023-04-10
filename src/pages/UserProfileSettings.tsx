import { IonContent, IonPage } from '@ionic/react';
import Toolbar from '../components/Toolbar';
import EditUserProfile from '../components/EditUserProfile';
export default function UserProfileSettings() {
  return (
    <>
      <IonPage>
        <Toolbar />
        <IonContent className="ion-padding">
          <EditUserProfile />
        </IonContent>
      </IonPage>
    </>
  )
}