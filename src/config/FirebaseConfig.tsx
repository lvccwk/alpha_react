import { useQuery } from '@tanstack/react-query';
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
	createUserWithEmailAndPassword,
	FacebookAuthProvider,
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup
} from 'firebase/auth';
import { child, get, getDatabase, onValue, push, ref, set } from 'firebase/database';
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../api/fetchUser';
import ChatHistoryFirebase from './ChatHistory';
import ChatInstantFirebase from './ChatInstant';
import { useAppSelector } from '../redux/store';


const firebaseConfig = {
	apiKey: 'AIzaSyAvdEYTLjjMFEvjGgtO2J-PWqCLMwKbaqA',
	authDomain: 'alpha-10854.firebaseapp.com',
	projectId: 'alpha-10854',
	storageBucket: 'alpha-10854.appspot.com',
	messagingSenderId: '365651135121',
	appId: '1:365651135121:web:ad185dec1d25a6254d8d30',
	measurementId: 'G-6FRM6XL9QS',
	databaseURL: 'https://alpha-10854-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();

export async function loginUser(username: string, password: string) {
	const email = `${username}@gmail.com`;
	try {
		const res = await signInWithEmailAndPassword(auth, email, password);
		console.log(res);
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
}

export async function registerUser(username: string, password: string) {
	console.log({
		username,
		password
	});
	const email = `${username}@gmail.com`;
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		console.log(res);
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
}

export async function loginUserWithGoogle() {
	try {
		const res = await signInWithPopup(auth, provider);

		console.log(res);
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
}

export async function loginUserWithFacebook() {
	try {
		const facebookProvider = new FacebookAuthProvider();
		const authentication = getAuth(app);
		signInWithPopup(authentication, facebookProvider);
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
}

interface ChatMessage {
	sender_id: number;
	receiver_id: number;
	message_content: string;
	timestamp: number;
	username: string;
}

function writeUserData(sender_id: number, receiver_id: number, message_content: string, username: string) {
	const db = getDatabase();
	const chat_id = `${sender_id}-${receiver_id}`;
	// const message_id = Date.now().toString(); // generate a unique ID for each message
	const message: ChatMessage = {
		username,
		sender_id,
		receiver_id,
		message_content,
		timestamp: Date.now(),
	};
	push(ref(db, `messages/${chat_id}`), {
		message,
	});
}

//read data
export function readUserData(sender_id: number, receiver_id: number, message_content: string) {
	const dbRef = ref(getDatabase());
	const chat_id = `${sender_id}-${receiver_id}`;
	get(child(dbRef, `messages/${chat_id}`)).then((snapshot) => {
		if (snapshot.exists()) {
			console.log(snapshot.val());
		} else {
			console.log("No data available");
		}
	}).catch((error) => {
		console.error(error);
	});
}
// const db = getDatabase();
// const starCountRef = ref(db, 'posts/' + postId + '/starCount');
// onValue(starCountRef, (snapshot) => {
// 	const data = snapshot.val();
// 	updateStarCount(postElement, data);
// });

function ChatRoomFirebase() {
	const from_id = useAppSelector((state) => state.user.id);
	const params = useParams();
	const to_id = Object.values(params)[0];
	const [chatId, setChatId] = useState(`${to_id}-${from_id}`);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const [queryKey, setQueryKey] = useState("getUserInfoChatroom");
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: [queryKey],
		queryFn: () => fetchUser(),
	});
	console.log(`username`, to_id);
	console.log("data?.username", data?.username);
	const username: any = data?.username;
	const [messages, setMessages] = useState("");
	console.log(username);
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (messages.trim() !== "") {
			// make sure the message is not empty or only whitespace
			writeUserData(from_id, Number(to_id), messages, username);
			setMessages("");

			// Update query key to trigger ChatHistoryFirebase to refetch
			setQueryKey(`getUserInfoChatroom-${Date.now()}`);
		}
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chatId]);

	return (
		<>
			<div style={{ height: "700px", overflow: "auto" }} ref={messagesEndRef}>
				<div>
					對話記錄
					<ChatHistoryFirebase />
					對話記錄
				</div>
			</div>
			<div style={{ position: "relative" }}>
				<form onSubmit={handleSubmit}>
					<label
						style={{
							display: "flex",
							justifyContent: "center",
							position: "fixed",
							bottom: 10,
							width: "100%",
						}}
					>
						<input
							type="text"
							value={messages}
							onChange={(e) => setMessages(e.target.value)}
							style={{ width: "100%", marginRight: "2rem" }}
						/>
						<button type="submit" style={{ position: "absolute", right: 0 }}>
							Submit
						</button>
					</label>
				</form>
			</div>
		</>
	);
}

export default ChatRoomFirebase;
