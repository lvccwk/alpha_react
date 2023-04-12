import { IonButton, IonIcon } from "@ionic/react";
import { paperPlane } from "ionicons/icons";
import { useState } from "react";

export default function MessageInput({ send }: { send: (val: string) => void }) {
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        send(value);
        setValue('');
    };

    return (
        <>
            <div className="inputContainer">
                <div className="inputBar">
                    <input
                        className="inputChatBox"
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Type your message..."
                        value={value}
                    />
                    <IonButton className="inputBarBtn" size="default" onClick={handleSubmit}>
                        <IonIcon size="default" icon={paperPlane} color="white" />
                    </IonButton>
                </div>
            </div>
        </>

    );
}
