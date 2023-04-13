import { IonItem, IonLabel, IonButton, IonThumbnail, IonButtons, IonIcon, IonCheckbox, useIonViewWillEnter } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import { useHistory } from 'react-router';
import { fetchCart, fetchDropFromCart, fetchIsBuying, fetchPurchaseHistory } from '../api/fetchAll';
import { useAppSelector } from '../redux/store';
import { closeCircle } from 'ionicons/icons';
import { fetchUser } from '../api/fetchUser';

interface ProductInterface {
  id: number;
  product_id: number;
  product: any;
  avg_rating: number;
  file_url: string;
  image: string;
  user_id: number;
  subject_id?: number;
  teacher_id: number;
  created_at: Date;
  updated_at: Date;
}

function PurchasedItem() {
  const userId = useAppSelector(state => state.user.id)

  const { data: purchaseHistory, isLoading, refetch } = useQuery({
      queryKey: ["purchasehistory", userId],
      queryFn: async () => {
          if (userId) { return await fetchPurchaseHistory(userId) }
          return []
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
  });

  console.log(purchaseHistory)

  useIonViewWillEnter(()=>{
    refetch()
  })
  
  const history = useHistory();
  const onClickProductPage = (id: number) => {
    history.push(`/productpage/` + id);
  }

  console.log(purchaseHistory?.length)

  if (isLoading) return <>loading</>

  if (purchaseHistory?.length === 0) {
    return (
      <div>尚未購買產品</div>
    )
  } else {
    return (
      <>

        {Array.isArray(purchaseHistory) && purchaseHistory.map((item: ProductInterface) => (
          <IonItem key={item.id}>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </IonThumbnail>
            <IonLabel>{item.product.name}</IonLabel>
            <IonButton onClick={() => onClickProductPage(item.product_id)}>
              詳細
            </IonButton>
            {/* ${item.product.price} */}
          </IonItem>
        ))}
        
      </>
    );
  }
}
export default PurchasedItem;