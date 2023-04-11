import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from 'react';
import { fetchFile, fetchCreateProduct } from '../api/fetchAll';
import { useMutation, useQuery } from "@tanstack/react-query";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // const fetchCreateItem = useMutation(fetchCreateProduct, {
  //   onSuccess(data, variables, context) {
  //     refetch();
  //   },
  //   onError: (error) => {
  //     console.error("Failed to create product: ", error);
  //   },
  // });

  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0])
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // TODO: Handle file upload
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }
    try {
      console.log(selectedFile);
      await fetchFile(selectedFile);
      console.log('File uploaded successfully');
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <IonCard>
      <IonCardContent>
        <form onSubmit={handleSubmit}>
          <IonInput />
          <IonInput />
          <IonInput />
          <input type="file" onChange={handleFileInput} />

          <button type="submit">UPLOAD</button>
        </form>
      </IonCardContent>
    </IonCard>
  );
}

export default FileUpload;
