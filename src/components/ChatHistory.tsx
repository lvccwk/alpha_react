import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { FetchUserAllModel, fetchChatHistory } from "../api/fetchAll";
import { useParams } from 'react-router-dom';
import { fetchUserCheck } from "../api/fetchUser";
import { useAppSelector } from "../redux/store";
// import { ChatMessage } from "./types";

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
        <div>
            {chatMessage &&
                chatMessage.map((chatMessage) => (
                    <div key={chatMessage.id}>
                        <p> {chatMessage.from_id === sender_id
                            ? sender_username
                            : receiver_username
                        },{new Date(chatMessage.created_at).toLocaleString()}</p>
                        <p>{chatMessage.content}</p>
                    </div>
                ))}
        </div>
    )
}


export default ChatHistory;