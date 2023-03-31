import { Redirect, Route } from "react-router-dom";
import { useAppSelector } from "../redux/store";
// import { LoginPage } from "../components/Login"
// export default function PrivateRoute() {
//     const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)
//     const render = () => {
//         if (isLoggedIn) {
//             return <Route render={() => <LoginPage/>}></Route>
//         } else {
//             return <Redirect to={"/login"} />;
//         }
//     }
//     return render()

// }