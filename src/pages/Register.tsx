import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonToast } from "@ionic/react"
import { useQuery } from "@tanstack/react-query/build/lib/useQuery"
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react"
import { Link, Redirect, useHistory } from "react-router-dom"
import { fetchAddUser } from "../api/fetchUser"
import { fetchCreateTeacher } from "../api/fetchAll"
import ToolBar from "../components/Toolbar"
import { registerUser } from "../config/FirebaseConfig"
import './../../src/components/UiDesign/Login.css'
import Refresh from "../components/Refresh"

const Register: React.FC = () => {
    const [user_type, setUserType] = useState('');
    const [username, setUsername] = useState('');
    const [email, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [isTeacher, setIsTeacher] = useState(false);
    const [teacherinfo, setTeacherinfo] = useState("");
    const [school, setSchool] = useState("");
    const [experience, setExperience] = useState(0);

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const history = useHistory();
    const createUser = useMutation({
        mutationFn: async (obj: {
            user_type: string;
            username: string;
            email: string;
            password: string;
        }) => await
                fetchAddUser(obj),

        onSuccess: (data: object) => {
            setShowToast(true);
            setToastMessage('註冊成功! 請登入');
            history.push('/login');
        },
        onError: (error: any) => {
            setShowToast(true);
            setToastMessage('註冊失敗');
        }

    });

    const createTeacher = useMutation({
        mutationFn: async (obj: {
            user_id: number;
            info: string;
            school: string;
            experience: number;
        }) => await
                fetchCreateTeacher(obj),
        onSuccess: () => {

        },
        onError: (error: any) => {
            console.log(error.message);
        }
    });

    useEffect(() => {
        if (createUser.isSuccess) {
            if (isTeacher) {

                createTeacher.mutate({
                    user_id: createUser.data.id,
                    info: teacherinfo,
                    school: school,
                    experience: experience

                });
            }
        }
    }, [createUser.isSuccess, isTeacher, createUser.data, teacherinfo]);

    const handleRegisterUser = () => {



        if (password !== cpassword) {
            setShowToast(true);
            setToastMessage('密碼不一致!');
        } else if (username.trim() === '' || password.trim() === '') {
            setShowToast(true);
            setToastMessage('用戶名或密碼不能留空!');
        } else {
            if (username.trim() !== '' && password.trim() !== '' && password === cpassword) {
                createUser.mutate({
                    user_type: user_type,
                    username: username,
                    email: email,
                    password: password

                })
            }


        }
    };



    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent className="ion-padding" >
                    <Refresh />
                    <div className="register">選擇帳戶類別
                        <IonSelect

                            value={user_type}
                            placeholder="Select User Type"
                            onIonChange={(e: any) => {
                                setUserType(e.detail.value);
                                setIsTeacher(e.detail.value === "teacher");
                            }}
                        >
                            <IonSelectOption value="teacher">導師</IonSelectOption>
                            <IonSelectOption value="student">學生</IonSelectOption>

                        </IonSelect><br />
                        {isTeacher && (
                            <>
                                導師簡介
                                <IonInput
                                    aria-label="Custom input"
                                    class="custom"
                                    value={teacherinfo}
                                    placeholder="Teacher Input"
                                    onIonChange={(e: any) => setTeacherinfo(e.target.value)}
                                >
                                </IonInput><br />
                                學校
                                <IonInput
                                    aria-label="Custom input"
                                    class="custom"
                                    value={school}
                                    placeholder="Teacher Input"
                                    onIonChange={(e: any) => setSchool(e.target.value)}
                                >
                                </IonInput><br />
                                經驗年數
                                <IonInput
                                    aria-label="Custom input"
                                    class="custom"
                                    type='number'
                                    value={experience}
                                    placeholder="Teacher Input"
                                    onIonChange={(e: any) => setExperience(parseInt(e.target.value))}
                                >
                                </IonInput><br />
                            </>
                        )}
                        {/* <IonInput value={user_type} placeholder="User_type?" onIonChange={(e: any) => setUsertype(e.target.value)}></IonInput> */}
                        <IonInput aria-label="Custom input" class="custom" value={username} placeholder="username" onInput={(e: any) => { console.log(e); setUsername(e.target.value) }}>用戶名稱：</IonInput><br></br>
                        <IonInput aria-label="Custom input" class="custom" value={email} placeholder="email" onInput={(e: any) => setUseremail(e.target.value)}>電郵</IonInput><br></br>
                        <IonInput aria-label="Custom input" class="custom" type='password' value={password} placeholder="password" onInput={(e: any) => setPassword(e.target.value)}>密碼</IonInput><br></br>
                        <IonInput aria-label="Custom input" class="custom" type='password' value={cpassword} placeholder="Confirm Password" onInput={(e: any) => {

                            return setCPassword(e.target.value)
                        }
                        }>確認密碼</IonInput><br></br>
                        <IonButton onClick={handleRegisterUser}>註冊</IonButton>
                    </div >
                </IonContent>

                <IonToast position="top"
                    isOpen={showToast}
                    message={toastMessage}
                    duration={1000}
                    onDidDismiss={() => setShowToast(false)}
                />
            </IonPage >
        </>
    );
};

export default Register;

