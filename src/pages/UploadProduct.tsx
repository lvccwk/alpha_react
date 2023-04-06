import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import FileUpload from '../components/FileUpload';
import ToolBar from '../components/Toolbar';

const UploadProduct: React.FC = () => {
    return (
      <>
        <IonPage>
          <ToolBar />
          <IonContent>
                <FileUpload />  
          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default UploadProduct;