import { useEffect, useRef, useState } from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, useIonAlert } from '@ionic/react';
import { fetchCourse, fetchCourseByid, fetchTeacher } from '../api/fetchAll';
import TeacherBookmark from './TeacherBookmark';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from "../redux/store";
import { useHistory, useParams } from 'react-router-dom';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import './TeacherDetail.css';
import Avatar from './Avatar';
import TimePicker from './TimePicker';
import DateTime from './DateTime';
import './../../src/components/UiDesign/TeacherPage.css'
import { TeacherInterface } from '../interface/interface';
import { Course } from './CourseCard';
import ListCard from './ListCard';
import TeacherProduct from './TeacherDetailProductList';
function TeacherDetail() {
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const params = useParams()
    const studentId = useAppSelector((state) => state.user.id);
    const teacherId = Object.values(params)[0]
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["teacherDetail"],
        queryFn: () => fetchTeacher(Number(teacherId)),
    });
    console.log(data)
    // const { data: course } = useQuery({
    //     queryKey: ["courses"],
    //     queryFn: async () => await fetchCourseByid(Number(teacherId)),
    //     // refetchInterval: 500,
    //     refetchOnWindowFocus: false,
    //     refetchOnReconnect: true,
    // });


    const history = useHistory();
    const onClickAppoinmentPage = (id: number) => {
        history.push(`/timeslot/` + id);
    }

    const [presentAlert] = useIonAlert();

    const pleaseLogin = () => {
        presentAlert({
            header: '提示信息',
            message: '請先登入再進行操作',
            buttons: ['OK'],
        })
    }

    const onClickContactPage = (id: number) => {
        if (isLoggedIn === false) {
            pleaseLogin()
        } else {
            history.push(`/chatroom/` + id);
        }
    }

    // const onClickEditProfile = (id: number) => {
    //     history.push(`/product/${course?.product.id}`);
    // };
    if (!isLoggedIn) {
        return (
            <>
                <IonContent className='teacherCard' style={{ position: 'relative' }}>
                    <br />

                    <div className="teacher-avatar">
                        <IonAvatar className='teacher-userPhoto'>
                            <img alt="Silhouette of a person's head" src={data?.user.image ? data?.user.image : "https://ionicframework.com/docs/img/demos/avatar.svg"} />
                        </IonAvatar>
                    </div>

                    <div style={{ position: 'absolute', top: '120px', right: '330px' }}>
                        {/* <TeacherBookmark /> */}
                    </div>

                    <IonCard className='teacherProfileCard' >
                        <br /><br />
                        <div className='teacherCardContent'>
                            <IonCardHeader className='usernameInfo'>
                                {/* <IonCardSubtitle className='teacherFont'>Email : {data?.user.email}</IonCardSubtitle> */}
                                <IonCardTitle style={{ textAlign: 'center', marginTop: '20px' }}> {data?.user.username}</IonCardTitle>
                                {/* <br /> <br /><br /> */}
                            </IonCardHeader>

                        </div>
                        <IonCardContent className='teacherButtonContainer' >
                            <IonButton className='teacherButtonright' onClick={() => onClickContactPage(Number(teacherId))}>聯絡 {data?.user.username}</IonButton>
                            <br /><br /><br /><br />
                        </IonCardContent>
                    </IonCard>


                    <IonCard className='teacherInfocardDetails'>
                        <div className='teacherinfocardInsides'>
                            <IonCardContent className='teacherFonts'>
                                <h1>導師介紹:  </h1>
                                <br></br>{data?.info}
                                {/* 大家好，我是一位補習老師，我的名字是______。我畢業於______大學，主修______。我有多年的教學經驗，曾為不同年齡和程度的學生進行補習。我喜歡教學，因為我相信每個學生都有自己的潛力，只需要找到適合他們的教學方法和學習節奏。我會根據學生的程度和需求，設計出合適的教學計劃和練習，讓學生能夠在學習中逐步提高，達到他們的學習目標。我也會鼓勵學生主動思考和發問，幫助他們建立自信，從而更好地掌握知識和技能。希望能夠成為學生學習路上的良師益友，共同進步。 */}
                                <br /><br /><br />

                            </IonCardContent>
                            <br /><br /><br />
                        </div>
                    </IonCard>
                    <br /><br /><br />  <br /><br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <IonButton className='teacherButtonright' onClick={() => onClickContactPage(Number(teacherId))}>
                            聯絡 {data?.user.username}
                        </IonButton>

                    </div>


                    <div style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column-reverse' }}>
                        <IonCard>
                            <TeacherProduct />
                        </IonCard>
                    </div>

                    <br />

                </IonContent>
            </>
        )
    } else if (studentId && teacherId && isLoggedIn) {
        return (
            <>
                <IonContent className='teacherCard' style={{ position: 'relative' }}>
                    <br />

                    <div className="teacher-avatar">
                        <IonAvatar className='teacher-userPhoto'>
                            <img alt="Silhouette of a person's head" src={data?.user.image ? data?.user.image : "https://ionicframework.com/docs/img/demos/avatar.svg"} />
                        </IonAvatar>
                    </div>

                    <div style={{ position: 'absolute', top: '120px', right: '330px' }}>
                        <TeacherBookmark />
                    </div>

                    <IonCard className='teacherProfileCard' >
                        <br /><br />
                        <div className='teacherCardContent'>
                            <IonCardHeader className='usernameInfo'>
                                {/* <IonCardSubtitle className='teacherFont'>Email : {data?.user.email}</IonCardSubtitle> */}
                                <IonCardTitle style={{ textAlign: 'center', marginTop: '20px' }}> {data?.user.username}</IonCardTitle>
                                {/* <br /> <br /><br /> */}
                            </IonCardHeader>

                        </div>
                        <IonCardContent className='teacherButtonContainer' >
                            <IonButton className='teacherButtonright' onClick={() => onClickContactPage(Number(teacherId))}>聯絡 {data?.user.username}</IonButton>
                            <br /><br /><br /><br />
                        </IonCardContent>
                    </IonCard>


                    <IonCard className='teacherInfocardDetails'>
                        <div className='teacherinfocardInsides'>
                            <IonCardContent className='teacherFonts'>
                                <h1>導師介紹:  </h1>
                                <br></br>{data?.info}
                                {/* 大家好，我是一位補習老師，我的名字是______。我畢業於______大學，主修______。我有多年的教學經驗，曾為不同年齡和程度的學生進行補習。我喜歡教學，因為我相信每個學生都有自己的潛力，只需要找到適合他們的教學方法和學習節奏。我會根據學生的程度和需求，設計出合適的教學計劃和練習，讓學生能夠在學習中逐步提高，達到他們的學習目標。我也會鼓勵學生主動思考和發問，幫助他們建立自信，從而更好地掌握知識和技能。希望能夠成為學生學習路上的良師益友，共同進步。 */}
                                <br /><br /><br />

                            </IonCardContent>
                            <br /><br /><br />
                        </div>
                    </IonCard>
                    <br /><br /><br />  <br /><br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <IonButton className='teacherButtonright' onClick={() => onClickContactPage(Number(teacherId))}>
                            {data?.user.username} 商品
                        </IonButton>

                    </div>


                    <div style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column-reverse' }}>
                        <IonCard>
                            <TeacherProduct />
                        </IonCard>
                    </div>

                    <br />

                </IonContent>
            </>
        );
    } else {
        return (
            <>
                <IonContent className='teacherCard' style={{ position: 'relative' }}>
                    <br />

                    <div className="teacher-avatar">
                        <IonAvatar className='teacher-userPhoto'>
                            <img alt="Silhouette of a person's head" src={data?.user.image} />
                        </IonAvatar>
                    </div>

                    <div style={{ position: 'absolute', top: '120px', right: '330px' }}>
                        <TeacherBookmark />
                    </div>

                    <IonCard className='teacherProfileCard' >
                        <br /><br />
                        <div className='teacherCardContent'>
                            <IonCardHeader className='usernameInfo'>
                                {/* <IonCardSubtitle className='teacherFont'>Email : {data?.user.email}</IonCardSubtitle> */}
                                <IonCardTitle style={{ textAlign: 'center', marginTop: '20px' }}> {data?.user.username}</IonCardTitle>
                                {/* <br /> <br /><br /> */}
                            </IonCardHeader>

                        </div>
                        <IonCardContent className='teacherButtonContainer' >
                            <IonButton className='teacherButtonright' onClick={() => onClickContactPage(Number(teacherId))}>聯絡{data?.user.username}</IonButton>
                            <br /><br /><br /><br />
                        </IonCardContent>
                    </IonCard>


                    <IonCard className='teacherInfocardDetails'>
                        <div className='teacherinfocardInsides'>
                            <IonCardContent className='teacherFonts'>
                                <h1>導師介紹:  </h1>
                                <br></br>{data?.info}
                                {/* 大家好，我是一位補習老師，我的名字是______。我畢業於______大學，主修______。我有多年的教學經驗，曾為不同年齡和程度的學生進行補習。我喜歡教學，因為我相信每個學生都有自己的潛力，只需要找到適合他們的教學方法和學習節奏。我會根據學生的程度和需求，設計出合適的教學計劃和練習，讓學生能夠在學習中逐步提高，達到他們的學習目標。我也會鼓勵學生主動思考和發問，幫助他們建立自信，從而更好地掌握知識和技能。希望能夠成為學生學習路上的良師益友，共同進步。 */}
                                <br /><br /><br />

                            </IonCardContent>
                            <br /><br /><br />
                        </div>
                    </IonCard>
                    <br /><br /><br />  <br /><br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h3 >
                            {data?.user.username} 商品
                        </h3>

                    </div>


                    <div style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column-reverse' }}>
                        <IonCard>
                            <TeacherProduct />
                        </IonCard>
                    </div>

                    <br />

                </IonContent>
            </>
        );
    }

}
export default TeacherDetail;