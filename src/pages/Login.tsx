import { IonButton, IonContent, IonPage } from "@ionic/react";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import Toolbar from "../components/Toolbar";

import { loginUserWithFacebook, loginUserWithGoogle } from "../config/firebaseConfig";

// import { Button } from "react-bootstrap";

export default function LoginPage() {



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


    const [loggedIn, setLoggedIn] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            await loginUserWithGoogle();
            setLoggedIn(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <IonPage>
            <Toolbar />
            <IonContent>
                <h1>Facebook Login Page</h1>
                <button onClick={onFacebookLogin}>
                    Login via Facebook
                </button>
                <br></br>
                <h1>Google Login Page</h1>
                {loggedIn ? (
                    <p>You are logged in with Google.</p>
                ) : (
                    <button onClick={handleGoogleLogin}>Sign in with Google</button>
                )}
                <p>沒有帳號了？<Link to='/register'>註冊</Link></p>
            </IonContent>
        </IonPage>
    );
}