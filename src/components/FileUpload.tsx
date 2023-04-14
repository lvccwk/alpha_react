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
import { useHistory, useParams } from 'react-router-dom';

function FileUpload() {
  const params = useParams()
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [product, setProduct] = useState<string | null>(null);
  const [subject, setSubject] = useState<number | null>(null);
  const [info, setInfo] = useState<string>("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const teacherId = (Number(Object.values(params)[0]))
  const handleFile = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log("NAME", name);
    console.log("PRICE", price);
    console.log("PRODUCT", product);

    // console.log(e.target.files[0])

    if (!name || !price || !product || !subject || !info || !selectedFile) {
      console.error('Please fill in all fields');
      setShowToast(true);
      setToastMessage('資料不能留空');
      return;

    } else {
      try {
        const obj = {
          name: name,
          price: price,
          info: info,
          product_type: product,
          subject_id: subject,
          teacher_id: teacherId,
        }
        console.log('form data:', obj)
        console.log("FILE", selectedFile);
        // await fetchFile(selectedFile);

        console.log('subject_id', subject)
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('name', name);
        formData.append('price', String(price));
        formData.append('info', info);
        formData.append('product_type', product);
        formData.append('subject_id', String(subject));
        formData.append('teacher_id', String(teacherId));

        const res = await fetchCreateProduct(formData)

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
              <IonSelectOption value="note">筆記</IonSelectOption>
            </IonSelect><br />

            選擇科目
            <IonSelect
              value={subject}
              placeholder="Select Subject"
              onIonChange={(e: any) => setSubject(e.detail.value)} >
              <IonSelectOption value="1">中文</IonSelectOption>
              <IonSelectOption value="2">英文</IonSelectOption>
              <IonSelectOption value="3">數學</IonSelectOption>
              <IonSelectOption value="4">經濟</IonSelectOption>
              <IonSelectOption value="5">通識</IonSelectOption>
              <IonSelectOption value="6">生物</IonSelectOption>
              <IonSelectOption value="7">化學</IonSelectOption>
              <IonSelectOption value="8">物理</IonSelectOption>
              <IonSelectOption value="9">地理</IonSelectOption>
              <IonSelectOption value="10">歷史</IonSelectOption>
              <IonSelectOption value="11">中國歷史</IonSelectOption>
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
