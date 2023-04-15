import { IonCard, IonCardContent, IonSearchbar, SearchbarChangeEventDetail } from '@ionic/react';
import './TeacherCard.css';
import { fetchTeacherAll } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory } from 'react-router-dom';
import { TeacherInterface } from '../interface/interface';
import { useState } from 'react';

function TeacherCard() {
    const [searchText, setSearchText] = useState('');
    const { data, isLoading, error, refetch } = useQuery({
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

    const filteredData = data?.filter((item: any) =>
        item.user.username.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <>
            <IonSearchbar value={searchText} onIonChange={handleSearch}></IonSearchbar>

            {Array.isArray(filteredData) &&
                filteredData.map((item: TeacherInterface) => (
                    <div key={item.id}>
                        <IonCard onClick={() => onClickEditProfile(item.id)}>
                            <img alt="Silhouette of mountains" src={photo} />
                            <IonCardContent>{item.user.username}</IonCardContent>
                        </IonCard>
                    </div>
                ))}
        </>
    );
};

export default TeacherCard;






