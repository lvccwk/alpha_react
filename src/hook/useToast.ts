import { useIonToast } from '@ionic/react';

export function useToast() {
	const [presentToast, dismissToast] = useIonToast();

	function showSuccessToast(message: string) {
		presentToast({
			message,
			color: 'success',
			duration: 1000,
			position: 'bottom',
			buttons: [{ text: 'Dismiss', role: 'cancel', handler: dismissToast }],
		});
	}
	function showFailedToast(message: string) {
		presentToast({
			message,
			color: 'danger',
			duration: 2000,
			position: 'bottom',
			buttons: [{ text: 'Dismiss', role: 'cancel', handler: dismissToast }],
		});
	}

	return { showFailedToast, showSuccessToast };
}
