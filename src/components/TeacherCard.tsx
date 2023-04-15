import { IonButton, IonCard, IonCardContent, IonSearchbar, SearchbarChangeEventDetail } from '@ionic/react';
import './TeacherCard.css';
import { fetchTeacherAll } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import photo from '../../src/photo/brandi-redd-6H9H-tYPUQQ-unsplash.jpg'
import { useHistory } from 'react-router-dom';
import { TeacherInterface } from '../interface/interface';
import { useState } from 'react';

function TeacherCard() {
    const history = useHistory();
    const [searchText, setSearchText] = useState<string>("");
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["teacherAllList"],
        queryFn: fetchTeacherAll,
    });

    const onClickEditProfile = (id: number) => {
        history.push(`/tutorprofile/` + id);
    };

    console.log("rendering TeacherCard with data:", data);

    const handleSearch = (event: CustomEvent<SearchbarChangeEventDetail>) => {
        setSearchText(event.detail.value || "");
    };

    const filteredData = data?.filter((item: TeacherInterface) => {
        return item.user.username.toLowerCase().includes(searchText.toLowerCase());
    });

    return (
        <>
            <IonSearchbar value={searchText} onIonChange={handleSearch}></IonSearchbar>

            {Array.isArray(filteredData) && filteredData.map((item: TeacherInterface) => (
                <div key={item.id}>
                    <IonCard onClick={() => onClickEditProfile(item.id)}>
                        <img alt="Silhouette of mountains" src={photo} />
                        {/* <IonCardTitle>${item.id}</IonCardTitle> */}
                        <IonCardContent>{item.user.username}</IonCardContent>
                    </IonCard>
                </div>
            ))}
        </>
    );
}

export default TeacherCard;













