import React from 'react';
import { IonButton, useIonActionSheet } from '@ionic/react';

import '../components/ActionSheet';

function ActionSheet() {
    const [present] = useIonActionSheet();

    return (
        <IonButton
            onClick={() =>
                present({
                    header: 'Example header',
                    subHeader: 'Example subheader',
                    cssClass: 'my-custom-class',
                    buttons: [
                        {
                            text: 'Delete',
                            role: 'destructive',
                            data: {
                                action: 'delete',
                            },
                        },
                        {
                            text: 'Share',
                            data: {
                                action: 'share',
                            },
                        },
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            data: {
                                action: 'cancel',
                            },
                        },
                    ],
                })
            }
        >
            Open
        </IonButton>
    );
}
export default ActionSheet;