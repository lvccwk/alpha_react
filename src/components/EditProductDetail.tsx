import {
    IonAlert,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCheckbox,
    IonCol,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonRow,
    IonToggle,
    useIonViewWillEnter,
  } from "@ionic/react";
  import { useEffect, useState } from "react";
  import { useHistory, useParams } from "react-router-dom";
  import { useMutation, useQuery } from "@tanstack/react-query";
  import { set, useForm } from "react-hook-form"
  import './../../src/components/UiDesign/UserProfile.css'
  import { FetchUserAllModel, fetchProduct, fetchUpdateProduct } from "../api/fetchAll";
  
  export default function EditProductDetail() {
    const params = useParams()
    const productId = Object.values(params)[0]
    const [showAlert, setShowAlert] = useState(false);
    const { refetch, remove } = useQuery({
        queryKey: ["productDetail", params],
        queryFn: async () => await fetchProduct(Number(productId)),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        onSuccess:(product)=>{
            console.log("PRODUCT=",product)
            console.log("PRODUCTONSALE=",product.is_onsale)
            setValue("id", product ? product.id: Number(productId))
            setValue("name", product ? product.name : "")
            setValue("price", product ? product.price : NaN)
            setValue("info", product ? product.info : "")
            setValue("is_onsale",  product.is_onsale)
        }
    });

    useIonViewWillEnter(() => {
        console.log("useIonViewWillEnter")
        refetch()
    })
    const { register, handleSubmit, setValue,getValues } = useForm<FetchUserAllModel>({
        defaultValues: {
        }
    })
    
  
    console.log(getValues())
    const fetchUpdateItem = useMutation(fetchUpdateProduct, {
      onSuccess(data, variables, context) {
        refetch();
        setShowAlert(true);
        remove();
      },
      onError: (error) => {
        console.error("Failed to update product: ", error);
      },
    });
  
    const onSubmit = (state: FetchUserAllModel) => {
      console.log(state)
      fetchUpdateItem.mutate(state);
    }
  
    const history = useHistory();
    const onClickProductPage = (id: number) => {
        history.push(`/productpage/` + id);
    }


    
    return (
  
      <IonCard className="editProfilCard">
        {/* <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" /> */}
        <IonCardHeader>
          <IonCardTitle> 編輯課程/筆記資料 </IonCardTitle>
          <div className='userlogo'> </div>
        </IonCardHeader>
        <IonCardContent>
          <form className='editProfileSetting' id="edit-profile" onSubmit={handleSubmit(onSubmit)}>
            <IonInput aria-label="Custom input" class="custom" {...register("name")} /><br></br>
            <IonInput aria-label="Custom input" type="number" class="custom" {...register("price")} /><br></br>
            <IonInput aria-label="Custom input" class="custom" {...register("info")} /><br></br>

            <IonItem>
                <IonToggle checked={getValues("is_onsale")} onClick={() => setValue("is_onsale", !getValues("is_onsale"))}>上架 {getValues("is_onsale")}</IonToggle>
            </IonItem>


            <IonButton type="submit" form={"edit-profile"} >更新</IonButton>
            
          </form>
        </IonCardContent>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'更新成功'}
          message={'資料已更新。'}
          buttons={['確定']}
          onClick={() => onClickProductPage(Number(productId))}
        />
      </IonCard>
  
  
    )
  }


// name price info is_onsale