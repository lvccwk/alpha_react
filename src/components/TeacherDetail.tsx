import { useEffect, useRef, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent } from '@ionic/react';
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
function TeacherDetail() {
    const params = useParams()
    const studentId = useAppSelector((state) => state.user.id);
    const teacherId = Object.values(params)[0]
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["teacherDetail"],
        queryFn: () => fetchTeacher(Number(teacherId)),
    });

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

    const onClickContactPage = (id: number) => {
        history.push(`/chatroom/` + id);
    }

    // const onClickEditProfile = (id: number) => {
    //     history.push(`/product/${course?.product.id}`);
    // };

    if (studentId) {
        return (
            <>
                <IonContent className='teacherCard'>
                    <br />

                    <div className="teacher-avatar">
                        <Avatar />
                    </div>
                    <TeacherBookmark />
                    <IonCard className='teacherProfileCard' >
                        <br /><br />
                        <div className='teacherCardContent'>
                            <IonCardHeader className='usernameInfo'>
                                {/* <IonCardSubtitle className='teacherFont'>Email : {data?.user.email}</IonCardSubtitle> */}
                                <IonCardTitle>導師 : {data?.user.username}</IonCardTitle>
                                {/* <br /> <br /><br /> */}
                            </IonCardHeader>
                            <IonCardContent className='teacherButtonContainer' >
                                <IonButton className='teacherButtonleft' onClick={() => onClickContactPage(Number(teacherId))}>查看{data?.user.username}商品</IonButton>
                                <IonButton className='teacherButtonright' onClick={() => onClickContactPage(Number(teacherId))}>聯絡 {data?.user.username}</IonButton>
                                <br /><br /><br /><br />
                            </IonCardContent>
                        </div>
                    </IonCard>


                    <IonCard className='teacherInfocardDetails'>
                        <div className='teacherinfocardInsides'>
                            <IonCardContent className='teacherFonts'>
                                <h1>導師介紹:  </h1>
                                <br></br>{data?.info}
                                大家好，我是一位補習老師，我的名字是______。我畢業於______大學，主修______。我有多年的教學經驗，曾為不同年齡和程度的學生進行補習。我喜歡教學，因為我相信每個學生都有自己的潛力，只需要找到適合他們的教學方法和學習節奏。我會根據學生的程度和需求，設計出合適的教學計劃和練習，讓學生能夠在學習中逐步提高，達到他們的學習目標。我也會鼓勵學生主動思考和發問，幫助他們建立自信，從而更好地掌握知識和技能。希望能夠成為學生學習路上的良師益友，共同進步。
                                <br /><br /><br />
                            </IonCardContent>
                            <br /><br /><br />
                        </div>
                    </IonCard>
                    <br />

                    {/* <IonCardSubtitle className='teacher-fonts'>{data?.user.username}的課程 / 筆記</IonCardSubtitle> */}
                    {/* {Array.isArray(course) &&
                            course.map((item: Course) => (
                                <div key={item.id}>
                                    <IonCard onClick={() => onClickEditProfile(item.id)}>
                                        <img alt="Silhouette of mountains" src={photo} />
                                        <IonCardContent>{item.info}</IonCardContent>
                                    </IonCard>
                                </div>
                            ))} */}

                </IonContent>
            </>
        );
    } else {
        return (
            <>
                <IonContent className='teacherCard'>
                    <br />

                    <div className="teacher-avatar">
                        <Avatar />
                    </div>
                    <TeacherBookmark />
                    <IonCard className='teacherProfileCard' >
                        <br /><br />
                        <div className='teacherCardContent'>
                            <IonCardHeader>
                                {/* <IonCardSubtitle className='teacherFont'>Email : {data?.user.email}</IonCardSubtitle> */}
                                <IonCardTitle>{data?.user.username}</IonCardTitle>
                                {/* <br /> <br /><br /> */}
                            </IonCardHeader>
                            <IonCardContent className='teacherButtonContainer' >
                                <IonButton className='teacherButtonleft' onClick={() => onClickContactPage(Number(teacherId))}>聯絡 {data?.user.username}</IonButton>
                                <IonButton className='teacherButtonright' onClick={() => onClickContactPage(Number(teacherId))}>聯絡 {data?.user.username}</IonButton>
                                <br /><br /><br /><br />
                            </IonCardContent>
                        </div>
                    </IonCard>


                    <IonCard className='teacherInfocardDetails'>
                        <div className='teacherinfocardInsides'>
                            <IonCardContent className='teacherFonts'>
                                <h1>導師介紹:  </h1>
                                <br></br>{data?.info}
                                大家好，我是一位補習老師，我的名字是______。我畢業於______大學，主修______。我有多年的教學經驗，曾為不同年齡和程度的學生進行補習。我喜歡教學，因為我相信每個學生都有自己的潛力，只需要找到適合他們的教學方法和學習節奏。我會根據學生的程度和需求，設計出合適的教學計劃和練習，讓學生能夠在學習中逐步提高，達到他們的學習目標。我也會鼓勵學生主動思考和發問，幫助他們建立自信，從而更好地掌握知識和技能。希望能夠成為學生學習路上的良師益友，共同進步。
                                <br /><br /><br />
                            </IonCardContent>
                            <br /><br /><br />
                        </div>
                    </IonCard>
                    <br />



                </IonContent>
            </>
        );
    }

}
export default TeacherDetail;