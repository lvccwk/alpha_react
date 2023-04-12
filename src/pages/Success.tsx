import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import ToolBar from '../components/Toolbar';
import { fetchUser } from '../api/fetchUser';
import { useQuery } from '@tanstack/react-query';
import { fetchAddPurchaseHistory } from '../api/fetchAll';

interface LocationState {
    amount: number;
}

const StripePurchaseSuccessPage: React.FC = () => {
    const location = useLocation<LocationState>();
    const amount = location.state && location.state.amount;
    const history = useHistory();

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: () => fetchUser(),
    });

    fetchAddPurchaseHistory(user?.id)

    const handleClick = () => {
        history.push('/');
    };

    const handleClickPurchaseHistory = () => {
        history.push('/purchasehistory');
    };

    return (
        <IonPage>
            <ToolBar />
            <h1>Payment Succuess</h1>
            <IonContent className="ion-padding">
                <p>Your payment of ${amount} has been processed successfully.</p>
                <IonButton expand="block" onClick={handleClick}>
                    Back to Home
                </IonButton>
                <IonButton expand="block" onClick={handleClickPurchaseHistory}>
                    Purchase History
                </IonButton>
            </IonContent>

        </IonPage>
    );
};

export default StripePurchaseSuccessPage;