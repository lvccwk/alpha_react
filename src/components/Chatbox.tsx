import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonItem, IonList } from '@ionic/react';
import { useQuery } from "@tanstack/react-query";
import './ListCard.css';
import {
    addChatRecord,
    fetchChatHistory
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

    // const send = (value: string, sender_id: number) => {
    //     socket?.emit("privateMessage", value, sender_id, receiver_id)
    //     console.log(`sender_id = `, sender_id)
    //     console.log(`receiver_id = `, receiver_id)
    // }


    const send = async (value: string, sender_id: number) => {
        try {
            // emit the message through the socket
            socket?.emit("privateMessage", value, sender_id, receiver_id);

            // send the message to the backend
            await addChatRecord({ from_id: receiver_id, to_id: sender_id, content: value });

            console.log(`sender_id = `, sender_id);
            console.log(`receiver_id = `, receiver_id);
        } catch (error) {
            console.error(error);
        }
    };
    const { data: receiver } = useQuery(["chatroomUserReceiver", receiver_id], (Number) => fetchUserCheck(receiver_id));
    console.log(' receiver?.username', receiver?.username)

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


        setMessage([...messages, message[0]])
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


    interface FetchUserModel {
        id: number;
        username: string;
        private_message_from_user: any[];
        private_message_to_user: any[];
    }

    function ChatComponent() {
        const [chatboxHistory, setChatboxHistory] = useState<FetchUserModel>({
            id: 0,
            username: "",
            private_message_from_user: [],
            private_message_to_user: [],
        });

        useEffect(() => {
            const fetchChatHistory = async () => {
                const data = await fetchUser();
                setChatboxHistory(prevState => ({ ...prevState, ...data }));
            };
            fetchChatHistory();
        }, []);

        const messagesToUser = chatboxHistory.private_message_to_user.map(message => ({
            ...message,
            type: receiver?.username
        }));
        const messagesFromUser = chatboxHistory.private_message_from_user.map(message => ({
            ...message,
            type: sender?.username
        }));
        const allMessages = [...messagesToUser, ...messagesFromUser];
        allMessages.sort(
            (a: { created_at: string }, b: { created_at: string }) =>
                new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        return (
            <div>
                {allMessages.map((message, index) => (
                    <div key={`${message.type}_${message.id}`}>

                        <p>{message.type} {message.created_at}</p>

                        <p>{message.content}</p>
                    </div>
                ))}

            </div>
        );
    }




    function Messages({ messages, senderId }: { messages: string[], senderId: string }) {
        return (
            <div className='container'>
                <div className="messageList">
                    {messages.map((message, index) => (

                        <div key={message}>
                            <div className="messageHeader">{
                                sender_id === message[1] ? sender?.username : receiver?.username
                            } : </div>
                            <br></br>
                            <div className="textMessage">{message}</div>
                            <br></br>
                        </div>
                    ))}
                </div>
            </div>
        );

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

            <ChatComponent ></ChatComponent>
            {" "}
            <Messages messages={messages} senderId={sender_id} />
            <MessageInput send={(val: string) => send(val, sender_id)} />
        </>
    );
}
export default Chatbox;
