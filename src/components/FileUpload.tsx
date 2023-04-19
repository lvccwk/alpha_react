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
  IonLoading,
  IonAlert,
} from "@ionic/react";
import React, { useState } from 'react';
import { FetchUserAllModel, fetchFile, fetchCreateProduct } from '../api/fetchAll';
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useHistory, useParams } from 'react-router-dom';

function FileUpload() {
  const params = useParams()
  const history = useHistory();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [product, setProduct] = useState<string | null>(null);
  const [subject, setSubject] = useState<number | null>(null);
  const [info, setInfo] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const teacherId = (Number(Object.values(params)[0]))
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleFile = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImage = (e: any) => {
    setSelectedImage(e.target.files[0]);
  };

  const onClickBackProfilePage = () => {
    history.push(`/userprofile`);
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || !price || !product || !subject || !info || !selectedFile || !selectedImage) {
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
          teacher_id: teacherId
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('name', name);
        formData.append('price', String(price));
        formData.append('info', info);
        formData.append('product_type', product);
        formData.append('subject_id', String(subject));
        formData.append('teacher_id', String(teacherId));
        formData.append('image', selectedImage);
        setShowLoading(true);
        const res = await fetchCreateProduct(formData)
        if (res.ok) {
          // setToastMessage('你的資料已成功上傳');
          setShowLoading(false);
        }
        setShowAlert(true);
        setShowLoading(false);
        console.log('Product uploaded successfully');
      } catch (error) {
        console.log(error);
        setShowLoading(false);
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

            價錢 `$ HKD`
            <IonInput aria-label="Custom input"
              value={price}
              placeholder="Price ($ HKD)"
              onIonChange={(e: any) => { console.log(e); setPrice(e.target.value) }}>

            </IonInput><br />

            課程/筆記簡介
            <IonInput aria-label="Custom input"
              value={info}
              placeholder="Info"
              onIonChange={(e: any) => { console.log(e); setInfo(e.target.value) }}>

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


            課程/筆記圖片
            <input type="file" onChange={handleImage} /><br /><br />
            課程/筆記檔案
            <input type="file" onChange={handleFile} /><br /><br />

            <IonButton type="submit">UPLOAD</IonButton><br></br>
            <IonButton onClick={onClickBackProfilePage}>返回上一頁</IonButton>
            <IonLoading
              isOpen={showLoading}
              message={'上傳中..'}
              duration={0}
            />
            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              header={'上傳成功!'}
              message={'你的資料已上傳成功'}
              buttons={['返回上一頁!']}
              onClick={onClickBackProfilePage}
            />
          </form>
        </IonCardContent>
      </IonCard>

      <IonToast position="top"
        isOpen={showToast}
        message={toastMessage}
        duration={3000}
        onDidDismiss={() => setShowToast(false)}
      />
    </>
  );
}

export default FileUpload;
