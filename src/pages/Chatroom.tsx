import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonMenu, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import Chatbox from '../components/Chatbox';
import ExploreContainer from '../components/ExploreContainer';
import ToolBar from '../components/Toolbar';
import ChatroomContact from '../components/UiDesign/ChatroomContact';
import { useAppSelector } from '../redux/store';
import SignInUpCard from '../components/UiDesign/SignInUpCard';
import './../../src/components/UiDesign/Chatroom.css'

const Chatroom: React.FC = () => {
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)
    if (isLoggedIn === false) {
        return (
            <IonPage >
                <ToolBar />
                <IonContent className='chatroomContent'>
                    <IonCardTitle className='ion-padding'>通訊錄</IonCardTitle>
                    <SignInUpCard />
                </IonContent>
            </IonPage>
        )
    } else {

        return (
            <IonPage >
                <ToolBar />
                <IonContent className='chatroomContent'>
                    <IonCardTitle className='ion-padding' >通訊錄</IonCardTitle>
                    <ChatroomContact />
                </IonContent>
            </IonPage>
        );
    };
}
export default Chatroom;
