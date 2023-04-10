import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/store";
import { IonButton, IonIcon, IonToast } from '@ionic/react';
import { bookmark, bookmarkOutline } from 'ionicons/icons';
import { fetchTeacher, fetchCreateBookmark } from '../api/fetchAll';



function TeacherBookmark() {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const params = useParams()
    const teacherId = Object.values(params)[0]
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["teacherDetail"],
        queryFn: () => fetchTeacher(Number(teacherId)),
    });

    const dispatch = useDispatch();
    const studentId = useAppSelector(state => state.user.id)
    const handleClick = () => {
        setIsBookmarked(!isBookmarked);
        const obj = {
            user_id: Number(studentId),
            teacher_id: Number(teacherId)
        }
        if (!isBookmarked) {
            fetchCreateBookmark(obj);
        }
        setShowToast(true);
        console.log(obj.user_id, obj.teacher_id);
    };
    const toastMessage = isBookmarked ? 'Teacher bookmarked' : 'Bookmark removed';

    return (
        <>
            <button onClick={handleClick}>
                <IonIcon icon={isBookmarked ? bookmark : bookmarkOutline} color={isBookmarked ? 'primary' : 'medium'} />
                {/* {isBookmarked ? 'Bookmarked' : 'Bookmark'} */}
            </button>
            <IonToast isOpen={showToast} message={toastMessage} duration={3000} onDidDismiss={() => setShowToast(false)} />
        </>
    );
}

export default TeacherBookmark;