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
  const [price, setPrice] = useState<number|null>(null);
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

          課程/筆記名稱
          <IonInput aria-label="Custom input"
            value={name} 
            placeholder="Name"
            onIonChange={(e: any) => { console.log(e); setName(e.target.value) }}>
            
          </IonInput><br />

          價錢
          <IonInput aria-label="Custom input"
            value={price} 
            placeholder="Price ($ HKD)"
            onIonChange={(e: any) => { console.log(e); setPrice(e.target.value) }}>
            
          </IonInput><br />
          
          選擇課程/筆記
          <IonSelect
            value={product}
            placeholder="Select Product Type"
            onIonChange={(e: any) => setProduct(e.detail.value)} >
            <IonSelectOption value="course">課程</IonSelectOption>
            <IonSelectOption value="notes">筆記</IonSelectOption>
          </IonSelect><br />
          
          選擇科目
          <IonSelect
            value={subject}
            placeholder="Select Subject"
            onIonChange={(e: any) => setSubject(e.detail.value)} >
            <IonSelectOption value="Chinese">中文</IonSelectOption>
            <IonSelectOption value="English">英文</IonSelectOption>
            <IonSelectOption value="Mathematics">數學</IonSelectOption>
            <IonSelectOption value="Economics">經濟</IonSelectOption>
            <IonSelectOption value="Liberal Studies">通識</IonSelectOption>
            <IonSelectOption value="Biology">生物</IonSelectOption>
            <IonSelectOption value="Chemistry">化學</IonSelectOption>
            <IonSelectOption value="Physics">物理</IonSelectOption>
            <IonSelectOption value="Geography">地理</IonSelectOption>
            <IonSelectOption value="History">歷史</IonSelectOption>
            <IonSelectOption value="Chinese History">中國歷史</IonSelectOption>
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
