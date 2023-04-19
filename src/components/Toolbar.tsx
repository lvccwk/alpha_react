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
            console.log('yesLOGIN');
        } else {
            history.push('/login');
            console.log('noLOGIN');
        }
    }
    // const handleBackPage = () => {
    //     history.push('')
    //   }


    // if (isLoggedIn) {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton color="light"> <IonTitle>Back Button</IonTitle></IonBackButton>
                    {/* <IonButton onClick={handleBackPage} ></IonButton> */}
                </IonButtons>
                {
                    isLoggedIn && (
                        <IonButtons slot="end" color='secondary'>
                            <IonButton onClick={handleUser} color='secondary'>

                                <IonIcon slot="icon-only" icon={personCircle} style={{ color: "#ffff", fontSize: "40px" }} />

                            </IonButton>
                        </IonButtons>)
                }
                {
                    !isLoggedIn && (
                        <IonButtons slot="secondary"  onClick={handleUser} >
                            <IonButton fill="solid" color='secondary'>


                                <div>登入</div>

                            </IonButton>
                        </IonButtons>
                    )
                }



                <IonTitle>Alpha Learning</IonTitle>

            </IonToolbar>
        </IonHeader >
    );
    // }

}
export default ToolBar;

