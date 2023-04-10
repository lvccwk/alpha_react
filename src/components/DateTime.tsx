import React from 'react';
import { IonContent, IonDatetime, IonPage } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { fetchTeacher } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import TimeScheduleList from './TimeScheduleList';

function DateTime() {
    const params = useParams()
    const teacherId = Object.values(params)[0]
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["teacherAppointment"],
        queryFn: () => fetchTeacher(Number(teacherId)),
    });

    console.log(`TeacherId =`, data?.id)
    // const handleDateChange = (event: CustomEvent<any>) => {
    //     const selectedDate = new Date(event.detail.value);
    //     const day = selectedDate.getDay();
    //     alert(`You selected day ${day}`);
    // };

    const handleDateChange = (event: any) => {
        const selectedDate = event.detail.value;
        const date = selectedDate.slice(0, 10);
        // Call your function here with the selected date
        console.log('Selected date:', date);
    };


    return (

        <div>
            <IonDatetime
                presentation="date"
                onIonChange={handleDateChange}
            />
            <TimeScheduleList />
        </div>

    );
}

export default DateTime;