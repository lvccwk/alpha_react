import React, { useState } from 'react';
import { IonButton, IonDatetime } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTeacher } from '../api/fetchAll';

function TimePicker() {
    const params = useParams()
    const teacherId = Object.values(params)[0]
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["timeScheduleLists"],
        queryFn: () => fetchTeacher(Number(teacherId)),
    });
    const currentDatetime = new Date().toISOString(); // get the current datetime as ISO string
    const [selectedDatetime, setSelectedDatetime] = useState(null); // state to store the selected datetime value

    const handleDatetimeChange = (event: any) => {
        const datetimeValue = event.detail.value; // get the selected datetime value
        setSelectedDatetime(datetimeValue); // update the state with the selected datetime value
    };

    const handleSubmit = () => {
        // Call your function here to submit the selected datetime value to the backend
        console.log('Selected DateTime:', selectedDatetime);
    };

    return (
        <>
            <div>
                {data?.user.username} 每節課堂為一小時
                <IonDatetime locale="zh-HK" hourCycle="h23" min={currentDatetime} onIonChange={handleDatetimeChange}></IonDatetime>
                <IonButton onClick={handleSubmit}>提交你的預約時間</IonButton>
            </div>
            <div>
                {data?.user.username} 每節課堂為一小時
                <IonDatetime locale="zh-HK" hourCycle="h23" min={currentDatetime} onIonChange={handleDatetimeChange}></IonDatetime>
                <IonButton onClick={handleSubmit}>提交你的預約時間</IonButton>
            </div>
        </>

    );
}

export default TimePicker;