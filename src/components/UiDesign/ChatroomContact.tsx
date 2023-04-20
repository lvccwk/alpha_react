import React, { useEffect, useState } from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonLabel, IonList, IonSearchbar, IonThumbnail } from '@ionic/react';
import './ChatroomContact.css'
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTeacherAll, fetchUserAll, } from '../../api/fetchAll';
import { FollowedTeacherInterface, ProductInterface, TeacherSubjectInterface } from '../../interface/interface';
import { fetchUser } from '../../api/fetchUser';
import { useAppSelector } from '../../redux/store';
import { person, radioButtonOff, radioButtonOn } from 'ionicons/icons';
import './../../../src/components/UiDesign/Chatroom.css'
// import useSocket from '../../hook/useSocket';

interface UserInterface {
    id: number;
    username: string;
    avatar: string;
    image: string;
}

function ChatroomContact() {
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)
    const params = useParams()
    const user_id = (Number(Object.values(params)[0]))
    const sender_id = useAppSelector((state) => state.user.id)

    // const socket = useSocket()

    // useEffect(() => {
    //     // socket?.on('message', (msg) => {
    //     //     console.log({
    //     //         msg
    //     //     })
    //     // })
    //     // return () => {
    //     //     // socket?.off('message', messageListener)
    //     // }
    // }, [socket])

    const { data: userAll, isLoading, error, refetch } = useQuery({
        queryKey: ["chatRoomGetPeoples"],
        queryFn: () => fetchUserAll(),
    });

    const history = useHistory();

    const [searchText, setSearchText] = useState("");

    const onClickChatBox = (id: number) => {
        history.push(`/chatroom/` + id);
    }

    const onClickSignInPage = () => {
        history.push('/login');
    }

    const onClickSignUpPage = () => {
        history.push('/register');
    }

    const filteredUserAll = userAll?.filter((user: { username: string; }) => {
        return user.username.toLowerCase().includes(searchText.toLowerCase());
    });

    if (isLoggedIn === false) {
        return (
            <IonCard>
                <IonCardContent className='chatroomContent'>
                    <IonCardHeader>
                        <div className='shoppingCart'>
                            <IonIcon className="shoppingCartWithNoLogin" icon={person} />
                            <br></br>
                            <IonCardTitle>請先登入</IonCardTitle>
                            <br></br>
                        </div>
                    </IonCardHeader>
                    <IonButton expand="block" fill="solid" color="primary" onClick={onClickSignInPage}>登入</IonButton>
                    <IonButton expand="block" fill="clear" color="medium" onClick={onClickSignUpPage}>註冊</IonButton>
                </IonCardContent>
            </IonCard>
        )
    } else {
        return (
            <>
                <IonSearchbar
                    value={searchText}
                    onIonChange={(e) => setSearchText(e.detail.value!)}
                    placeholder="Search users"
                />
                <IonList>
                    {Array.isArray(filteredUserAll) && filteredUserAll.map((userAll: UserInterface) => (
                        // Conditionally render the IonItem based on the user ID
                        userAll.id === sender_id ? null : (
                            <IonItem
                                button
                                className='chatPeopleButton'
                                key={userAll.id}
                                onClick={() => onClickChatBox(userAll.id)}
                            >
                                <IonAvatar className='chatPeople' slot="start">
                                    <img alt="Silhouette of a person's head" src={userAll.image ? userAll.image : "https://ionicframework.com/docs/img/demos/avatar.svg"} />
                                </IonAvatar>
                                <IonLabel className='peopleName'>
                                    {userAll.username}
                                </IonLabel>
                                <IonIcon className="noti" size='large' icon={radioButtonOn} color='danger' />
                            </IonItem>
                        )
                    ))}
                </IonList>
            </>
        );
    }
}

export default ChatroomContact;