import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';

interface LocationState {
    errorMessage?: string;
}

const StripePurchaseFailPage: React.FC = () => {
    const location = useLocation<LocationState>();
    const errorMessage = location.state && location.state.errorMessage;
    const history = useHistory();

    const handleClick = () => {
        history.push('/');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Payment Failed</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <p>Sorry, your payment could not be processed.</p>
                {errorMessage && <p className="ion-text-color-danger">{errorMessage}</p>}
                <IonButton expand="block" onClick={handleClick}>
                    Back to Home
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default StripePurchaseFailPage;
