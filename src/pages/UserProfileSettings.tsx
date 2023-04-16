import { IonContent, IonPage } from '@ionic/react';
import Toolbar from '../components/Toolbar';
import EditUserProfile from '../components/EditUserProfile';
import './../../src/components/UiDesign/UserProfile.css'
export default function UserProfileSettings() {
  return (
    <>
      <IonPage>
        <Toolbar />
        <IonContent className="editProfilePage">
          <EditUserProfile />
        </IonContent>
      </IonPage>
    </>
  )
}