import React from 'react';
import { IonContent, IonHeader, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';

function Refresh() {

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            event.detail.complete();
        }, 2000);
    }

    return (
        <>

            <IonRefresher color='#fffff' slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>

        </>
    );
}
export default Refresh;