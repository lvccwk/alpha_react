import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonMenu, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import Chatbox from '../components/Chatbox';
import ExploreContainer from '../components/ExploreContainer';
import ToolBar from '../components/Toolbar';
import './Resource.css';
import ChatroomContact from '../components/UiDesign/ChatroomContact';


const Chatroom: React.FC = () => {
    return (
        <>
            <IonPage >
                <ToolBar />
                <IonContent class='ion-padding'>
                    <IonCardHeader>通訊錄</IonCardHeader>
                    {/* <Chatbox /> */}
                    <ChatroomContact />
                </IonContent>
            </IonPage>
        </>
    );
};

export default Chatroom;
