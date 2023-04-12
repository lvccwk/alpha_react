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
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useState } from 'react';
import { FetchUserAllModel, fetchFile, fetchCreateProduct } from '../api/fetchAll';
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query";

function FileUpload() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [product, setProduct] = useState<string>("");
  const [subject, setSubject] = useState<string>("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const handleCreateProduct = (e: any) => {
    setSelectedFile(e.target.files[0]);
    const formData = new FormData();
    console.log(e.target.files[0])
  };

  const onSubmit = async (e: any) => {
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
        <form onSubmit={onSubmit}>
          <IonInput placeholder="Name" /><br />
          <IonInput placeholder="Price ($ HKD)"/><br />
          <IonSelect
            value={product}
            placeholder="Select Product Type"
            onIonChange={(e: any) => setProduct(e.detail.value)} >
            <IonSelectOption value="course">課程</IonSelectOption>
            <IonSelectOption value="notes">筆記</IonSelectOption>
          </IonSelect><br />
          
          <input type="file" onChange={handleCreateProduct} />
          <br />
          <button type="submit">UPLOAD</button>
        </form>
      </IonCardContent>
    </IonCard>
  );
}

export default FileUpload;
