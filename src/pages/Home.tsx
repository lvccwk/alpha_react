import './Home.css';
import React, { useEffect } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonImg, IonItem, IonPage, IonText, useIonViewWillEnter } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Navigation, Pagination, Scrollbar, Zoom } from 'swiper';
import { fetchCourse, fetchTeacherAll } from '../api/fetchAll';
import { useQuery } from '@tanstack/react-query';
import { TeacherInterface, TeacherSubjectInterface } from '../interface/interface';

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

export interface Course {
  image: string | undefined;
  id: number;
  name: string;
  price: number;
  avg_rating: number;
  subject_id: number;
  teacher_id: number;
  info: string;
}

const Home: React.FC = () => {
  const { data: course, refetch: courseFetch } = useQuery({
    queryKey: ["homepagecourse"],
    queryFn: async () => await fetchCourse(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const { data: teacherAll, isLoading, error, refetch } = useQuery({
    queryKey: ["teacherAllList"],
    queryFn: fetchTeacherAll,
  });
  console.log(teacherAll)


  useIonViewWillEnter(() => {
    console.log("courseFetch")
    courseFetch()

  })
  // useEffect(() => {
  //   console.log("courseFetch")
  //   courseFetch()
  // }, [])

  const onClickTeacherProfile = (id: number) => {
    history.push(`/tutorprofile/${id}`);
  };

  const history = useHistory();
  const onClickResourcePage = () => {
    history.push(`/resource/`);
  }
  const onClickTutorPage = () => {
    history.push(`/tutor/`);
  }
  const onClickProductPage = (id: number) => {
    history.push(`/productpage/` + id);
  }
  return (
    <IonPage>
      <ToolBar />
      <IonContent >
        <IonCardTitle></IonCardTitle>
        <IonCard className='cardTheTop'>
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
              <div className='img-1'>
                <img
                  src={photo2}
                  alt="Slide 1"
                />
                <div className='img-1-text'>
                  <h1>全天候開放，隨時隨地學習</h1>

                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='img-1'>
                <img
                  src={photo3}
                  alt="Slide 2"
                />
                <div className='img-1-text'>
                  <h1>實時操題訓練。學習無界限</h1>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='img-1'>
                <img
                  src={photo2}
                  alt="Slide 3"
                />
                <div className='img-1-text'>
                  <h1>個性化學習體驗</h1>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </IonCard>


        <IonCard>
          <IonCardHeader>
            <IonCardTitle className='card1' >線上補習問功課平台</IonCardTitle>
            {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
          </IonCardHeader>

          <IonCardContent className='card1'>
            一站式學習平台，提供全科24小時功課問
            答、影片課程、實時操題訓練。
          </IonCardContent>
        </IonCard>

        <div className='course'>
          <IonCardTitle>熱門課程</IonCardTitle><div onClick={onClickResourcePage} className='course-btn'>查看更多課程<IonIcon className="" icon={chevronForward} /></div>
        </div>
        <Swiper
          modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
          autoplay={true}
          navigation={true}
          pagination={{ clickable: true }}
          slidesPerView={2}
          spaceBetween={-10}
        >
          {/* <SwiperSlide>
            <TeacherCard />
          </SwiperSlide> */}
          {Array.isArray(course) && course.map((item: Course, index: number) => (
            <SwiperSlide key={index}>

              <IonCard className='courseCard' onClick={() => onClickProductPage(item.id)}>
                <div><IonImg className='coursePhotoHome' src={item.image} /></div>
                <IonCardSubtitle className='courseCardContent'>{item.name}</IonCardSubtitle>
              </IonCard>

            </SwiperSlide>
          ))}

        </Swiper>
        <div className='course'>
          <IonCardTitle>熱門老師</IonCardTitle><div onClick={onClickTutorPage} className='course-btn'>查看更多導師<IonIcon className="" icon={chevronForward} /></div>
        </div>
        <Swiper
          modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
          autoplay={{ delay: 5000 }}
          navigation={true}
          pagination={{ clickable: true }}
          slidesPerView={2}
          spaceBetween={-10}
        >
          {Array.isArray(teacherAll) && teacherAll.map((item: TeacherInterface, index: number) => (
            <SwiperSlide key={index} className='img'>
              <IonCard className="courseCard" onClick={() => onClickTeacherProfile(item.id)}>
                <div><IonImg className="imgSize" src={item.user.image = item.user.image ? item.user.image : "https://ionicframework.com/docs/img/demos/avatar.svg"} /> </div>

                <IonCardSubtitle className="courseCardContent">{item.user.username}</IonCardSubtitle>

              </IonCard>
            </SwiperSlide>
          ))}
        </Swiper>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className='card1' >一機在手 隨問隨到</IonCardTitle>
            {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
          </IonCardHeader>

          <IonCardContent className='card1'>
            只要一機在手，問題不再是問題！
          </IonCardContent>
        </IonCard>
        <br /><br /><br /><br /><br />
      </IonContent>
    </IonPage >
  );
};

export default Home;
