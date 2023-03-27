import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import {
  FetchUserModel,
  fetchUser,
  fetchUpdateUser,

} from "../api/fetchUser";

interface UserProfileProps {
  user: FetchUserModel;
  refetchTodo: () => void;
}

export default function EditUserProfile(props: UserProfileProps) {
  const [username, setUsername] = useState<string>(props.user.username || "");
  const [password, setPassword] = useState<string>(props.user.password);
  const [email, setEmail] = useState<string>(props.user.email);

  const fetchUpdateItem = useMutation(fetchUpdateUser, {
    onSuccess(data, variables, context) {
      props.refetchTodo();
    },
  });

  const onUpdate = () => {
    const obj: {
      username: string;
      password: string;
      email: string;
    } = {
      username: username,
      password: password,
      email: email,
    }

    fetchUpdateItem.mutate(obj);
  };



  return (

    <div>
      Profile Settings
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonInput
              value={username}
              onIonChange={(e) => setUsername(String(e.target.value))}
            ></IonInput>
            <IonInput
              value={password}
              onIonChange={(e) => setPassword(String(e.target.value))}
            ></IonInput>
            <IonInput
              value={email}
              onIonChange={(e) => setEmail(String(e.target.value))}
            ></IonInput>
          </IonCol>
          <IonCol>
            <IonButton onClick={onUpdate}>Update</IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  )
}