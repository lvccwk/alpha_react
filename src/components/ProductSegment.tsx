import { useState } from 'react';
import { IonCol, IonGrid, IonLabel, IonRow, IonSegment, IonSegmentButton } from '@ionic/react';
import ToolBar from './Toolbar';
import Refresh from './Refresh';
import CourseCard from './CourseCard';
import NoteCard from './NoteCard';

function ProductSegment() {
    const [selectedSegment, setSelectedSegment] = useState('default');

    const handleSegmentChange = (e: any) => {
        setSelectedSegment(e.detail.value);
    }

    return (
        <>
            <IonSegment className='ion-padding' value={selectedSegment} onIonChange={handleSegmentChange}>
                <IonSegmentButton value="default">
                    <IonLabel>課程</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="segment">
                    <IonLabel>筆記</IonLabel>
                </IonSegmentButton>
            </IonSegment>

            {selectedSegment === 'default' ? (
                <div>
                    <CourseCard />
                </div>
            ) : (
                <div>
                    <NoteCard />
                </div>
            )}
        </>
    );
}

export default ProductSegment;
