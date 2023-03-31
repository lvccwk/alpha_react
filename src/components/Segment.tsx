import { useState } from 'react';
import { IonCol, IonGrid, IonLabel, IonRow, IonSegment, IonSegmentButton } from '@ionic/react';
import ToolBar from './Toolbar';
import ListCard from './ListCard';
import Refresh from './Refresh';
import TeacherCard from './TeacherCard';

function Segment() {
    const [selectedSegment, setSelectedSegment] = useState('default');

    const handleSegmentChange = (e: any) => {
        setSelectedSegment(e.detail.value);
    }

    return (
        <>
            <IonSegment value={selectedSegment} onIonChange={handleSegmentChange}>
                <IonSegmentButton value="default">
                    <IonLabel>名師庫</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="segment">
                    <IonLabel>Bookmark</IonLabel>
                </IonSegmentButton>
            </IonSegment>

            {selectedSegment === 'default' ? (
                <div>
                    <p>
                        <IonGrid>
                            <IonRow>
                                <IonCol><TeacherCard /></IonCol>
                            </IonRow>
                        </IonGrid>
                    </p>
                </div>
            ) : (
                <div>
                    <h1>己追蹤的老師</h1>
                    <p>
                        <IonGrid >
                            <ListCard />
                        </IonGrid>
                    </p>
                </div>
            )}
        </>
    );
}

export default Segment;
