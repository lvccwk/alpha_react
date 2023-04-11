import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonItem, IonList } from '@ionic/react';
import { useQuery } from "@tanstack/react-query";
import './ListCard.css';
import {
    fetchChatHistoryAll
} from "../api/fetchAll";
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client'
import { MessagePort } from 'worker_threads';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import '../../src/components/UiDesign/ChatroomContact.css'
import { IonContext } from '@ionic/react/dist/types/contexts/IonContext';
import { fetchUser, fetchUserCheck } from '../api/fetchUser';
import Avatar from './Avatar';
import { paperPlane } from 'ionicons/icons';

function Chatbox() {
    const sender_id = useAppSelector(state => state.user.id)
    const log = useAppSelector(state => state.user.isLoggedIn)
    const params = useParams()
    const receiver_id = (Number(Object.values(params)[0]))
    const [socket, setSocket] = useState<Socket>()
    const [messages, setMessage] = useState<string[]>([])
    const send = (value: string, sender_id: number) => {
        socket?.emit("privateMessage", value, sender_id, receiver_id)
        console.log(`sender_id = `, sender_id)
        console.log(`receiver_id = `, receiver_id)
    }

    const { data: receiver } = useQuery(["chatroomUserReceiver", receiver_id], (Number) => fetchUserCheck(receiver_id));
    console.log(' receiver?.username', receiver?.username)
    // const { data } = useQuery({
    //     queryKey: ["chatroomHistory"],
    //     queryFn: fetchChatHistoryAll, //redux login state
    // });
    const { data: sender } = useQuery(["chatroomUserSender", sender_id], (Number) => fetchUserCheck(sender_id));
    console.log(' sender?.username', sender?.username)

    useEffect(() => {
        if (!socket) {
            const newSocket = io("http://localhost:3001/")
            setSocket(newSocket)
        } else {
            // console.log(socket)
            socket?.emit("joinRoom", sender_id, receiver_id)
            // console.log(`sender_id = `, sender_id)
            // console.log(`receiver_id = `, receiver_id)
        }
    }, [socket])

    const messageListener = (message: string) => {
        console.log('message')
        setMessage([...messages, message])
        const returnSenderId = message[1]
        // Pass the sender ID as a prop to the Messages component
        return <Messages messages={messages} senderId={returnSenderId} />;
    }

    useEffect(() => {
        socket?.on('message', messageListener)
        return () => {
            socket?.off('message', messageListener)
        }
    }, [messageListener])

    function Messages({ messages, senderId }: { messages: string[], senderId: string }) {
        if (sender_id == sender?.id) {
            return (
                <div className='container'>
                    <div className="messageList">
                        {messages.map((message, index) => (
                            <div key={message}>
                                <div className="messageHeader">{sender?.username} : </div>
                                <br></br>
                                <div className="textMessage">{message}</div>
                                <br></br>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else {
            return (
                <div className='container'>
                    <div className="messageList">
                        {messages.map((message, index) => (
                            <div key={index}>
                                <div className="messageHeader">{receiver?.username} : </div>
                                <br></br>
                                <div className="textMessage">{message}</div>
                                <br></br>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

    }

    function MessageInput({ send }: { send: (val: string) => void }) {
        const [value, setValue] = useState('');

        const handleSubmit = () => {
            send(value);
            setValue('');
        };

        return (
            <>
                <div className="inputContainer">
                    <div className="inputBar">
                        <input
                            className="inputChatBox"
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Type your message..."
                            value={value}
                        />
                        <IonButton className="inputBarBtn" size="default" onClick={handleSubmit}>
                            <IonIcon size="default" icon={paperPlane} color="white" />
                        </IonButton>
                    </div>
                </div>
            </>

        );
    }

    return (
        <>

            <IonCardTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>  <IonAvatar  >
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px' }}>
                    {receiver?.username}
                </div>
            </IonAvatar>
            </IonCardTitle>

            {" "}
            <Messages messages={messages} senderId={sender_id} />
            <MessageInput send={(val: string) => send(val, sender_id)} />
        </>
    );
}
export default Chatbox;
