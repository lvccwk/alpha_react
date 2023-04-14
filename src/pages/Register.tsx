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
        const [username, setUsername] = useState('username');
        const [email, setUseremail] = useState('email@gmail.com');
        const [password, setPassword] = useState('12345678');
        const [cpassword, setCPassword] = useState('12345678');
        const [isTeacher, setIsTeacher] = useState(false);
        const [teacherinfo, setTeacherinfo] = useState("");

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
                    console.log(data);
                    setShowToast(true);
                    setToastMessage('註冊成功! 請登入');
                    history.push('/login');
                },
                onError: (error:any) => {
                    console.log(error)
                    setShowToast(true);
                    setToastMessage('註冊失敗');
                }
        
            });
        
        const createTeacher = useMutation({
            mutationFn: async (obj: {
                user_id: number;
                info: string;
            }) => await
                fetchCreateTeacher(obj),   
                onSuccess: () => {
                    console.log('success');
                //     setShowToast(true);
                //     setToastMessage('註冊成功! 請登入');
                //     history.push('/login');
                },
                onError: (error:any) => {
                    console.log(error.message);
                    // setShowToast(true);
                    // setToastMessage('註冊失敗');
                }
            });
        
            useEffect(() => {
                if (createUser.isSuccess) {
                  if (isTeacher) {
                    console.log(createUser.data!.id, teacherinfo);
                    createTeacher.mutate({
                      user_id: createUser.data!.id,
                      info: teacherinfo
                    });
                  }
                }
              }, [createUser.isSuccess, isTeacher, createUser.data, teacherinfo]);

        const handleRegisterUser = () => {
            console.log("username: ", username)
            console.log("password: ", password)
            console.log("cpassword: ", cpassword)
            console.log("user_type: ", user_type)
            console.log('email:', email)
            console.log('toastMessage', toastMessage)


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
                // if (isTeacher) {
                //     console.log(createUser.data)
                //     const user_id = createUser.data!.id;
                //     createTeacher.mutate({
                //         user_id: user_id,
                //         info: teacherinfo
                //     })
                // }
                // if (username.trim() !== '' && password.trim() !== '' && password === cpassword) {
                //     createUser();
                // }

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
                                // aria-label="Custom input" class="custom"
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
                            </>
                        )}
                        {/* <IonInput value={user_type} placeholder="User_type?" onIonChange={(e: any) => setUsertype(e.target.value)}></IonInput> */}
                        <IonInput aria-label="Custom input" class="custom" value={username} placeholder="username" onIonChange={(e: any) => { console.log(e); setUsername(e.target.value) }}>用戶名稱：</IonInput><br></br>
                        <IonInput aria-label="Custom input" class="custom" value={email} placeholder="email" onIonChange={(e: any) => setUseremail(e.target.value)}>電郵</IonInput><br></br>
                        <IonInput aria-label="Custom input" class="custom" value={password} placeholder="password" onIonChange={(e: any) => setPassword(e.target.value)}>密碼</IonInput><br></br>
                        <IonInput aria-label="Custom input" class="custom" value={cpassword} placeholder="Confirm Password" onIonChange={(e: any) => setCPassword(e.target.value)}>確認密碼</IonInput><br></br>
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


                        // if (res) {
                        //     console.log(res);

                        //     console.log("userid", res.id);
                        //     console.log("usertype", res.user_type)

                        //     if (isTeacher && teacherinfo) {
                        //         const res2 = useMutation(
                        //             async () => {
                        //                 fetchCreateTeacher({
                        //                         user_id: res.id,
                        //                         info: teacherinfo,
    
                        //                 })

                        //             } 

                        //         )

                                
                        //     }