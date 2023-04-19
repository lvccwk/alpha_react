import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonCardTitle, IonCard, IonCardHeader, IonIcon } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import ToolBar from '../components/Toolbar';
import { fetchUser } from '../api/fetchUser';
import { useQuery } from '@tanstack/react-query';
import { fetchAddPurchaseHistory } from '../api/fetchAll';
import { useEffect, useState } from 'react';
import './../..//src/components/UiDesign/Checkout.css';
import { checkmarkCircleOutline } from 'ionicons/icons';
interface LocationState {
    amount: number;
}

interface User {
    id: number;
}
const StripePurchaseSuccessPage: React.FC = () => {
    const location = useLocation<LocationState>();
    const amount = location.state && location.state.amount;
    const history = useHistory();

    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const [user, setUser] = useState<User | undefined>();

    const { refetch } = useQuery({
        queryKey: ["userPayment"],
        queryFn: () => fetchUser(),
        onSuccess: (data) => {
            setUser(data);
            setUserDataLoaded(true);
        },
    });

    useEffect(() => {
        if (user && userDataLoaded) {
            fetchAddPurchaseHistory(user.id);
        }
    }, [user, userDataLoaded]);

    const handleClick = () => {
        history.push("/");
    };

    const handleClickPurchaseHistory = () => {
        history.push("/purchasehistory");
    };

    return (
        <>
            <IonPage>
                <ToolBar />

                <IonContent>
                    <div className="purchase-success-page-container">
                        <IonIcon className="label-bottom" icon={checkmarkCircleOutline} />

                        <IonCardTitle className="purchase-success-page-title">購買成功</IonCardTitle>
                        <p className="purchase-success-page-text">您的貨品已成功處理。</p>
                        <IonButton onClick={handleClick}>
                            返回主頁
                        </IonButton>
                        <br></br>
                        <IonButton onClick={handleClickPurchaseHistory}>
                            購買記錄
                        </IonButton>
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
};

export default StripePurchaseSuccessPage;