import { getDatabase, ref, onValue, child } from "firebase/database";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface ChatMessage {
    userId: string;
    name: string;
    message: string;
    time: string;
}

const ChatInstantFirebase: React.FC = () => {
    const params = useParams();
    const user_id = Object.values(params)[0];

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        const dbRef = ref(getDatabase());
        const chatRef = child(dbRef, `users/${user_id}`);

        onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            const messages: ChatMessage[] = [];

            Object.keys(data).forEach((key) => {
                const { username, message, time } = data[key];
                messages.push({ userId: key, name: username, message, time });
            });

            setChatMessages(messages);
        }, {

        });

    }, [user_id]);

    return (
        <div>
            {chatMessages.map((chatMessage) => (
                <div key={chatMessage.userId}>
                    <p>
                        {chatMessage.name}: {chatMessage.message} ({chatMessage.time})
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ChatInstantFirebase;
