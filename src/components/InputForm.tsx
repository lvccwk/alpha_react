import React from 'react';
import { AlertButton, IonButton, useIonAlert } from '@ionic/react';


function InputForm() {
    const [presentAlert] = useIonAlert();
    const [presentAlert2] = useIonAlert();

    const ok: AlertButton = {
        text: 'OK',
        handler: () => {
            presentAlert2({
                header: 'Successful',
                buttons: ["OK"],

            })
        }
    }
    return (
        <IonButton
            onClick={() =>
                presentAlert({
                    header: 'Please enter your info',
                    buttons: [ok],
                    inputs: [
                        {
                            placeholder: 'Name',
                        },
                        {
                            placeholder: 'Nickname (max 8 characters)',
                            attributes: {
                                maxlength: 8,
                            },
                        },
                        {
                            type: 'number',
                            placeholder: 'Age',
                            min: 1,
                            max: 100,
                        },
                        {
                            type: 'textarea',
                            placeholder: 'A little about yourself',
                        },
                    ],
                })
            }
        >
            Click Me

        </IonButton>
    );
}
export default InputForm;

