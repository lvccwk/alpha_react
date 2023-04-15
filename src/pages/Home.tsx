import './Home.css';
import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';
import ToolBar from '../components/Toolbar';

const Home: React.FC = () => {
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
              src="https://via.placeholder.com/350x200/FF0000/FFFFFF?text=Slide+1"
              alt="Slide 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://via.placeholder.com/350x200/00FF00/FFFFFF?text=Slide+2"
              alt="Slide 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://via.placeholder.com/350x200/0000FF/FFFFFF?text=Slide+3"
              alt="Slide 3"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://via.placeholder.com/350x200/FF00FF/FFFFFF?text=Slide+4"
              alt="Slide 4"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://via.placeholder.com/350x200/FFFF00/FFFFFF?text=Slide+5"
              alt="Slide 5"
            />
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage >
  );
};

export default Home;
