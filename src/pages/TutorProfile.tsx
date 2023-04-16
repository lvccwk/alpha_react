import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
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
import './../../src/components/UiDesign/TeacherPage.css'

const TutorProfile: React.FC = () => {
    console.log("TutorProfile")
    const history = useHistory()

    return (
        <>
            <IonPage className='userprofilepage'>
                <ToolBar />
                <TeacherDetail />

            </IonPage>
        </>
    );
};

export default TutorProfile;