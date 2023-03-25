import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonMenu, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import Card from '../components/Card';
import ExploreContainer from '../components/ExploreContainer';
import Refresh from '../components/Refresh';
import Segment from '../components/Segment';
import ToolBar from '../components/Toolbar';


const Tutor: React.FC = () => {
    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent>
                    <Segment />
                </IonContent>
            </IonPage>
        </>
    );
};

export default Tutor;
