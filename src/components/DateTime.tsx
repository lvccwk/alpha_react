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


    const handleDateChange = (event: any) => {
        const selectedDate = event.detail.value;
        const date = selectedDate.slice(0, 10);
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