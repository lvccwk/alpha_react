import React, { useEffect } from "react"
import { facebookLogin } from "../api/fetch";
import { useDispatch } from "react-redux"
import { useAppSelector } from "../redux/store";
import { fbLogin } from "../redux/userSlice";
import { useHistory } from "react-router";

export function FacebookCallback() {
    const history = useHistory()
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const code = searchParams.get('code') || ""; //
        (async function () {
            const data = await facebookLogin(code)
            if (data) {
                dispatch(fbLogin({token: data.token}))
            } else {
                // Error handling with React-Toastify
            }
        })()
    }, [])
    if(isLoggedIn){
         history.push("/home")
    }
    return <h3>Redirecting to main page...</h3>
}