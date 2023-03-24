import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Redirect, Route } from 'react-router-dom';
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
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

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
import UserProfile from './pages/UserProfile';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>

          <Redirect exact path="/" to="/home" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          <Route exact path="/facebook-callback">
            <FacebookCallback></FacebookCallback>
          </Route>
          <Route path="/tutorlist" render={() => <Tab1 />} exact={true} />
          <Route path="/radio" render={() => <Tab3 />} exact={true} />
          <Route path="/home" render={() => <Tab2 />} exact={true} />
          <Route path="/shoppingcart" render={() => <Tab1 />} exact={true} />
          <Route path="/chatroom" render={() => <ProductList />} exact={true} />
          <Route path="/userprofile" render={() => <UserProfile />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tutorlist" href="/tutorlist">
            <IonIcon icon={libraryOutline} />
            <IonLabel>導師</IonLabel>
          </IonTabButton>

          <IonTabButton tab="radio" href="/radio">
            <IonIcon icon={people} />
            <IonLabel>資源</IonLabel>
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
);

export default App;
