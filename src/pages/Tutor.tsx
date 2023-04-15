import { IonCardTitle, IonContent, IonPage, IonSearchbar, } from '@ionic/react';

import Segment from '../components/Segment';
import ToolBar from '../components/Toolbar';


const Tutor: React.FC = () => {
    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent className='ion-padding'>
                    <IonCardTitle>導師列表</IonCardTitle>
                    <br></br>
                    <Segment />
                </IonContent>
            </IonPage>
        </>
    );
};

export default Tutor;


