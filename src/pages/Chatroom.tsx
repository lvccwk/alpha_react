import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonMenu, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import Chatbox from '../components/Chatbox';
import ExploreContainer from '../components/ExploreContainer';
import ToolBar from '../components/Toolbar';
import ChatroomContact from '../components/UiDesign/ChatroomContact';
import { useAppSelector } from '../redux/store';
import SignInUpCard from '../components/UiDesign/SignInUpCard';


const Chatroom: React.FC = () => {
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)
    if (isLoggedIn === false) {
        return (
            <>
                <IonPage >
                    <ToolBar />
                    <IonContent class='ion-padding'>
                        <IonCardTitle>通訊錄</IonCardTitle>
                        <SignInUpCard />
                    </IonContent>
                </IonPage>
            </>
        )
    } else {

        return (
            <>
                <IonPage >
                    <ToolBar />
                    <IonContent class='ion-padding'>
                        <IonCardTitle>通訊錄</IonCardTitle>
                        {/* <Chatbox /> */}
                        <ChatroomContact />
                    </IonContent>
                </IonPage>
            </>
        );
    };
}
export default Chatroom;
