import { IonContent, IonPage } from '@ionic/react';
import Chatbox from '../components/Chatbox';
import ToolBar from '../components/Toolbar';

const ChatMessage: React.FC = () => {
    return (
        <>
            <IonPage >
                <ToolBar />
                <IonContent className='no-padding'>
                    <Chatbox />
                </IonContent>
            </IonPage>
        </>
    );
};

export default ChatMessage;
