import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonCardTitle } from '@ionic/react';
import Toolbar from '../components/Toolbar';

export default function EditProduct() {
    return (
      <>
        <IonPage>
          <Toolbar />
          <IonContent className="editProductPage">
            <div>修改課程/筆記</div>
          </IonContent>
        </IonPage>
      </>
    )
  }