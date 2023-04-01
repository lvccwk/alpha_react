import { IonButton, IonContent, IonInput, IonPage } from "@ionic/react"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import ToolBar from "../components/Toolbar"

const Register: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

    function registerUser() {
        console.log(username, password, cpassword)
    }
    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent className="ion-padding">
                    <IonInput placeholder="Username?" onIonChange={(e: any) => setUsername(e.target.value)} />
                    <IonInput placeholder="Password?" onIonChange={(e: any) => setPassword(e.target.value)} />
                    <IonInput placeholder="Confirm Password?" onIonChange={(e: any) => setCPassword(e.target.value)} />
                    <IonButton onClick={registerUser}>Register</IonButton>
                    <p>已經注册了？<Link to='/login'> </Link></p>
                </IonContent>
            </IonPage>
        </>
    );
}
export default Register;


