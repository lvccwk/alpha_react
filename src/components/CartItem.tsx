import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList, IonButton, IonThumbnail } from '@ionic/react';
import CheckBox from './CheckBox';
import ButtonX from './ButtonX';
import { useQuery } from '@tanstack/react-query';
import DeleteButton from './DeleteButton';
import { useHistory } from 'react-router';
import { fetchCart } from '../api/fetchAll';
import { useAppSelector } from '../redux/store';

interface CartItemInfo {
  id: number;
  product_id: number;
  name: string;
  price: number;
  image: any;
  is_buying: boolean;
  cart: any;
  product: ProductInterface;
}

interface ProductInterface {
  id: number;
  name: string;
  price: number;
  product_type: string;
  avg_rating: number;
  file_url: string;
  image: string;
  user_id: number;
  subject_id?: number;
  teacher_id: number;
  created_at: Date;
  updated_at: Date;
}

function CartItem() {
  const id = useAppSelector(state => state.user.id)
  const log = useAppSelector(state => state.user.isLoggedIn)
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["cartItem"],
    queryFn: () => fetchCart(id),
  });
  fetchCart(id)
  const history = useHistory();
  const onClickProductPage = (id: number) => {
    history.push(`/productpage/` + id);
  }
  console.log(data)
  return (
    <>

      {Array.isArray(data?.cart_detail) && data?.cart_detail.map((item: CartItemInfo) => (
        <IonItem key={item.id}>
          <IonThumbnail slot="start">
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
          </IonThumbnail>
          <IonLabel>{item.product.name}</IonLabel>
          <IonButton onClick={() => onClickProductPage(item.product_id)}>
            詳細
          </IonButton>
          ${item.product.price}
          <DeleteButton />
          <CheckBox />
        </IonItem>
      ))}


    </>
  );
}
export default CartItem;