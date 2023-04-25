import React, { useState } from 'react';
import { IonPage, IonContent, IonCard, IonCardContent, IonInput, IonSelectOption, IonSelect, IonButton, IonToast, IonDatetime } from '@ionic/react';
// import FileUpload from '../components/FileUpload';
import ToolBar from '../components/Toolbar';
import TimePicker from '../components/TimePicker';
import { useParams } from 'react-router';
import TeacherDetail from '../components/TeacherDetail';
import Toolbar from '../components/Toolbar';

const UploadAvailableTime: React.FC = () => {

    const params = useParams()
    const [timeDuring, setTimeDuring] = useState<String | null>(null);
    const [timeSlot, setTimeSlot] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const teacherId = (Number(Object.values(params)[0]))

    const currentDatetime = new Date().toISOString();
    const [selectedDatetime, setSelectedDatetime] = useState(null);

    const handleDatetimeChange = (event: any) => {
        const datetimeValue = event.detail.value;
        setSelectedDatetime(datetimeValue);
    };

    const handleSubmit = () => {
        console.log('Selected DateTime:', selectedDatetime);
    };



    const UploadAvailableTime = async (e: any) => {
        e.preventDefault();

        if (!timeSlot || timeDuring) {
            console.error('Please fill in all fields');
            setShowToast(true);
            setToastMessage('資料不能留空');
            return;

        } else {
            try {
                const obj = {
                    time_slot: timeSlot,
                    time_during: timeDuring,
                    teacher_id: teacherId
                }

                const formData = new FormData();
                formData.append('teacher_id', String(teacherId));
            } catch (error) {
                console.log(error);
            }
        }

    };

    return (
        <>
            <IonPage>
                <Toolbar />
                <IonContent className='ion-padding'>
                    <IonCardContent className="ion-padding">

                        預約時間

                        <div  >
                            預約時間
                            <IonDatetime locale="zh-HK" hourCycle="h23" min={currentDatetime} onIonChange={handleDatetimeChange}></IonDatetime>
                            <IonButton onClick={handleSubmit}>提交你的預約時間</IonButton>
                        </div>

                        時間長度 - 30分鐘/節
                        <IonSelect
                            value={timeDuring}
                            placeholder="Select Subject"
                            onIonChange={(e: any) => setTimeDuring(e.detail.value)} >
                            <IonSelectOption value="1">30 分鐘</IonSelectOption>
                            <IonSelectOption value="2">60 分鐘 </IonSelectOption>
                            <IonSelectOption value="3">90 分鐘</IonSelectOption>
                            <IonSelectOption value="4">120 分鐘</IonSelectOption>
                            <IonSelectOption value="5">150 分鐘</IonSelectOption>
                            <IonSelectOption value="6">180 分鐘</IonSelectOption>
                        </IonSelect><br />
                        <IonButton onClick={UploadAvailableTime}>UPLOAD</IonButton>
                    </IonCardContent>
                </IonContent>

                <IonToast position="top"
                    isOpen={showToast}
                    message={toastMessage}
                    duration={1000}
                    onDidDismiss={() => setShowToast(false)}
                />
            </IonPage>
        </>
    );
}

export default UploadAvailableTime;