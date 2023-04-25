
import { IonItem, IonLabel, IonButton, IonThumbnail, IonButtons, IonIcon, IonCheckbox, useIonViewWillEnter, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg, IonCardSubtitle } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import { useHistory } from 'react-router';
import { fetchCart, fetchDropFromCart, fetchIsBuying } from '../api/fetchAll';
import { useAppSelector } from '../redux/store';
import { cart, closeCircle, person } from 'ionicons/icons';
import Button from '../components/Button';
import './Cartitem.css'

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
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cartItem"],
    queryFn: async () => await fetchCart(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  useIonViewWillEnter(() => {
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

  if (isLoading) return <>loading</>

  if (data?.cart_detail.length === 0) {
    return (

      <IonCardContent >
        <IonCardHeader>
          <div className='shoppingCart'>
            <IonIcon className="shoppingCartWithNoLogin" icon={cart} />
            <br></br>
            <IonCardTitle>暫時沒有貨品</IonCardTitle>
            <br></br>
          </div>
        </IonCardHeader>
      </IonCardContent>


    )
  } else {
    return (
      <>
        {Array.isArray(data?.cart_detail) && data?.cart_detail.map((item: CartItemInfo) => (
          <div>
            <br />
            <IonItem key={item.id}>
              <div className='cartList' onClick={() => onClickProductPage(item.product_id)}>
                <IonThumbnail className='image-size' slot="start">
                  <img alt="Product thumbnail" src={item.product.image} />
                </IonThumbnail>
                <IonLabel className='ion-padding'>
                  <h2>{item.product.name}</h2>
                  {/* <p>Size: {item.product.size}</p> */}
                  <h3>HKD: ${item.product.price}</h3>
                </IonLabel>
              </div>
              <IonButtons>
                <IonButton onClick={() => onClickDropFromCart(item.id)}>
                  <IonIcon slot="icon-only" icon={closeCircle} color='danger'></IonIcon>
                </IonButton>
              </IonButtons>
              <IonCheckbox slot="end" checked={item.is_buying} color='success' onClick={() => setIsBuying(item.id, item.is_buying)}></IonCheckbox>
            </IonItem>

          </div>
        ))}
        <br /><br />

        <Button />
        <br /><br />
      </>
    );
  }
}
export default CartItem;