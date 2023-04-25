import { useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client';

export default function useSocket() {
    const [socket, setSocket] = useState<Socket>()


    useEffect(() => {
        if (!socket) {
            const newSocket = io(`${process.env.REACT_APP_API_SERVER}`)
            setSocket(newSocket)
        } else {

        }
    }, [socket])

    return socket
}