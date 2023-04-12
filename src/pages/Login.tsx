import { IonButton, IonCard, IonContent, IonIcon, IonInput, IonPage } from "@ionic/react";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import { IonToast } from '@ionic/react';
import { loginUserWithGoogle } from "../config/FirebaseConfig";
import { loginUser } from "../api/fetchUser";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { generalLogin } from "../redux/userSlice";
import './../../src/components/UiDesign/Login.css'
import { logoFacebook, logoIonic } from "ionicons/icons";
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'

const LoginPage: React.FC = () => {

    const [email, setUserEmail] = useState('email@gmail.com');
    const [password, setPassword] = useState('12345678')
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const history = useHistory();
    const dispatch = useDispatch()

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
    const {
        mutate
    } = useMutation({
        mutationFn: async (obj: {
            email: string,
            password: string
        }) => await loginUser(obj),
        onSuccess: (data: any) => {
            const token = data.token
            console.log(data)
            setShowToast(true);
            setToastMessage('Login successful!');
            localStorage.setItem("token", token)
            dispatch(generalLogin({
                token
            }))
            history.push('/home');
        },
        onError: (e) => {
            console.log(e)
            setShowToast(true);
            setToastMessage('Login failed. Please try again.');
        }
    })

    const login = async () => {
        mutate({
            email,
            password
        })
        // try {
        //     console.log('1')
        //     const res = await loginUser({
        //         email: email,
        //         password: password
        //     });
        //     console.log('2')
        //     console.log(res)
        //     if (res) {
        //         setShowToast(true);
        //         setToastMessage('Login successful!');
        //         history.push('/home');
        //     }
        // } catch (error) {
        //     console.error(error);
        //     setShowToast(true);
        //     setToastMessage('Login failed. Please try again.');
        // }
    }

    // const [loggedIn, setLoggedIn] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            await loginUserWithGoogle();
            // setLoggedIn(true);
        } catch (error) {
            // setLoggedIn(false);
            console.log(error);
        }
    }

    return (
        <IonPage className="loginpage">
            <Toolbar />
            <IonContent style={{ backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh' }}>
                <br />
                {/* <h1>Google Login Page</h1>
                {loggedIn ? (
                    <p>You are logged in with Google.</p>
                ) : (
                    <button onClick={handleGoogleLogin}>Sign in with Google</button>
                )} */}
                {/* <UiCard /> */}
                <IonContent className="ion-padding" >
                    {/* <IonCard className="login"><IonIcon icon={logoIonic} className="iconlogin" color="primary" ></IonIcon>
                    </IonCard> */}
                    <div className='loginCard'>
                        <IonInput
                            aria-label="Custom input"
                            class="custom"
                            value={email}
                            placeholder="email"
                            onIonChange={(e: any) => setUserEmail(e.target.value)}
                        >Email :</IonInput>
                        <br></br>
                        <IonInput
                            aria-label="Custom input"
                            class="custom"
                            value={password}
                            type='password' placeholder="Password?"
                            onIonChange={(e: any) => setPassword(e.target.value)}
                        >密碼 :</IonInput>
                        <br></br>
                        <IonButton onClick={login}>一般登入</IonButton>
                        <br></br>
                        <IonButton onClick={onFacebookLogin}> <IonIcon size="large" icon={logoFacebook} /> <span></span>Facebook 登入</IonButton>
                        <p>新用戶？<Link to="/register">按此註冊</Link></p>
                    </div>
                </IonContent>

                <IonToast
                    position="top"
                    isOpen={showToast}
                    message={toastMessage}
                    duration={1000}
                    onDidDismiss={() => setShowToast(false)}
                />
            </IonContent>
        </IonPage >
    );
}

export default LoginPage;