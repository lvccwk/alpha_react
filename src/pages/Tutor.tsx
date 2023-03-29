import { IonContent, IonPage, IonSearchbar, } from '@ionic/react';

import Segment from '../components/Segment';
import ToolBar from '../components/Toolbar';


const Tutor: React.FC = () => {
    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent>
                    <IonSearchbar placeholder="輸入搜尋內容"></IonSearchbar>
                    <Segment />
                </IonContent>
            </IonPage>
        </>
    );
};

export default Tutor;


