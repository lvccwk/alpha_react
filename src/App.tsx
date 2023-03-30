// import { configureStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';
// import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { carSportOutline, cart, cartOutline, cartSharp, chatbubble, chatbubbleOutline, chatbubbles, chatbubblesOutline, ellipse, home, homeOutline, library, libraryOutline, people, peopleCircle, peopleCircleSharp, peopleOutline, playCircle, radio, search, square, triangle } from 'ionicons/icons';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
// import Cart from './pages/Cart';
import Login from './pages/Login';
import { FacebookCallback } from './components/FacebookCallback';
import ProductList from './pages/ProductList';
import ProductPage from './pages/ProductPage';
import UserProfile from './pages/UserProfile';
import UserProfileSettings from './pages/UserProfileSettings';
import ShoppingCart from './pages/ShoppingCart';
import Home from './pages/Home';
import Resource from './pages/Resource';
import Tutor from './pages/Tutor';
import Chatroom from './pages/Chatroom';
import "./App.css"
import TutorProfile from './pages/TutorProfile';


setupIonicReact();

const App: React.FC = () => {
  // const history = useHistory();
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Redirect exact path="/" to="/home" />
            {/*
          Use the render method to reduce the number of renders your component will have due to a route change.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
<<<<<<< HEAD
          <Route path="/resource" render={() => <Resource />} exact={true} />
          <Route path="/tutor" render={() => <Tutor />} exact={true} />
          <Route path="/home" render={() => <Home />} exact={true} />
          <Route path="/shoppingcart" render={() => <ShoppingCart />} exact={true} />
          <Route path="/chatroom" render={() => <Chatroom />} exact={true} />
          <Route path="/login" render={() => <Login />} exact={true} />
          <Route exact path="/facebook-callback"><FacebookCallback></FacebookCallback></Route>
          <Route path="/userprofile" render={() => <UserProfile />} exact={true} />
          <Route path="/userprofilesettings" exact={true} ><UserProfileSettings /></Route>
          <Route path="/ProductList" exact={true} ><ProductList /></Route>
          <Route path="/ProductPage/:productId" exact={true} ><ProductPage /></Route>
          <Route path="/tutorprofile" render={() => <TutorProfile />} exact={true} />
        </IonRouterOutlet>
=======
            <Route path="/resource" render={() => <Resource />} exact={true} />
            <Route path="/tutor" render={() => <Tutor />} exact={true} />
            <Route path="/home" render={() => <Home />} exact={true} />
            <Route path="/shoppingcart" render={() => <ShoppingCart />} exact={true} />
            <Route path="/chatroom" render={() => <Chatroom />} exact={true} />
            <Route path="/login" render={() => <Login />} exact={true} />
            <Route exact path="/facebook-callback">
              <FacebookCallback></FacebookCallback>
            </Route>
            <Route path="/userprofile" render={() => <UserProfile />} exact={true} />
            <Route path="/userprofilesettings" exact={true} >
              <UserProfileSettings />
            </Route>
            <Route path="/tutorprofile" exact={true} >
              <TutorProfile />
            </Route>
          </IonRouterOutlet>
>>>>>>> 6856f77be46cfb47a6de4a9b9cd6303a03773727


          <IonTabBar slot="bottom">
            <IonTabButton tab="resource" href="/resource">
              <IonIcon icon={libraryOutline} />
              <IonLabel>資源</IonLabel>
            </IonTabButton>

            <IonTabButton tab="tutor" href="/tutor" >
              <IonIcon icon={people} />
              <IonLabel>導師</IonLabel>
            </IonTabButton>

            <IonTabButton tab="home" href="/home">
              <IonIcon icon={homeOutline} />
              <IonLabel>首頁</IonLabel>
            </IonTabButton>

            <IonTabButton tab="shoppingcart" href="/shoppingcart">
              <IonIcon icon={cart} />
              <IonLabel>購物車</IonLabel>
            </IonTabButton>

            <IonTabButton tab="chatroom" href="/chatroom">
              <IonIcon icon={chatbubblesOutline} />
              <IonLabel>訊息</IonLabel>
            </IonTabButton>

          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
