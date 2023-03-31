import { useState } from 'react';
import { IonCol, IonGrid, IonLabel, IonRow, IonSegment, IonSegmentButton } from '@ionic/react';
import ToolBar from './Toolbar';
import Card from './Card';
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
            <IonSegment value={selectedSegment} onIonChange={handleSegmentChange}>
                <IonSegmentButton value="default">
                    <IonLabel>課程</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="segment">
                    <IonLabel>筆記</IonLabel>
                </IonSegmentButton>
            </IonSegment>

            {selectedSegment === 'default' ? (
                <div>
                    <p>
                        <IonGrid>
                            <IonRow>
                                <IonCol><CourseCard /></IonCol>
                            </IonRow>
                        </IonGrid>
                    </p>
                </div>
            ) : (
                <div>
                    <p>
                        <IonGrid >
                            <NoteCard />    
                        </IonGrid>
                    </p>
                </div>
            )}
        </>
    );
}

export default ProductSegment;
