import { IonButton, IonButtons, IonIcon } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { addCircle, closeCircle, star } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { fetchDeleteCartDetail } from "../api/fetchAll";
import { useAppSelector } from "../redux/store";

function DeleteButton() {
    const id = useAppSelector(state => state.user.id)
    const log = useAppSelector(state => state.user.isLoggedIn)
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["delCartItem"],
        queryFn: () => fetchDeleteCartDetail(id),
    });




    fetchDeleteCartDetail(id)
    const history = useHistory();


    return (

        <IonButtons>
            <IonButton>
                <IonIcon slot="icon-only" icon={closeCircle} ></IonIcon>
            </IonButton>
        </IonButtons>


    );
}
export default DeleteButton;