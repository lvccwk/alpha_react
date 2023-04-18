import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useAppSelector } from "../redux/store";
// import { ChatMessage } from "./types";
import io, { Socket } from 'socket.io-client';
import './../../src/components/UiDesign/ChatroomContact.css';

export interface MessageType {
    sender_username: string
    receiver_username: string
    from_id: number
    created_at: string
    content: string
}
interface Props {
    sender_username: any;
    receiver_username: any;
    chatMessage?: MessageType[]
    addChatMessage: (msg: string, sender_id: number) => void
}


const ChatHistory: React.FC<Props> = ({ sender_username, receiver_username, chatMessage, addChatMessage }: Props) => {
    const params = useParams()
    const receiver_id = Number(Object.values(params)[0])
    const sender_id = useAppSelector((state) => state.user.id)

    const [socket, setSocket] = useState<Socket>()


    useEffect(() => {
        if (!socket) {
            const newSocket = io(`${process.env.SOCKET_HOSTNAME}/`)
            setSocket(newSocket)
        } else {
            socket?.emit("joinRoom", sender_id, receiver_id)
        }
    }, [socket])

    const messageListener = (message: string[]) => {
        console.log(message)
        addChatMessage(message[0], sender_id)
        // bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        socket?.on('message', messageListener)
        return () => {
            socket?.off('message', messageListener)
        }
    }, [messageListener])


    return (
        <div className="telegram-chat-history-container">
            {chatMessage &&
                chatMessage.map((chatMessage, index) => (
                    <div key={index}>
                        <div className="telegram-chat-history-username"> {chatMessage.from_id === sender_id
                            ? sender_username
                            : receiver_username
                        }</div>
                        <div className="telegram-chat-history-with-time ">{new Date(chatMessage.created_at).toLocaleString()}</div>
                        <div className="telegram-chat-history-with-content">{chatMessage.content}</div>
                    </div>
                ))}
        </div>
    )
}


export default ChatHistory;