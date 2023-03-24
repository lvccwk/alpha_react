import { IonContent, IonPage } from "@ionic/react";
// import { Button } from "react-bootstrap";

export default function LoginPage() {
    const onFacebookLogin = (e: any) => {
        e.preventDefault()
        const authURL = 'https://www.facebook.com/dialog/oauth'
        const search = new URLSearchParams()
        search.set('client_id', process.env.REACT_APP_FACEBOOK_APP_ID + "")
        search.set(
            'redirect_uri',
            `${window.location.origin} / facebook - callback`
        )
        search.set('response_type', 'code')
        search.set('state', '')
        search.set('scope', 'email,public_profile')
        window.location.href = ` ${authURL}?${search.toString()}`
    };

    return (
        <IonPage>
            <IonContent>
                <div>Login Page</div>
                <button onClick={onFacebookLogin}>
                    Login via Facebook
                </button>
            </IonContent>
        </IonPage>
    );
}