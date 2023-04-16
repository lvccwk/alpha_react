import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { FetchUserAllModel, fetchChatHistory } from "../api/fetchAll";
import { useParams } from 'react-router-dom';
import { fetchUserCheck } from "../api/fetchUser";
import { useAppSelector } from "../redux/store";
// import { ChatMessage } from "./types";
import './../../src/components/UiDesign/ChatroomContact.css'

interface Props {
    sender_username: any;
    receiver_username: any;
    chatMessage?: FetchUserAllModel[]
}


const ChatHistory: React.FC<Props> = ({ sender_username, receiver_username, chatMessage }: Props) => {
    const params = useParams()
    const receiver_id = Number(Object.values(params)[0])
    const sender_id = useAppSelector((state) => state.user.id)

    return (
        <div className="telegram-chat-history-container">
            {chatMessage &&
                chatMessage.map((chatMessage) => (
                    <div key={chatMessage.id}>
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