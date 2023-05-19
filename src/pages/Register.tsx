import {
	IonButton,
	IonButtons,
	IonContent,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonPage,
	IonSelect,
	IonSelectOption,
	IonToast,
	useIonToast,
} from '@ionic/react';
import { TextFieldTypes } from '@ionic/core/dist/types/interface';
import { useQuery } from '@tanstack/react-query/build/lib/useQuery';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { fetchAddUser } from '../api/fetchUser';
import { fetchCreateTeacher } from '../api/fetchAll';
import ToolBar from '../components/Toolbar';
import { registerUser } from '../config/FirebaseConfig';
import './../../src/components/UiDesign/Login.css';
import Refresh from '../components/Refresh';
import { eye, eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { useToast } from '../hook/useToast';

type UserType = 'student' | 'teacher';

const Register: React.FC = () => {
	const [userType, setUserType] = useState<UserType | null>(null);

	const isTeacher = userType === 'teacher';

	const [formState, setFormState] = useState({
		/* for both teacher and student */
		username: '',
		email: '',
		password: '',
		confirm_password: '',
		/* for teacher */
		teacherInfo: '',
		school: '',
		experience: 0,
	});
	const [isShowPassword, setIsShowPassword] = useState(false);

	type FormState = typeof formState;

	const { showFailedToast, showSuccessToast } = useToast();

	const history = useHistory();
	const createUser = useMutation({
		mutationFn: async (obj: {
			user_type: string;
			username: string;
			email: string;
			password: string;
		}) => await fetchAddUser(obj),

		onSuccess: (data) => {
			if (isTeacher) {
				createTeacher.mutate({
					user_id: data.id,
					info: formState.teacherInfo,
					school: formState.school,
					experience: formState.experience,
				});
			}
			showSuccessToast('註冊成功! 請登入');
			history.push('/login');
		},
		onError: (error: any) => {
			showFailedToast('註冊失敗');
		},
	});

	const createTeacher = useMutation({
		mutationFn: async (obj: {
			user_id: number;
			info: string;
			school: string;
			experience: number;
		}) => await fetchCreateTeacher(obj),
		onSuccess: (data) => {},
		onError: (error: any) => {
			console.log(error.message);
		},
	});

	const handleRegisterUser = () => {
		const { username, password, confirm_password: cpassword, email } = formState;
		if (password !== cpassword) {
			showFailedToast('密碼不一致!');
			return;
		}
		if (username.trim() === '' || password.trim() === '') {
			showFailedToast('用戶名或密碼不能留空!');
			return;
		}
		if (!userType) {
			showFailedToast('請選擇帳戶類別');
			return;
		}
		createUser.mutate({
			user_type: userType,
			username: username,
			email: email,
			password: password,
		});
	};

	function renderField(field: {
		key: keyof FormState;
		label: string;
		type?: TextFieldTypes;
		extra?: any;
	}) {
		return (
			<IonItem>
				<IonLabel position='floating'>{field.label}</IonLabel>
				<IonInput
					type={field.type}
					value={formState[field.key]}
					onIonChange={(e) =>
						setFormState({
							...formState,
							[field.key]: String(e.detail.value || ''),
						})
					}></IonInput>
				{field.extra}
			</IonItem>
		);
	}

	let togglePasswordButton = (
		<IonButtons slot='end'>
			{isShowPassword ? (
				<IonButton onClick={() => setIsShowPassword(false)}>
					<IonIcon icon={eyeOutline}></IonIcon>
				</IonButton>
			) : (
				<IonButton onClick={() => setIsShowPassword(true)}>
					<IonIcon icon={eyeOffOutline}></IonIcon>
				</IonButton>
			)}
		</IonButtons>
	);

	return (
		<>
			<IonPage>
				<ToolBar />
				<IonContent className='ion-padding'>
					<Refresh />
					<div className='register'>
						<IonItem>
							<IonLabel position='floating'>選擇帳戶類別</IonLabel>
							<IonSelect
								value={userType}
								onIonChange={(e) => {
									setUserType(e.detail.value);
								}}>
								<IonSelectOption value='teacher'>導師</IonSelectOption>
								<IonSelectOption value='student'>學生</IonSelectOption>
							</IonSelect>
						</IonItem>
						{isTeacher
							? [
									renderField({ key: 'teacherInfo', label: '導師簡介' }),
									renderField({ key: 'school', label: '學校' }),
									renderField({ key: 'experience', label: '經驗年數' }),
							  ]
							: null}
						{renderField({ key: 'username', label: '用戶名稱' })}
						{renderField({ key: 'email', label: '電郵', type: 'email' })}
						{renderField({
							key: 'password',
							label: '密碼',
							type: isShowPassword ? 'text' : 'password',
							extra: togglePasswordButton,
						})}
						{renderField({
							key: 'confirm_password',
							label: '確認密碼',
							type: isShowPassword ? 'text' : 'password',
							extra: togglePasswordButton,
						})}
						<IonButton onClick={handleRegisterUser}>註冊</IonButton>
					</div>
				</IonContent>
			</IonPage>
		</>
	);
};

export default Register;
