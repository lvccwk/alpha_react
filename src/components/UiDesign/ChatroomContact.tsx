import React from 'react';
import { IonAvatar, IonButton, IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import './ChatroomContact.css'
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTeacherAll } from '../../api/fetchAll';
import { FollowedTeacherInterface, ProductInterface, TeacherSubjectInterface, UserInterface } from '../../interface/interface';

interface TeacherInterface {
    id: number;
    user_id: number;
    info: string;
    rating: number;
    created_at: Date;
    updated_at: Date;
    teacher_subject: TeacherSubjectInterface;
    followed_teachers: FollowedTeacherInterface;
    product: ProductInterface;
    user: UserInterface;
}
function ChatroomContact() {

    const params = useParams()
    const teacherId = Object.values(params)[0]
    const { data: teacherAll, isLoading, error, refetch } = useQuery({
        queryKey: ["chatRoomGetTeacher"],
        queryFn: () => fetchTeacherAll(),
    });

    const history = useHistory();
    const onClickChatBox = (id: number) => {
        history.push(`/chatroom/` + id);
    }

    return (
        <>
            {Array.isArray(teacherAll) && teacherAll.map((teacherAll: TeacherInterface) => (
                <IonItem button
                    className='chatPeopleButton ion-button'
                    key={teacherAll.id}
                    onClick={() => onClickChatBox(teacherAll.user.id)}>
                    <IonAvatar className='chatPeople' slot="start">
                        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </IonAvatar>
                    <IonLabel>
                        {teacherAll.user.username}
                    </IonLabel>

                </IonItem>

            ))}
        </>
    );
}
export default ChatroomContact;