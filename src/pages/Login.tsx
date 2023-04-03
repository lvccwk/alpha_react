import { IonButton, IonContent, IonInput, IonPage } from "@ionic/react";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import { IonToast } from '@ionic/react';
import { loginUser, loginUserWithFacebook, loginUserWithGoogle } from "../config/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// import { Button } from "react-bootstrap";

const auth = getAuth();
export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');


    const onFacebookLogin = (event: React.MouseEvent) => {
        event.preventDefault()
        const authURL = 'https://www.facebook.com/dialog/oauth'
        const search = new URLSearchParams()
        search.set('client_id', process.env.REACT_APP_FACEBOOK_APP_ID + "")
        search.set(
            'redirect_uri',
            `${window.location.origin}/facebook-callback`
        )
        search.set('response_type', 'code')
        search.set('state', '')
        search.set('scope', 'email,public_profile')
        window.location.href = `${authURL}?${search.toString()}`
    }


    async function login() {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, username, password);

            // Get the JWT token from userCredential
            const idToken = await userCredential.user.getIdToken();

            localStorage.setItem("idToken", idToken)
            // Do something with the token
            console.log(idToken);

            // Show login success message
            setShowToast(true);
            setToastMessage('Login successful!');
        } catch (error) {
            console.error(error);

            // Show login error message
            setShowToast(true);
            setToastMessage('Login failed. Please try again.');
        }
    }

    const handleFacebookLogin = async () => {
        try {
            await loginUserWithFacebook();

            setLoggedIn(true);
        } catch (error) {
            setLoggedIn(false);
            console.log(error);
        }
    }


    const [loggedIn, setLoggedIn] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            await loginUserWithGoogle();
            setLoggedIn(true);
        } catch (error) {
            setLoggedIn(false);
            console.log(error);
        }
    }

    return (
        <IonPage>
            <Toolbar />
            <IonContent>
                <h1>Facebook Login Page</h1>
                <button onClick={onFacebookLogin}>Login via Facebook</button>
                <br />
                <h1>Google Login Page</h1>
                {loggedIn ? (
                    <p>You are logged in with Google.</p>
                ) : (
                    <button onClick={handleGoogleLogin}>Sign in with Google</button>
                )}

                <IonContent className="ion-padding">
                    用戶名稱
                    <IonInput
                        placeholder="Username?"
                        onIonChange={(e: any) => setUsername(e.target.value)}
                    />
                    密碼
                    <IonInput
                        type='password' placeholder="Password?"
                        onIonChange={(e: any) => setPassword(e.target.value)}
                    />
                    <IonButton onClick={login}>一般登入</IonButton>
                    {/* <p>已經注册了？<Link to='/login'> </Link></p> */}
                    <p>
                        新用戶？
                        <Link to="/register">按此註冊</Link>
                    </p>
                    <IonToast
                        isOpen={showToast}
                        message={toastMessage}
                        duration={4000}
                        onDidDismiss={() => setShowToast(false)}
                    />
                </IonContent>
            </IonContent>
        </IonPage>
    );
}