import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/store";
import { IonButton, IonIcon, IonToast } from '@ionic/react';
import { bookmark, bookmarkOutline } from 'ionicons/icons';
import { fetchTeacher, fetchCreateBookmark, fetchDeleteBookmark } from '../api/fetchAll';


function TeacherBookmark() {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();
    const studentId = useAppSelector((state) => state.user.id);
    const params = useParams();
    const teacherId = Object.values(params)[0];

    const { data, isLoading, error, refetch } = useQuery(['teacherDetailBookMark', teacherId], () =>
        fetchTeacher(Number(teacherId))
    );


    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleClick = async () => {
        const obj = {
            user_id: Number(studentId),
            teacher_id: Number(teacherId),
        };

        try {
            if (!isBookmarked) {
                await fetchCreateBookmark(obj);
                setIsBookmarked(true);
                setShowToast(true);
            } else {

                await fetchDeleteBookmark(obj);
                setIsBookmarked(false);
                setShowToast(true);
            }
        } catch (error) {
            setShowToast(true);
        }


    };

    const toastMessage = isBookmarked ? 'Teacher bookmarked' : 'Bookmark removed';

    return (
        <>
            <IonButton onClick={handleClick}>
                <IonIcon icon={isBookmarked ? bookmark : bookmark} color={isBookmarked ? 'dark' : 'white'} />
                {/* {isBookmarked ? 'Bookmarked' : 'Bookmark'} */}
            </IonButton>
            <IonToast isOpen={showToast} message={toastMessage} duration={3000} onDidDismiss={() => setShowToast(false)} />
        </>
    );
}


export default TeacherBookmark;