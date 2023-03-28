import React from 'react';
import {
  IonCheckbox,
  IonItem,
  IonLabel
} from '@ionic/react';


function CheckBox() {
  return (
    <IonItem>
      <IonCheckbox slot="end"></IonCheckbox>
      <IonLabel></IonLabel>
    </IonItem>
  );
}
export default CheckBox;