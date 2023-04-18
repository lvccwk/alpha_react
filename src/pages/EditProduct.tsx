import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonCardTitle } from '@ionic/react';
import Toolbar from '../components/Toolbar';
import EditProductDetail from '../components/EditProductDetail';

export default function EditProduct() {
    return (
      <>
        <IonPage>
          <Toolbar />
          <IonContent className="editProductPage">
          <EditProductDetail />
          </IonContent>
        </IonPage>
      </>
    )
  }