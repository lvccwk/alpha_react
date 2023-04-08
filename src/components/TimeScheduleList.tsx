import React from 'react';
import { IonItem, IonLabel, IonList } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTeacher } from '../api/fetchAll';

interface ScheduleItem {
    time: string;
    title: string;
}

const scheduleItems: ScheduleItem[] = [
    { time: '9:00 AM', title: 'Breakfast' },
    { time: '10:00 AM', title: 'Morning Meeting' },
    { time: '11:00 AM', title: 'Work on Project' },
    { time: '12:00 PM', title: 'Lunch' },
    { time: '1:00 PM', title: 'Work on Project' },
    { time: '2:00 PM', title: 'Meeting with Client' },
    { time: '3:00 PM', title: 'Work on Project' },
    { time: '4:00 PM', title: 'Wrap Up' },
];

function TimeScheduleList() {
    const params = useParams()
    const teacherId = Object.values(params)[0]
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["timeScheduleList"],
        queryFn: () => fetchTeacher(Number(teacherId)),
    });
    return (
        <IonList>
            {scheduleItems.map((item) => (
                <IonItem key={item.time}>
                    <IonLabel>
                        <h3>{item.time}</h3> <p>{item.title}</p>

                    </IonLabel>
                </IonItem>
            ))}
        </IonList>
    );
}

export default TimeScheduleList;