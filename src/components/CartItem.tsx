
import { IonItem, IonLabel, IonButton, IonThumbnail, IonButtons, IonIcon, IonCheckbox, useIonViewWillEnter } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import { useHistory } from 'react-router';
import { fetchCart, fetchDropFromCart, fetchIsBuying } from '../api/fetchAll';
import { useAppSelector } from '../redux/store';
import { closeCircle } from 'ionicons/icons';
import Button from '../components/Button';

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
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cartItem"],
    queryFn: async () => await fetchCart(id),
    // refetchInterval: 500,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  useIonViewWillEnter(()=>{
    refetch()
  })
  
  const history = useHistory();
  const onClickProductPage = (id: number) => {
    history.push(`/productpage/` + id);
  }

  const onClickDropFromCart = async (id: number) => {
    await fetchDropFromCart(id)
    refetch()
  }

  const setIsBuying = async (id: number, is_buying: boolean) => {
    if (is_buying === true) {
      await fetchIsBuying(id, false)
    } else if (is_buying === false) {
      await fetchIsBuying(id, true)
    }
    refetch()
  }

  console.log(data?.cart_detail.length)

  if (isLoading) return <>loading</>

  if (data?.cart_detail.length === 0) {
    return (
      <div>尚未加入產品</div>
    )
  } else {
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
            <IonButtons>
              <IonButton onClick={() => onClickDropFromCart(item.id)}>
                <IonIcon slot="icon-only" icon={closeCircle} ></IonIcon>
              </IonButton>
            </IonButtons>
            <IonCheckbox slot="end" checked={item.is_buying} onClick={() => setIsBuying(item.id, item.is_buying)}></IonCheckbox>

          </IonItem>
        ))}
        <Button />


      </>
    );
  }
}
export default CartItem;