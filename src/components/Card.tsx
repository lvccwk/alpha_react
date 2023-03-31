import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import './Card.css';
import { useQuery } from '@tanstack/react-query';
import { fetchCart } from '../api/fetchAll';
import AddToCartBtn from './AddToCartBtn';



// function Card() {
//     const { data, isLoading, error, refetch } = useQuery({
//         queryKey: ["user"],
//         queryFn: () => fetchCart(1), //redux login state
//     });

//     return (
//         <IonCard>
//             <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
//             <IonCardHeader>
//                 <IonCardTitle>$card  </IonCardTitle>
//                 <IonCardTitle>$card <IonCardSubtitle>$card  </IonCardSubtitle> </IonCardTitle>
//             </IonCardHeader>
//             <IonCardContent>
//                 <AddToCartBtn />
//             </IonCardContent>
//         </IonCard>
//     );
// }
// export default Card;