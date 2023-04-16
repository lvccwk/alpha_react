import './Home.css';
import React from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonItem, IonPage, IonText } from '@ionic/react';
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
      <IonContent >
        <IonCardTitle></IonCardTitle>
        <IonCard>
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
            <SwiperSlide>
              <img
                src={photo4}
                alt="Slide 2"
              />
            </SwiperSlide>
          </Swiper>
        </IonCard>


        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Card Title</IonCardTitle>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Here's a small text description for the card content. Nothing more, nothing less.
          </IonCardContent>
        </IonCard>

        <div className='course'>
          <IonCardTitle>熱門課程</IonCardTitle><div onClick={onClickResourcePage} className='course-btn'>查看更多課程<IonIcon className="" icon={chevronForward} /></div>
        </div>
        <Swiper
          modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
          autoplay={{ delay: 5000 }}
          navigation={true}
          pagination={{ clickable: true }}
          slidesPerView={2}
          spaceBetween={-10}
        >
          {/* <SwiperSlide>
            <TeacherCard />
          </SwiperSlide> */}
          <SwiperSlide>
            <IonCard className='courseCard'>
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
              <IonCardHeader>
                <IonCardTitle className='courseCardContent'>Card Title</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </SwiperSlide>

          <SwiperSlide>
            <IonCard className='courseCard'>
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
              <IonCardHeader>
                <IonCardTitle className='courseCardContent'>Card Title</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </SwiperSlide>

          <SwiperSlide>
            <IonCard className='courseCard'>
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
              <IonCardHeader>
                <IonCardTitle className='courseCardContent'>Card Title</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </SwiperSlide>

          <SwiperSlide>
            <IonCard className='courseCard'>
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
              <IonCardHeader>
                <IonCardTitle className='courseCardContent'>Card Title</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </SwiperSlide>

          {/* <SwiperSlide>
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
          </SwiperSlide> */}
        </Swiper>


        <br /><br /><br /><br /><br />
      </IonContent>
    </IonPage >
  );
};

export default Home;
