import { IonItem, IonLabel, IonButton, IonThumbnail, IonButtons, IonIcon, IonCheckbox, useIonViewWillEnter, IonCard, IonCardHeader, IonCardTitle, IonContent } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import { useHistory } from 'react-router';
import { fetchCart, fetchDropFromCart, fetchIsBuying, fetchPurchaseHistory, fetchTeacherProduct } from '../api/fetchAll';
import { useAppSelector } from '../redux/store';
import { cart, closeCircle, person } from 'ionicons/icons';
import { fetchUser } from '../api/fetchUser';
import './../../src/components/UiDesign/CartPage.css'
import { useParams } from 'react-router-dom';

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

function UploadHistoryList() {
    const params = useParams()
    const teacherId = Object.values(params)[0]
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["teacherDetailProduct"],
        queryFn: () => fetchTeacherProduct(Number(teacherId)),
    });

  useIonViewWillEnter(() => {
    refetch()
  })

  const history = useHistory();
  const onClickPurchasedItem = (id: number) => {
    history.push(`/PurchasedItem/` + id);
  }

  const onClickProductPage = (id: number) => {
      history.push(`/productpage/` + id);
  }

  console.log(data?.length)

  if (isLoading) return <>loading</>

  if (data?.length === 0) {
    return (
      <IonCard className='purchaseCart'>

        <IonCardHeader>
          <div className='shoppingCart'>
            <IonIcon className="shoppingCartWithNoLogin" icon={cart} />
            <br></br>
            <IonCardTitle>無上傳記錄</IonCardTitle>
            <br></br>
          </div>

        </IonCardHeader>
      </IonCard>
    )
  } else {
    return(
        <>
            {Array.isArray(data) && data.map((item: ProductInterface) => (
              <IonItem key={item.id}>
                <IonThumbnail slot="start">
                  <img src={`${item.image}`} />
                </IonThumbnail>
                <IonLabel>{item.name}</IonLabel>
                {item.product_type === "course" && (
                    "課程"
                )}
                {item.product_type === "note" && (
                    "筆記"
                )}
                ${item.price}
                <IonButton onClick={() => onClickProductPage(item.id)}>
                  詳細
                </IonButton>
              </IonItem>
            ))}
        </>
    )
  }
}
export default UploadHistoryList;