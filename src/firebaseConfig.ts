import { initializeApp } from 'firebase/app';
import firebase from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAvdEYTLjjMFEvjGgtO2J-PWqCLMwKbaqA',
	authDomain: 'alpha-10854.firebaseapp.com',
	projectId: 'alpha-10854',
	storageBucket: 'alpha-10854.appspot.com',
	messagingSenderId: '365651135121',
	appId: '1:365651135121:web:ad185dec1d25a6254d8d30',
	measurementId: 'G-6FRM6XL9QS'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
