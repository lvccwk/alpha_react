import { useQuery, useQueries } from '@tanstack/react-query';
import { useAppSelector } from "../redux/store";
import { useState } from 'react';
import { fetchTeacherBookmark, fetchUserByTeacherId } from "../api/fetchAll";
import { IonButton, IonCard, IonCardSubtitle, IonImg, IonList } from '@ionic/react';
import { useHistory } from 'react-router-dom';

function FollowedTeachers() {

  const id = useAppSelector(state => state.user.id)
  const [teacherIds, setTeacherIds] = useState([]);
  const { data, isLoading, error, remove } = useQuery({
    queryKey: ["followedTeachers"],
    queryFn: () => fetchTeacherBookmark(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false, onSuccess: (data) => {
      const teacherIds = data ? data.map((followedTeacher: any) => followedTeacher.teacher_id) : [];
      setTeacherIds(teacherIds)
    }
  });
  const history = useHistory();


  const { data: user, refetch } = useQuery({
    queryKey: ["user", teacherIds],
    queryFn: () => fetchUserByTeacherId(teacherIds),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });



  const onClickEditProfile = (id: number) => {
    history.push(`/tutorprofile/${id}`);
  };

  return (
    <>

      <h1>已追蹤的老師</h1>

      {user && user.map((user) => (
        <IonCard key={user.id} className='bookMarkedTeacher' onClick={() => onClickEditProfile(user.teacher_id)}>
          <IonCardSubtitle className='bookMarkedTeachername'>{user.username}</IonCardSubtitle>
          <IonButton className='bookMarkedexp'>中文科 ： 1 年教學經驗</IonButton>
        </IonCard >

      ))}

    </>
  );
}


export default FollowedTeachers;


