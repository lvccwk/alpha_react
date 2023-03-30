import { IonContent, IonPage } from "@ionic/react";
import Toolbar from "../components/Toolbar";
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
    return (
        <IonPage>
            <Toolbar />
            <IonContent>
                <div>Login Page</div>
                <button onClick={onFacebookLogin}>
                    Login via Facebook
                </button>
            </IonContent>
        </IonPage>
    );
}