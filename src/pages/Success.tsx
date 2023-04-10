import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import ToolBar from '../components/Toolbar';

interface LocationState {
    amount: number;
}

const StripePurchaseSuccessPage: React.FC = () => {
    const location = useLocation<LocationState>();
    const amount = location.state && location.state.amount;
    const history = useHistory();

    const handleClick = () => {
        history.push('/');
    };

    const handleClickPurchaseHistory = () => {
        history.push('/purchasehistory');
    };

    return (
        <IonPage>
            <ToolBar />
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