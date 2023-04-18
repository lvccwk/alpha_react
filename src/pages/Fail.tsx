import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonCardTitle, IonIcon } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import ToolBar from '../components/Toolbar';
import './../..//src/components/UiDesign/Checkout.css';
import { closeCircle, closeCircleOutline } from 'ionicons/icons';
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
            <ToolBar />

            <IonContent>
                <div className="purchase-success-page-container">
                    <IonIcon className="label-bottom" icon={closeCircleOutline} />

                    <IonCardTitle className="purchase-success-page-title">購買失敗</IonCardTitle>
                    <p className="purchase-success-page-text">抱歉，您的付款無法處理。</p>
                    <IonButton onClick={handleClick}>
                        返回主頁
                    </IonButton>
                    <br></br>

                </div>
            </IonContent>
        </IonPage>


    );
};

export default StripePurchaseFailPage;

