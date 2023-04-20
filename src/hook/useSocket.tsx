import { useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client';

export default function useSocket() {
    const [socket, setSocket] = useState<Socket>()


    useEffect(() => {
        if (!socket) {
            const newSocket = io(`http://localhost:3000`)
            setSocket(newSocket)
            console.log(newSocket)

        } else {
            // socket?.emit("joinRoom", sender_id, receiver_id)
        }
    }, [socket])

    return socket
}