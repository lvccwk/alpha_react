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
import { carSportOutline, cartOutline, cartSharp, ellipse, home, homeOutline, library, libraryOutline, peopleCircle, peopleOutline, playCircle, radio, search, square, triangle } from 'ionicons/icons';
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
import Cart from './pages/Cart';
import Login from './pages/Login';
import { FacebookCallback } from './components/FacebookCallback';
import ProductList from './pages/ProductList';

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
          <Route path="/home" render={() => <Tab2 />} exact={true} />
          <Route path="/library" render={() => <Tab3 />} exact={true} />
          <Route path="/cart" render={() => <Cart />} exact={true} />
          <Route path="/productlist" render={() => <ProductList />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/tutorlist">
            <IonIcon icon={peopleOutline} />
            <IonLabel>導師</IonLabel>
          </IonTabButton>

          <IonTabButton tab="radio" href="/home">
            <IonIcon icon={home} />
            <IonLabel>首頁</IonLabel>
          </IonTabButton>

          <IonTabButton tab="library" href="/library">
            <IonIcon icon={libraryOutline} />
            <IonLabel>資源</IonLabel>
          </IonTabButton>

          <IonTabButton tab="search" href="/cart">
            <IonIcon icon={cartSharp} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>

          <IonTabButton tab="search123" href="/productlist">
            <IonIcon icon={cartSharp} />
            <IonLabel>註冊</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
