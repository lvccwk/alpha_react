import { useQuery } from '@tanstack/react-query';
import { ref, getDatabase, onValue, get, child } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../api/fetchUser';
import { useAppSelector } from '../redux/store';

interface ChatMessage {
    userId: string;
    name: string;
    message: string;
    time: string;
    message_content: string;
    timestamp: number;
    id: any;
    sender_id: number;
    receiver_id: number;
    chatId: number;
    username: string;
}

const ChatHistoryFirebase: React.FC = () => {
    const from_id = useAppSelector(state => state.user.id);
    const params = useParams();
    const to_id = Object.values(params)[0];
    const [to_from, setTo_from] = useState(`${to_id}-${from_id}`);
    const [from_to, setFrom_to] = useState(`${from_id}-${from_id}`);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        const dbRef = ref(getDatabase());
        const chatRef_to_from = child(dbRef, `messages/${to_from}`);
        onValue(chatRef_to_from, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const chatMessages = Object.values(data);
                setMessages(chatMessages.map((message: any) => message.message as ChatMessage));
            } else {
                setMessages([]);
            }
        });
    }, [to_from]);



    return (
        <div>
            {messages.map((message) => (
                <div key={message.timestamp}>
                    <p> ({message.username})({message.timestamp})</p>
                    <p>{message.message_content}</p>
                </div>
            ))}
        </div>
    );
};

export default ChatHistoryFirebase