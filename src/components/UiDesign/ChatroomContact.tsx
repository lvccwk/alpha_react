import React from 'react';
import { IonAvatar, IonButton, IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import './ChatroomContact.css'
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTeacherAll, fetchUserAll, } from '../../api/fetchAll';
import { FollowedTeacherInterface, ProductInterface, TeacherSubjectInterface, UserInterface } from '../../interface/interface';
import { fetchUser } from '../../api/fetchUser';
import { useAppSelector } from '../../redux/store';


function ChatroomContact() {
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)
    const params = useParams()
    const user_id = (Number(Object.values(params)[0]))
    const { data: userAll, isLoading, error, refetch } = useQuery({
        queryKey: ["chatRoomGetPeoples"],
        queryFn: () => fetchUserAll(),
    });

    const history = useHistory();
    const onClickChatBox = (id: number) => {
        history.push(`/chatroom/` + id);
    }


    if (isLoggedIn === false) {
        return (
            <div>尚未登入</div>
        )
    } else {

        return (
            <>
                {Array.isArray(userAll) && userAll.map((userAll: UserInterface) => (
                    <IonItem button
                        className='chatPeopleButton ion-button'
                        key={userAll.id}
                        onClick={() => onClickChatBox(userAll.id)}>
                        <IonAvatar className='chatPeople' slot="start">
                            <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        </IonAvatar>
                        <IonLabel>
                            {userAll.username}
                        </IonLabel>

                    </IonItem>

                ))}
            </>
        );
    }
}

export default ChatroomContact;