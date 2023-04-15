import { useEffect, useRef, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react';
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
function TeacherDetail() {
    const params = useParams()
    const studentId = useAppSelector((state) => state.user.id);
    const teacherId = Object.values(params)[0]
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["teacherDetail"],
        queryFn: () => fetchTeacher(Number(teacherId)),
    });

    const { data: course } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => await fetchCourseByid(Number(teacherId)),
        // refetchInterval: 500,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });
    console.log(`course`, course)
    const arr = course



    const history = useHistory();
    const onClickAppoinmentPage = (id: number) => {
        history.push(`/timeslot/` + id);
    }

    const onClickContactPage = (id: number) => {
        history.push(`/chatroom/` + id);
    }

    const onClickEditProfile = (id: number) => {
        history.push(`/product/${course?.product.id}`);
    };
    if (studentId) {
        return (
            <>
                <br />
                <div className="teacher-avatar">
                    <Avatar />
                </div>
                <div className="teacher-info">
                    <IonCardTitle>{data?.user.username}</IonCardTitle>
                    <IonCardSubtitle>Email : {data?.user.email}</IonCardSubtitle>
                    <IonCardSubtitle>教學年資： 1</IonCardSubtitle>
                </div>
                <div className="teacher-contact">
                    <IonButton onClick={() => onClickContactPage(Number(teacherId))}>聯絡 {data?.user.username}</IonButton>
                </div>
                <TeacherBookmark />
                <IonCard>
                    <img alt="Silhouette of mountains" src={photo} />
                    <IonCardContent>
                        <IonCardSubtitle>導師介紹</IonCardSubtitle><br></br>
                        {data?.info}
                    </IonCardContent>
                    {/* <IonCardContent className="ion-padding">
                        <div style={{ display: 'flex', justifyContent: 'center' }}><h2>{data?.user.username} 的時間表</h2> </div>
                        <br></br>
                        <DateTime />
                    </IonCardContent> */}
                    {/* <TimePicker /> */}
                </IonCard >

                <IonCardSubtitle className='teacher-fonts'>{data?.user.username}的課程 / 筆記</IonCardSubtitle>

                <IonCard>
                    {Array.isArray(course) &&
                        course.map((item: Course) => (
                            <div key={item.id}>
                                <IonCard onClick={() => onClickEditProfile(item.id)}>
                                    <img alt="Silhouette of mountains" src={photo} />
                                    <IonCardContent>{item.info}</IonCardContent>
                                </IonCard>
                            </div>
                        ))}
                </IonCard >
                <br /><br /><br /><br />
            </>
        );

    } else {
        return (
            <>
                <br />
                <div className="teacher-avatar">
                    <Avatar />
                </div>
                <div className="teacher-info">
                    <IonCardTitle>{data?.user.username}</IonCardTitle>
                    <IonCardSubtitle>Email : {data?.user.email}</IonCardSubtitle>
                    <IonCardSubtitle>教學年資： 1</IonCardSubtitle>
                </div>
                <div className="teacher-contact">
                    <IonButton onClick={() => onClickContactPage(Number(teacherId))}>聯絡 {data?.user.username}</IonButton>
                </div>
                <TeacherBookmark />
                <IonCard>
                    <img alt="Silhouette of mountains" src={photo} />
                    <IonCardContent>
                        <IonCardSubtitle>導師介紹</IonCardSubtitle><br></br>
                        {data?.info}
                    </IonCardContent>
                    {/* <IonCardContent className="ion-padding">
                        <div style={{ display: 'flex', justifyContent: 'center' }}><h2>{data?.user.username} 的時間表</h2> </div>
                        <br></br>
                        <DateTime />
                    </IonCardContent> */}
                    {/* <TimePicker /> */}
                </IonCard >

                <IonCardSubtitle className='teacher-fonts'>{data?.user.username}的課程 / 筆記</IonCardSubtitle>

                <IonCard>

                </IonCard >
                <br /><br /><br /><br />
            </>
        );
    }

}
export default TeacherDetail;