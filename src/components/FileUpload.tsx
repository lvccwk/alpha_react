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
  IonToast,
} from "@ionic/react";
import React, { useState } from 'react';
import { FetchUserAllModel, fetchFile, fetchCreateProduct } from '../api/fetchAll';
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query";

function FileUpload() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [product, setProduct] = useState<string | null>(null);
  const [subject, setSubject] = useState<number | null>(null);
  const [info, setInfo] = useState<string>("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleFile = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log("NAME", name);
    console.log("PRICE", price);
    console.log("PRODUCT", product);

    console.log(e.target.files[0])

    if (!name || !price || !product || !subject || !info || !selectedFile) {
      console.error('Please fill in all fields');
      setShowToast(true);
      setToastMessage('密碼不一致!');
      return;

    } else {
      try {
        const obj = {
          name: name,
          price: price,
          info: info,
          product_type: product,
          subject_id: 1,
          teacher_id: 1
        }
        const res = await fetchCreateProduct(obj)



        console.log("FILE", selectedFile);
        await fetchFile(selectedFile);
        console.log('Product uploaded successfully');
      } catch (error) {
        console.log(error);
      }
    }


  };

  return (
    <>
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

            課程/筆記簡介
            <IonInput aria-label="Custom input"
              value={info}
              placeholder="Info"
              onIonChange={(e: any) => { console.log(e); setInfo(e.target.value) }}>

            </IonInput><br />

            <input type="file" onChange={handleFile} /><br /><br />

            <IonButton type="submit">UPLOAD</IonButton>
          </form>
        </IonCardContent>
      </IonCard>

      <IonToast position="top"
        isOpen={showToast}
        message={toastMessage}
        duration={1000}
        onDidDismiss={() => setShowToast(false)}
      />
    </>
  );
}

export default FileUpload;
