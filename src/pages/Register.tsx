import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonToast } from "@ionic/react"
import { useQuery } from "@tanstack/react-query/build/lib/useQuery"
import React, { useEffect, useState } from "react"
import { Link, Redirect, useHistory } from "react-router-dom"
import { fetchAddUser } from "../api/fetchUser"
import ToolBar from "../components/Toolbar"
import { registerUser } from "../config/firebaseConfig"


const Register: React.FC = () => {
    const [user_type, setUserType] = useState('');
    const [username, setUsername] = useState('');
    const [email, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const history = useHistory();

    const handleRegisterUser = () => {
        console.log("username: ", username)
        console.log("password: ", password)
        console.log("cpassword: ", cpassword)
        console.log("user_type: ", user_type)
        console.log('email:', email)
        console.log('toastMessage', toastMessage)

        if (password !== cpassword) {
            setShowToast(true);
            setToastMessage('密碼不一致!');
        } else if (username.trim() === '' || password.trim() === '') {
            setShowToast(true);
            setToastMessage('用戶名或密碼不能留空!');
        } else {
            const fetchData = async () => {
                try {
                    const res = await fetchAddUser({
                        user_type: user_type,
                        username: username,
                        email: email,
                        password: password
                    });
                    if (res) {
                        setShowToast(true);
                        setToastMessage('註冊成功! 請登入');
                        history.push('/login');
                    }
                } catch (error) {
                    console.log(error)
                    setShowToast(true);
                    setToastMessage('註冊失敗');
                }
            };
            if (username.trim() !== '' && password.trim() !== '' && password === cpassword) {
                fetchData();
            }
        }
    };

    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent className="ion-padding">
                    <IonSelect
                        value={user_type}
                        placeholder="Select User Type"
                        onIonChange={(e: any) => setUserType(e.detail.value)} >
                        <IonSelectOption value="teacher">導師</IonSelectOption>
                        <IonSelectOption value="student">學生</IonSelectOption>
                    </IonSelect>
                    {/* <IonInput value={user_type} placeholder="User_type?" onIonChange={(e: any) => setUsertype(e.target.value)}></IonInput> */}
                    <IonInput value={username} placeholder="username" onIonChange={(e: any) => setUsername(e.target.value)}></IonInput>
                    <IonInput value={email} placeholder="email" onIonChange={(e: any) => setUseremail(e.target.value)}></IonInput>
                    <IonInput value={password} placeholder="password" onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
                    <IonInput value={cpassword} placeholder="Confirm Password" onIonChange={(e: any) => setCPassword(e.target.value)}></IonInput>
                    <IonButton onClick={handleRegisterUser}>Register</IonButton>
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
};

export default Register;