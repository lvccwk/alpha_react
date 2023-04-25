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
import { cart, cartOutline, chatbubbles, chatbubblesOutline, home, homeOutline, library, libraryOutline, people, peopleOutline } from 'ionicons/icons';


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
import './../src/components/UiDesign/UserProfile.css'

/* Theme variables */
import './theme/variables.css';

import Login from './pages/Login';
import { FacebookCallback } from './components/FacebookCallback';
import ProductList from './pages/ProductList';
import EditProduct from './pages/EditProduct';
import ProductPage from './pages/ProductPage';
import PurchasedItem from './pages/PurchasedItem';
import UserProfile from './pages/UserProfile';
import UserProfileSettings from './pages/UserProfileSettings';
import ShoppingCart from './pages/ShoppingCart';
import Home from './pages/Home';
import Resource from './pages/Resource';
import Tutor from './pages/Tutor';
import Chatroom from './pages/Chatroom';
import "./App.css";
import TutorProfile from './pages/TutorProfile';
import Register from './pages/Register';
import PurchaseHistory from './pages/PurchaseHistory';
import UploadHistory from './pages/UploadHistory';
import UploadProduct from './pages/UploadProduct';
import TimeSlot from './pages/TimeSlot';
import PrivateMessage from './pages/PrivateMessage';
import Chat from './config/ChatRoomFirebase';
import InputMessage from './config/FirebaseConfig';
import Success from './pages/Success';
import StripePurchaseFailPage from './pages/Fail';
import StripePurchaseSuccessPage from './pages/Success';
import ChatMessage from './pages/ChatMessage';
import UploadAvailableTime from './pages/UploadAvailableTime';
import useSocket from './hook/useSocket';
import { useEffect } from 'react';



setupIonicReact();

const App: React.FC = () => {
  const socket = useSocket()

  useEffect(() => {
    socket?.on('message', (msg) => {
    })

    // }
  }, [socket])
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
            <Route path="/resource" render={() => <Resource />} exact={true} />

            <Route path="/tutor" render={() => <Tutor />} exact={true} />
            <Route path="/home" render={() => <Home />} exact={true} />
            <Route path="/shoppingcart" render={() => <ShoppingCart />} exact={true} />
            {/* <Route path="/chatroom/:id" render={() => <InputMessage />} exact={true} /> */}
            <Route path="/chatroom/:id" render={() => <ChatMessage />} exact={true} />
            <Route path="/chatroom" render={() => <Chatroom />} exact={true} />
            <Route path="/login" render={() => <Login />} exact={true} />
            <Route exact path="/facebook-callback"><FacebookCallback></FacebookCallback></Route>
            <Route path="/userprofile" render={() => <UserProfile />} exact={true} />
            <Route path="/userprofilesettings" exact={true} ><UserProfileSettings /></Route>

            <Route path="/ProductList" render={() => <ProductList />} exact={true} />
            <Route path="/ProductPage/:productId" render={() => <ProductPage />} exact={true} />
            <Route path="/EditProduct/:productId" render={() => <EditProduct />} exact={true} />
            <Route path="/PurchasedItem/:productId" render={() => <PurchasedItem />} exact={true} />
            <Route path="/tutorprofile/:teacherId" render={() => <TutorProfile />} exact={true} />

            <Route path="/register" render={() => <Register />} exact={true} />
            <Route path="/purchasehistory" render={() => <PurchaseHistory />} exact={true} />
            <Route path="/uploadhistory/:teacherId" render={() => <UploadHistory />} exact={true} />
            <Route path="/uploadproduct/:teacherId" render={() => <UploadProduct />} exact={true} />
            <Route path="/availabletime/:teacherId" render={() => <UploadAvailableTime />} exact={true} />
            <Route path="/timeslot/:teacherId" render={() => <TimeSlot />} exact={true} />
            <Route path="/privateMessage/:id" render={() => <PrivateMessage />} exact={true} />
            <Route path="/success" render={() => < StripePurchaseSuccessPage />} exact={true} ></Route>
            <Route path="/fail" render={() => < StripePurchaseFailPage />} exact={true} ></Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="resource" href="/resource">
              <IonIcon className="label-bottom" size='large' icon={libraryOutline} />
              <IonLabel>資源</IonLabel>
            </IonTabButton>

            <IonTabButton tab="tutor" href="/tutor" >
              <IonIcon className="label-bottom" size='large' icon={peopleOutline} />
              <IonLabel  >導師</IonLabel>
            </IonTabButton>

            <IonTabButton tab="home" href="/home">
              <IonIcon className="label-bottom" size='large' icon={homeOutline} />
              <IonLabel  >首頁</IonLabel>
            </IonTabButton>

            <IonTabButton tab="shoppingcart" href="/shoppingcart">
              <IonIcon className="label-bottom" size='large' icon={cartOutline} />
              <IonLabel  >購物車</IonLabel>
            </IonTabButton>

            <IonTabButton tab="chatroom" href="/chatroom">
              <IonIcon className="label-bottom" size='large' icon={chatbubblesOutline} />
              <IonLabel>訊息</IonLabel>
            </IonTabButton>

          </IonTabBar>


        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
