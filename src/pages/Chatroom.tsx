import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonMenu, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import Chatbox from '../components/Chatbox';
import ExploreContainer from '../components/ExploreContainer';
import ToolBar from '../components/Toolbar';
import './Resource.css';

const Chatroom: React.FC = () => {
    return (
        <>
            <IonPage >
                <h1>聊天室</h1>
                <ToolBar />
                <IonContent>
                    <Chatbox />
                </IonContent>
            </IonPage>
        </>
    );
};

export default Chatroom;
