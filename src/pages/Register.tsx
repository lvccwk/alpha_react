import { IonButton, IonContent, IonInput, IonPage, IonToast } from "@ionic/react"
import React, { useState } from "react"
import { Link, Redirect, useHistory } from "react-router-dom"
import ToolBar from "../components/Toolbar"
import { registerUser } from "../config/firebaseConfig"

const Register: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const history = useHistory();

    async function handleRegisterUser() {
        if (password !== cpassword) {
            setShowToast(true);
            setToastMessage('密碼不一致!');
            return
        }
        if (username.trim() === '' || password.trim() === '') {
            setShowToast(true);
            setToastMessage('用戶名或密碼不能留空!');
            return
        }
        const res = await registerUser(username, password);
        if (res) {
            setShowToast(true);
            setToastMessage('註冊成功! 請登入');
            history.push('/login');
        }

    }

    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent className="ion-padding">
                    <IonInput placeholder="Username?" onIonChange={(e: any) => setUsername(e.target.value)}></IonInput>
                    <IonInput type='password' placeholder="Password?" onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
                    <IonInput type='password' placeholder="Confirm Password?" onIonChange={(e: any) => setCPassword(e.target.value)}></IonInput>
                    <IonButton onClick={handleRegisterUser}>Register</IonButton>
                    {/* <p>已經注册了？<Link to='/login'> </Link></p> */}
                </IonContent>
                <IonToast
                    isOpen={showToast}
                    message={toastMessage}
                    duration={5000}
                    onDidDismiss={() => setShowToast(false)}
                />
            </IonPage>
        </>
    );
}
export default Register;


