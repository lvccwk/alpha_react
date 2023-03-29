import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';
import CheckBox from './CheckBox';
import ButtonX from './ButtonX';
import DeleteButton from './DeleteButton';

interface CartItem {
  id: number;
  name: string;
  price: number;
}


function CartItem() {

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>購物車</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList> 
          <IonItem>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </IonThumbnail>
            <IonLabel>Product Name</IonLabel>
            $Price
            <DeleteButton />
            <CheckBox />
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
}
export default CartItem;