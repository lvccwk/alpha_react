import { IonButton, IonIcon } from '@ionic/react';
import { useQuery } from "@tanstack/react-query";
import { paperPlane } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import '../../src/components/UiDesign/ChatroomContact.css';
import {
    addChatRecord,
    fetchChatHistory
} from "../api/fetchAll";
import { fetchUserCheck } from '../api/fetchUser';
import { useAppSelector } from '../redux/store';
import ChatHistory, { MessageType } from './ChatHistory';
import './ListCard.css';
import AvatarChat from './UiDesign/AvatarChat';

function Chatbox() {
    const sender_id = useAppSelector(state => state.user.id)
    const log = useAppSelector(state => state.user.isLoggedIn)
    const params = useParams()
    const receiver_id = (Number(Object.values(params)[0]))
    const [socket, setSocket] = useState<Socket>()
    const [messages, setMessage] = useState<MessageType[]>([])
    const bottomRef = useRef<HTMLDivElement>(null);

    const send = async (value: string, sender_id: number) => {
        try {
            // emit the message through the socket
            socket?.emit("privateMessage", value, sender_id, receiver_id);

            // send the message to the backend
            await addChatRecord({ from_id: receiver_id, to_id: sender_id, content: value });

            console.log(`sender_id = `, sender_id);
            console.log(`receiver_id = `, receiver_id);
            bottomRef.current?.scrollIntoView({ behavior: 'auto' });
        } catch (error) {
            console.error(error);
        }
    };

    const { data: receiver } = useQuery(["chatroomUserReceiver", receiver_id], (Number) => fetchUserCheck(receiver_id))
    console.log('receiver_id:', receiver_id)
    const { data: sender } = useQuery(["chatroomUserSender", sender_id], (Number) => fetchUserCheck(sender_id));
    console.log('sender_id:', sender_id)
    const { data: chatMessage } = useQuery(["chatMessageHisotrys", sender_id], (Number) => fetchChatHistory(receiver_id), {
        onSuccess(data) {
            console.log("success")
            const msg = data.map(v => ({
                sender_username: sender?.username,
                receiver_username: receiver?.username,
                from_id: v.from_id,
                created_at: v.created_at,
                content: v.content
            } as MessageType))
            setMessage(msg)
        },
    });

    useEffect(() => {
        if (!socket) {
            const newSocket = io(`${process.env.SOCKET_HOSTNAME}/`)
            setSocket(newSocket)

        } else {
            socket?.emit("joinRoom", sender_id, receiver_id)
        }
    }, [socket])

    useEffect(() => {
        // bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages])



    function MessageInput({ send }: { send: (val: string) => void }) {
        const [value, setValue] = useState('');

        const handleSubmit = () => {
            send(value);
            setValue('');
        };

        return (
            <>
                <div className="textMessage">
                    <div className="inputBar">
                        <input
                            className="telegram-chat-history-with-content"
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Type your message..."
                            value={value}
                        />
                        <IonButton className="sent" size="default" onClick={handleSubmit}>
                            <IonIcon icon={paperPlane} color="white" />
                        </IonButton>
                    </div>
                </div>
            </>

        );
    }
    console.log({
        messages
    })

    function addChatMessage(msg: string, sender_id: number) {
        const msgObj: MessageType = {
            sender_username: sender?.username!,
            receiver_username: receiver?.username!,
            from_id: sender_id,
            created_at: new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }),


            content: msg
        }
        setMessage(v => [...v, msgObj])
    }

    return (
        <>

            <div className='msg-content'>
                <AvatarChat /> {receiver?.username}
                <div className='telegram-chat-history-container'>
                    <ChatHistory chatMessage={messages} addChatMessage={addChatMessage} sender_username={sender?.username} receiver_username={receiver?.username} />
                    {/* <Messages messages={messages} senderId={sender_id} sender={sender?.username} receiver={receiver?.username} /> */}
                </div>
                <div className='my-div'> {""}</div>
                <MessageInput send={(val: string) => send(val, sender_id)} />
            </div>

            <div ref={bottomRef} />

        </>
    );
}

export default Chatbox
