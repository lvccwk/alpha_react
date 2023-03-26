import React from 'react';
import { IonButton, useIonAlert } from '@ionic/react';
import './AddToCartBtn.css';
function AddToCartBtn() {
    const [presentAlert] = useIonAlert();

    return (
        <IonButton
            onClick={() =>
                presentAlert({
                    header: '提示信息',
                    // subHeader: '加入購物車',
                    message: '加入購物車',
                    buttons: ['OK'],
                })
            }
        >
            加入購物車
        </IonButton>
    );
}
export default AddToCartBtn;