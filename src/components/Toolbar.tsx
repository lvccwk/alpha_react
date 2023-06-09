import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { personCircle } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import "./Toolbar.css";



function ToolBar() {
    const history = useHistory();
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)

    const handleUser = () => {
        console.log("isLoggedIn : ", isLoggedIn)
        if (isLoggedIn) {
            history.push('/userprofile');
        } else {
            history.push('/login');
        }
    }
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton color="light"> <IonTitle>Back Button</IonTitle></IonBackButton>
                </IonButtons>
                {
                    isLoggedIn && (
                        <IonIcon slot="end" onClick={handleUser} className='login-btn' icon={personCircle} style={{ color: "#ffff", fontSize: "px" }} > </IonIcon>

                    )
                }
                {
                    !isLoggedIn && (

                        <IonButton slot="end" onClick={handleUser} className='login-btn' fill="solid" color='secondary'>
                            <div>登入</div>
                        </IonButton>
                    )
                }



                <IonTitle>Alpha Learning</IonTitle>

            </IonToolbar>
        </IonHeader >
    );

}
export default ToolBar;

