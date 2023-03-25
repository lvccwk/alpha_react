import { useState } from 'react';
import { IonGrid, IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import ToolBar from './Toolbar';
import Card from './Card';
import ListCard from './ListCard';
import Refresh from './Refresh';

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
                    <h1>導師列表</h1>
                    <p>

                        <IonGrid >
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </IonGrid>
                    </p>
                </div>
            ) : (
                <div>
                    <h1>Segment Content</h1>
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
