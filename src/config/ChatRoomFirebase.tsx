import React, { useState, useEffect, useRef } from 'react';
import { getDatabase, ref, child, push, onValue } from 'firebase/database';

interface Message {
    sender: string;
    receiver: string;
    text: string;
    timestamp: number;
}

interface Props {
    user: string;
    recipient: string;
}

const Chat: React.FC<Props> = ({ user, recipient }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState('');
    const db = getDatabase();

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chatRef = ref(db, 'chats/' + user + '/' + recipient);
        onValue(chatRef, (snapshot) => {
            if (snapshot.exists()) {
                setMessages(Object.values(snapshot.val()));
            }
        });

        scrollToBottom();
    }, [user, recipient]);

    const handleSend = () => {
        if (text.trim() !== '') {
            const chatRef = ref(db, 'chats/' + user + '/' + recipient);
            push(chatRef, {
                sender: user,
                receiver: recipient,
                text: text,
                timestamp: Date.now(),
            });
            setText('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="chat">
            <div className="messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === user ? 'sent' : 'received'}`}
                    >
                        {message.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input">
                <textarea
                    placeholder="Type your message..."
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
