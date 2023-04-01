import { IonButton, IonContent, IonHeader, IonInput, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import Toast from "../components/Toast";
import ToolBar from "../components/Toolbar";
import { loginUser } from "../firebaseConfig";



const LoginFirebase: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isOpen, setIsOpen] = useState(false);

    async function login() {
        const res = await loginUser(username, password)
        console.log(`${res ? 'Login success' : 'Login failed'}`)
        console.log(username, password)

    }
    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent className="ion-padding">
                    <IonInput placeholder="Username?" onIonChange={(e: any) => setUsername(e.target.value)} />
                    <IonInput placeholder="Password?" onIonChange={(e: any) => setPassword(e.target.value)} />
                    <IonButton onClick={login}>Login</IonButton>

                </IonContent>

            </IonPage>
        </>
    );
}
export default LoginFirebase;
