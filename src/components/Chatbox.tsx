import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { useQuery } from "@tanstack/react-query";
import './ListCard.css';
import {
    fetchChatHistoryAll
} from "../api/fetchAll";
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client'
import { MessagePort } from 'worker_threads';
import MessageInput from './MessageInput';
import Messages from './Messages';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/store';



interface Chatroom {
    id: number;
    username: string;
    content: string;
    created_at: any;
    updated_at: any;
    user: any;

}

function Chatbox() {
    const sender_id = useAppSelector(state => state.user.id)
    const log = useAppSelector(state => state.user.isLoggedIn)
    const params = useParams()
    const receiver_id = Object.values(params)[0]
    const [socket, setSocket] = useState<Socket>()
    const [messages, setMessage] = useState<string[]>([])
    console.log(`receiver_idreceiver_id`, receiver_id)

    const send = (value: string) => {
        socket?.emit("message", value)
    }

    // const { data } = useQuery({
    //     queryKey: ["chatroomHistory"],
    //     queryFn: fetchChatHistoryAll, //redux login state
    // });
    useEffect(() => {
        const newSocket = io("http://localhost:3001/")
        setSocket(newSocket)
    }, [setSocket])

    const messageListener = (message: string) => {
        setMessage([...messages, message])
    }
    useEffect(() => {
        socket?.on('message', messageListener)
        return () => {
            socket?.off('message', messageListener)
        }
    }, [messageListener])


    // const sendPrivateMessage = (message: string, sender: string, receiver: string) => {
    //     socket?.emit('privateMessage', { message, sender, receiver });
    // }

    // useEffect(() => {
    //     socket?.on('privateMessage', messageListener)
    //     return () => {
    //         socket?.off('privateMessage', messageListener)
    //     }
    // }, [messageListener])

    // // usage example
    // sendPrivateMessage('Hello', 'sender_id', 'receiver_id');
    return (
        <>
            {/* {Array.isArray(data) &&
                data.map((item: Chatroom) => (
                    <IonCard key={item.id}>
                        <IonCardHeader>
                            <IonCardTitle> 用户：{item.user.username}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            {item.content}

                        </IonCardContent>
                        <IonCardSubtitle>{item.created_at}</IonCardSubtitle>
                    </IonCard>
                ))} */}
            {" "}
            <MessageInput send={send} />
            <Messages messages={messages} />

        </>
    );
}
export default Chatbox;
