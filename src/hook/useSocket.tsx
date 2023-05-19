import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { API_ORIGIN } from '../api/api';

export default function useSocket() {
	const [socket, setSocket] = useState<Socket>();

	useEffect(() => {
		if (!socket) {
			const newSocket = io(`${API_ORIGIN}`);
			setSocket(newSocket);
		} else {
		}
	}, [socket]);

	return socket;
}
