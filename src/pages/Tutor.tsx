import { IonCard, IonCardTitle, IonContent, IonPage, IonSearchbar, } from '@ionic/react';

import Segment from '../components/Segment';
import ToolBar from '../components/Toolbar';
import './../../src/components/UiDesign/Tutor.css'

const Tutor: React.FC = () => {
    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent className='segment'>

                    <IonCardTitle className='ion-padding'>導師列表</IonCardTitle>
                    <br></br>
                    <Segment />

                </IonContent>
            </IonPage>
        </>
    );
};

export default Tutor;


