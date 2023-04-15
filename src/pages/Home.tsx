import './Home.css';
import React from 'react';
import { IonButton, IonCardContent, IonCardTitle, IonContent, IonIcon, IonItem, IonPage, IonText } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Navigation, Pagination, Scrollbar, Zoom } from 'swiper';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';
import ToolBar from '../components/Toolbar';
import photo1 from './photo/1.jpg'
import photo2 from './../photo/2.jpg'
import photo3 from './../photo/3.jpg'
import photo4 from './../photo/4.jpg'
import photo5 from './../photo/5.jpg'
import photo6 from './../photo/6.jpg'
import './Home.css'
import TeacherCard from '../components/TeacherCard';
import { chevronForward, person } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';


const Home: React.FC = () => {


  const history = useHistory();
  const onClickResourcePage = () => {
    history.push(`/resource/`);
  }

  return (
    <IonPage>
      <ToolBar />
      <IonContent className='ion-padding'>
        <Swiper
          modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
          autoplay={true}
          // autoplay={{ delay: 2000 }}
          keyboard={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          zoom={true}
          slidesPerView={1}
          spaceBetween={15}
        >
          <SwiperSlide>
            <img
              src={photo2}
              alt="Slide 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={photo3}
              alt="Slide 2"
            />
          </SwiperSlide>

        </Swiper>

        <br></br>
        <div className='course'>
          <IonCardTitle>熱門課程</IonCardTitle><div onClick={onClickResourcePage} className='course-btn'>查看更多課程<IonIcon className="" icon={chevronForward} /></div>
        </div>
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 5000 }}
          navigation={true}
          pagination={{ clickable: true }}
          slidesPerView={1}
          spaceBetween={10}
        >
          <SwiperSlide>
            <TeacherCard />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://picsum.photos/id/1015/800/450"
              alt="Slide 2"
              className="swiper-image"
            />
            <IonText className="swiper-title">The Crown</IonText>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://picsum.photos/id/1040/800/450"
              alt="Slide 3"
              className="swiper-image"
            />
            <IonText className="swiper-title">The Witcher</IonText>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://picsum.photos/id/1019/800/450"
              alt="Slide 4"
              className="swiper-image"
            />
            <IonText className="swiper-title">Narcos</IonText>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://picsum.photos/id/1002/800/450"
              alt="Slide 5"
              className="swiper-image"
            />
            <IonText className="swiper-title">Black Mirror</IonText>
          </SwiperSlide>
        </Swiper>
      </IonContent>



    </IonPage >
  );
};

export default Home;
