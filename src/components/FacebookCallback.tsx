import React, { useEffect } from "react"
import { facebookLogin } from "../api/fetch";
// import { useAppDispatch } from "react-import"





export function FacebookCallback() {
    // const dispatch = useAppDispatch()
    // const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const code = searchParams.get('code') || "";
        (async function () {
            const data = await facebookLogin(code)
            if (data) {
                // dispatch(login(data.username))
            } else {
                // Error handling with React-Toastify
            }
        })()
    }, [])
    // if(isAuthenticated){
    //     return <Navigate to="/" replace/>
    // }
    return <h3>Redirecting to main page...</h3>
}