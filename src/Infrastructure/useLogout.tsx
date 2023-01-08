import axios from "axios";
import {useContext} from "react";
import {LoggedInContext} from "../components/global/LoggedInProvider";

export const Logout = () => {

    const { setUserAuth,setUserName } = useContext(LoggedInContext);

    const useLogout = () =>{
        axios//csrf保護の初期化
        .get('http://localhost:8888/sanctum/csrf-cookie', { withCredentials: true })
        .then((response) => {
            //ログアウト処理
            axios
            .post(
                'http://localhost:8888/api/logout',
                {},
                {withCredentials:true}
            )
            .then((response) => {
            console.log(response);
            setUserAuth(false)
            setUserName('');
            })
        })
    }

    return useLogout
}

