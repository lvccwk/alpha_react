import React, { useState } from 'react';
import { IonButton, IonIcon, IonToast } from '@ionic/react';
import { bookmark, bookmarkOutline } from 'ionicons/icons';

function TeacherBookmark() {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showToast, setShowToast] = useState(false);


    const handleClick = () => {
        setIsBookmarked(!isBookmarked);
        setShowToast(true);
    };
    const toastMessage = isBookmarked ? 'Teacher bookmarked' : 'Bookmark removed';

    return (
        <>
            <button onClick={handleClick}>
                <IonIcon icon={isBookmarked ? bookmark : bookmarkOutline} color={isBookmarked ? 'primary' : 'medium'} />
                {/* {isBookmarked ? 'Bookmarked' : 'Bookmark'} */}
            </button>
            <IonToast isOpen={showToast} message={toastMessage} duration={3000} onDidDismiss={() => setShowToast(false)} />
        </>
    );
}

export default TeacherBookmark;