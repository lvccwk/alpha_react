import { IonContent, IonPage } from '@ionic/react';
import Toolbar from '../components/Toolbar';
import EditUserProfile from '../components/EditUserProfile';
export default function UserProfileSettings() {
    return (
        <IonPage>
        <Toolbar />

        <IonContent>
          <div>
            <h1>Profile Settings</h1>
            <EditUserProfile />
          </div>

        </IonContent>
      </IonPage>
    )
}