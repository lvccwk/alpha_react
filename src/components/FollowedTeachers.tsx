import { useQuery, useQueries } from '@tanstack/react-query';
import { useAppSelector } from "../redux/store";
import { useState } from 'react';
import { fetchTeacherBookmark, fetchUserByTeacherId } from "../api/fetchAll";

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
      console.log("success");
    }
  });


  const { data: user, refetch } = useQuery({
    queryKey: ["user", teacherIds],
    queryFn: () => fetchUserByTeacherId(teacherIds),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  console.log(user);
  return (
    <>
      <div>
        <h1>已追蹤的老師</h1>
        {user && user.map((user) => (
          <div key={user.id}>{user.username}</div>
        ))}

      </div>
    </>
  );
}


export default FollowedTeachers;