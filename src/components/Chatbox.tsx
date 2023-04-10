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



interface Chatroom {
    id: number;
    username: string;
    content: string;
    created_at: any;
    updated_at: any;
    user: any;

}

function Chatbox() {
    const [socket, setSocket] = useState<Socket>()
    const [messages, setMessage] = useState<string[]>([])

    const send = (value: string) => {
        socket?.emit("message", value)
    }

    // const { data } = useQuery({
    //     queryKey: ["chatroomHistory"],
    //     queryFn: fetchChatHistoryAll, //redux login state
    // });
    useEffect(() => {
        const newSocket = io("http://localhost:3001")
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

