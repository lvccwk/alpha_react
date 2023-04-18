import { useState } from 'react';
import { IonCard, IonCardTitle, IonCol, IonContent, IonGrid, IonLabel, IonRow, IonSegment, IonSegmentButton } from '@ionic/react';
import ToolBar from './Toolbar';
import ListCard from './ListCard';
import Refresh from './Refresh';
import TeacherCard from './TeacherCard';
import FollowedTeachers from './FollowedTeachers';
import './../../src/components/UiDesign/Tutor.css'
function Segment() {
    const [selectedSegment, setSelectedSegment] = useState('default');

    const handleSegmentChange = (e: any) => {
        setSelectedSegment(e.detail.value);
    }

    return (
        <>
            <IonSegment className='ion-padding' value={selectedSegment} onIonChange={handleSegmentChange}>
                <IonSegmentButton value="default">
                    <IonLabel>名師庫</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="segment">
                    <IonLabel>Bookmark</IonLabel>
                </IonSegmentButton>
            </IonSegment>

            {selectedSegment === 'default' ? (
                <div>
                    <TeacherCard />
                </div>
            ) : (
                <div>

                    <FollowedTeachers />

                    <ListCard />
                </div>
            )}
        </>
    );
}

export default Segment;
