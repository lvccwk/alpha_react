import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonButton, IonImg, IonIcon } from '@ionic/react';
import './SignInUpCard.css';
import { useHistory } from 'react-router-dom';
import { ban, cart, libraryOutline, person } from 'ionicons/icons';


const SignInUpCard: React.FC = () => {
    const history = useHistory();
    const onClickSignInPage = () => {

        history.push('/login');
    }
    const onClickSignUpPage = () => {

        history.push('/register');
    }

    return (
        <IonCard>
            <IonCardContent >
                <IonCardHeader>
                    <div className='shoppingCart'>
                        <IonIcon className="shoppingCartWithNoLogin" icon={person} />
                        <br></br>
                        <IonCardTitle>請先登入</IonCardTitle>
                        <br></br>
                    </div>

                </IonCardHeader>

                <IonButton expand="block" fill="solid" color="primary" onClick={onClickSignInPage}>登入</IonButton>
                <IonButton expand="block" fill="clear" color="medium" onClick={onClickSignUpPage}>註冊</IonButton>
            </IonCardContent>
        </IonCard>
    );
};

export default SignInUpCard;