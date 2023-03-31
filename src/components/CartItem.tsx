import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList, IonButton, IonThumbnail } from '@ionic/react';
import CheckBox from './CheckBox';
import ButtonX from './ButtonX';
import { useQuery } from '@tanstack/react-query';
import DeleteButton from './DeleteButton';
import { useHistory } from 'react-router';
import { fetchCart } from '../api/fetchAll';

interface CartItemInfo {
  id: number;
  product_id: number;
  name: string;
  price: number;
  image: any;
  is_buying: boolean;
}

function CartItem() {

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["cartItem"],
    queryFn: () => fetchCart(),
  });

  const history = useHistory();
  const onClickProductPage = (id: number) => {
    history.push(`/productpage/` + id);
  }
  // console.log(data)
  return (
    <>
      {Array.isArray(data) && data.map((item: CartItemInfo) => (
        <IonItem>
          <IonThumbnail slot="start">
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
          </IonThumbnail>
          <IonLabel>{item.name}</IonLabel>
          <IonButton onClick={() => onClickProductPage(item.product_id)}>
            詳細
          </IonButton>
          ${item.price}
          <DeleteButton />
          <CheckBox />
        </IonItem>
      ))}
    </>
  );
}
export default CartItem;