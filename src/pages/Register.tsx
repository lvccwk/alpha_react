import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonToast } from "@ionic/react"
import { useQuery } from "@tanstack/react-query/build/lib/useQuery"
import React, { useEffect, useState } from "react"
import { Link, Redirect, useHistory } from "react-router-dom"
import { fetchAddUser } from "../api/fetchUser"
import ToolBar from "../components/Toolbar"
import { registerUser } from "../config/FirebaseConfig"
import './../../src/components/UiDesign/Login.css'
import Refresh from "../components/Refresh"

const Register: React.FC = () => {
    const [user_type, setUserType] = useState('');
    const [username, setUsername] = useState('username');
    const [email, setUseremail] = useState('email@gmail.com');
    const [password, setPassword] = useState('12345678');
    const [cpassword, setCPassword] = useState('12345678');
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
                <IonContent className="ion-padding" >選擇帳戶類別
                    <Refresh />
                    <div className="register">
                        <IonSelect
                            // aria-label="Custom input" class="custom"
                            value={user_type}
                            placeholder="Select User Type"
                            onIonChange={(e: any) => setUserType(e.detail.value)} >
                            <IonSelectOption value="teacher">導師</IonSelectOption>
                            <IonSelectOption value="student">學生</IonSelectOption>
                        </IonSelect>
                        {/* <IonInput value={user_type} placeholder="User_type?" onIonChange={(e: any) => setUsertype(e.target.value)}></IonInput> */}
                        <IonInput aria-label="Custom input" class="custom" value={username} placeholder="username" onIonChange={(e: any) => { console.log(e); setUsername(e.target.value) }}>用戶名稱：</IonInput><br></br>
                        <IonInput aria-label="Custom input" class="custom" value={email} placeholder="email" onIonChange={(e: any) => setUseremail(e.target.value)}>電郵</IonInput><br></br>
                        <IonInput aria-label="Custom input" class="custom" value={password} placeholder="password" onIonChange={(e: any) => setPassword(e.target.value)}>密碼</IonInput><br></br>
                        <IonInput aria-label="Custom input" class="custom" value={cpassword} placeholder="Confirm Password" onIonChange={(e: any) => setCPassword(e.target.value)}>確認密碼</IonInput><br></br>
                        <IonButton onClick={handleRegisterUser}>註冊</IonButton>
                    </div >
                </IonContent>

                <IonToast position="top"
                    isOpen={showToast}
                    message={toastMessage}
                    duration={1000}
                    onDidDismiss={() => setShowToast(false)}
                />
            </IonPage >
        </>
    );
};

export default Register;