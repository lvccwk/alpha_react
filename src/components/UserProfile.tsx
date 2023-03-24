
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
//import { UserState } from "../redux/userSlice";
import { IRootState } from "../redux/store";

import {
  fetchUser,
} from "../api/fetchUser";


export default function UserProfile() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
  //const [user, setUser] = useState();

  
  if (isLoading || !data) {
    return <div>Loading...</div>
  } else {
    //if (error) return <div>Error: {error.message}</div>;
    return (
      <div>
        <div>Profile</div>
        <div>{data.image}/</div>
        <div>{data.username}/</div>
        <div>{data.user_type}/</div>
        <div>{data.email}/</div>
        <div>Delete Account Button</div>
      </div>
    );
  }

}