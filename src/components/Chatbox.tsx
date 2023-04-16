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
import { fetchUserCheck } from '../api/fetchUser';
import Avatar from './Avatar';
import { paperPlane } from 'ionicons/icons';
import ChatHistory from './ChatHistory';
import Messages from './Messages';

function Chatbox() {
    const sender_id = useAppSelector(state => state.user.id)
    const log = useAppSelector(state => state.user.isLoggedIn)
    const params = useParams()
    const receiver_id = (Number(Object.values(params)[0]))
    const [socket, setSocket] = useState<Socket>()
    const [messages, setMessage] = useState<string[][]>([])

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

    const { data: receiver } = useQuery(["chatroomUserReceiver", receiver_id], (Number) => fetchUserCheck(receiver_id))
    console.log('receiver_id:', receiver_id)
    const { data: sender } = useQuery(["chatroomUserSender", sender_id], (Number) => fetchUserCheck(sender_id));
    console.log('sender_id:', sender_id)
    const { data: chatMessage } = useQuery(["chatMessageHisotrys", sender_id], (Number) => fetchChatHistory(receiver_id));

    useEffect(() => {
        if (!socket) {
            const newSocket = io("http://localhost:3001/")
            setSocket(newSocket)
        } else {
            socket?.emit("joinRoom", sender_id, receiver_id)
        }
    }, [socket])

    const messageListener = (message: string[]) => {

        setMessage([...messages, message])
        // const returnSenderId = message[1]
        // Pass the sender ID as a prop to the Messages component
        // console.log(`message`, message)

        // return <Messages messages={message} senderId={returnSenderId} sender={sender?.username} receiver={receiver?.username} />;
    }

    useEffect(() => {
        socket?.on('message', messageListener)
        return () => {
            socket?.off('message', messageListener)
        }
    }, [messageListener])



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
    console.log({
        messages
    })

    return (
        <>

            <IonCardTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>  <IonAvatar  >
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px' }}>
                    {receiver?.username}
                </div>
            </IonAvatar>
            </IonCardTitle>
            <ChatHistory chatMessage={chatMessage} sender_username={sender?.username} receiver_username={receiver?.username} />
            {/* {" "} */}
            <h2>-------------聊天記錄-------------</h2>
            <Messages messages={messages} senderId={sender_id} sender={sender?.username} receiver={receiver?.username} />
            <MessageInput send={(val: string) => send(val, sender_id)} />
        </>
    );
}

export default Chatbox
