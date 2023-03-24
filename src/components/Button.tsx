import React from 'react';
import { IonButton } from '@ionic/react';

function Button() {
    return (
        <>
            <IonButton>Default</IonButton>
            <IonButton disabled={true}>Disabled</IonButton>
        </>
    );
}
export default Button;