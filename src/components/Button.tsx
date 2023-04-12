import React from 'react';
import { IonButton , useIonAlert} from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import { fetchCart, fetchIsBuying, stripeCheckOut } from '../api/fetchAll';
import { useAppSelector } from '../redux/store';


function Button() {
    const id = useAppSelector(state => state.user.id)
    const log = useAppSelector(state => state.user.isLoggedIn)
    const { data: user, refetch } = useQuery({
        queryKey: ["checkCartId"],

        queryFn: async () => await fetchCart(id),
    });
    console.log(`cart_id = `, user?.id)
    const cart_id = user?.id

    async function checkout(cart_id: number) {
        try {
            let response = await stripeCheckOut(cart_id);
            console.log('url', response)
            window.location.href = response.url
        } catch (e) {
            console.log(e)
            noCartItemAlert()
        }
    }

    const [presentAlert] = useIonAlert();
    const noCartItemAlert = () => {
        presentAlert({
            header: '提示信息',
            message: '請選取想要購買的產品',
            buttons: ['OK'],
        })
    }

    return (
        <>
            {cart_id !== undefined && (
                <IonButton onClick={() => checkout(cart_id)}>
                    前往付款 stripe
                </IonButton>
            )}
        </>
    );
}
export default Button;