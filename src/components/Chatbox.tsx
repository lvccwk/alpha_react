import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { useQuery } from "@tanstack/react-query";
import './ListCard.css';
import {
    fetchChatHistoryAll
} from "../api/fetchAll";

interface Chatroom {
    id: number;
    username: string;
    content: string;
    created_at: any;
    updated_at: any;
    user: any;

}

function Chatbox() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["chatroomHistory"],
        queryFn: fetchChatHistoryAll, //redux login state
    });

    return (
        <>
            {Array.isArray(data) &&
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
                ))}
        </>
    );

}
export default Chatbox;

