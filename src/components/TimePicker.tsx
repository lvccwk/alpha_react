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

    const currentDatetime = new Date().toISOString();
    const [selectedDatetime, setSelectedDatetime] = useState(null);

    const handleDatetimeChange = (event: any) => {
        const datetimeValue = event.detail.value;
        setSelectedDatetime(datetimeValue);
    };

    const handleSubmit = () => {
        console.log('Selected DateTime:', selectedDatetime);
    };

    return (
        <>
            <div>
                {data?.user.username} 每節課堂為一小時
                <IonDatetime locale="zh-HK" hourCycle="h23" min={currentDatetime} onIonChange={handleDatetimeChange}></IonDatetime>
                <IonButton onClick={handleSubmit}>提交你的預約時間</IonButton>
            </div>

        </>

    );
}

export default TimePicker;