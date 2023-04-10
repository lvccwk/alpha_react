import { IonContent, IonPage } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { fetchTeacher } from "../api/fetchAll";
import DateTime from "../components/DateTime";
import TimePicker from "../components/TimePicker";
import TimeScheduleList from "../components/TimeScheduleList";
import ToolBar from "../components/Toolbar";

const TimeSlot: React.FC = () => {
    const params = useParams()
    const teacherId = Object.values(params)[0]
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["teacherAppointmentPage"],
        queryFn: () => fetchTeacher(Number(teacherId)),
    });


    return (
        <>
            <IonPage>
                <ToolBar />
                <IonContent>
                    {data?.user.username} 可預約的時間表
                    {/* <DateTime /> */}
                    {/* <TimeScheduleList /> */}
                    <br></br>
                    <TimePicker />

                </IonContent>
            </IonPage>
        </>
    );
};
export default TimeSlot;
