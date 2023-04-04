import { IonBackButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
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
                    <IonBackButton> <IonTitle>Back Button</IonTitle></IonBackButton>
                </IonButtons>

                <IonButtons slot="end">
                    <IonIcon slot="icon-only" icon={personCircle} onClick={handleUser} ></IonIcon>
                </IonButtons>
                <IonTitle>Alpha Learning</IonTitle>
            </IonToolbar>
        </IonHeader >
    );
}
export default ToolBar;

