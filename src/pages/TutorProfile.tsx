import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import Toolbar from '../components/Toolbar';
import { fetchUser, fetchDeleteUser, fetchUpdateUser } from "../api/fetchUser";
import ToolBar from '../components/Toolbar';
import TeacherDetail from '../components/TeacherDetail';
import ProductDetail from '../components/ProductDetail';


const TutorProfile: React.FC = () => {
    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent>
                    <ProductDetail />
                </IonContent>
            </IonPage>
        </>
    );
};

export default TutorProfile;