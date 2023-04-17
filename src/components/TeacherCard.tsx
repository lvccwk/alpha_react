import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonImg, IonSearchbar, IonText, SearchbarChangeEventDetail } from '@ionic/react';
import './TeacherCard.css';
import { fetchTeacherAll } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory } from 'react-router-dom';
import { TeacherInterface } from '../interface/interface';
import { useState } from 'react';
import './../../src/components/UiDesign/Tutor.css'
import Avatar from './Avatar';
import AvatarChat from './UiDesign/AvatarChat';

function TeacherList() {
    const [searchText, setSearchText] = useState('');
    const { data: teacherAll, isLoading, error, refetch } = useQuery({
        queryKey: ["teacherAllList"],
        queryFn: fetchTeacherAll,
    });
    const history = useHistory();

    const onClickEditProfile = (id: number) => {
        history.push(`/tutorprofile/${id}`);
    };

    const handleSearch = (e: CustomEvent) => {
        setSearchText(e.detail.value!);
    };
    console.log('teacherAll', teacherAll)

    const filteredData = teacherAll?.filter((item: any) =>
        item.user.username.toString().includes(searchText.toString()) ||
        item.info.toString().includes(searchText.toString())

    );

    console.log(teacherAll)

    return (
        <>
            <IonSearchbar value={searchText} onIonChange={handleSearch}></IonSearchbar>

            {Array.isArray(filteredData) &&
                filteredData.map((item: TeacherInterface) => (
                    <div className='teacherCardContainer' key={item.id}>
                        <IonCard className='teacherCardComp' onClick={() => onClickEditProfile(item.id)}>
                            <div className='tutorPhoto'><IonImg className='image' src={item.user.image = item.user.image ? item.user.image : "https://ionicframework.com/docs/img/demos/avatar.svg"} /></div>
                            <IonCardSubtitle className='font-inbox-top'>{item.user.username}</IonCardSubtitle>
                            {/* <IonCardSubtitle className='font-inbox'>香港中文大學</IonCardSubtitle> */}
                            <IonButton className='font-inbox'>中文科 ： 1 年教學經驗</IonButton>

                            {/* <IonCard className='imgTeacher' >
                                <IonImg src={photo} />
                            </IonCard> */}
                        </IonCard >
                    </div >
                ))
            }

        </>
    );
};

export default TeacherList;






