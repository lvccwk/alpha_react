import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { personCircle } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import '../components/ActionSheet';
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

    return (
        <IonHeader>
            <IonToolbar>

                <IonButtons slot="start">

                    <IonBackButton color="light"> <IonTitle>Back Button</IonTitle></IonBackButton>
                </IonButtons>

                <IonButtons slot="end">
                    <IonButton onClick={handleUser} >
                        <IonIcon slot="icon-only" icon={personCircle} style={{ color: "#ffff", fontSize: "40px" }} />
                    </IonButton>
                </IonButtons>
                <IonTitle>Alpha Learning</IonTitle>

            </IonToolbar>
        </IonHeader >
    );
}
export default ToolBar;

