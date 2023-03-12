import axios from "axios";
import {useContext} from "react";
import {LoggedInContext} from "../provider/LoggedInProvider";
import {API_BASE_URL,API_SANCTUM_URL} from "../config/url"
import { useNavigate } from "react-router-dom";




export const LogInUser = (loginParams,setUserName,setUserID,setUserAuth,setUseremail) =>{

    const {email,password} = loginParams;

    try{

        const res = axios//csrf保護の初期化
        .get(API_SANCTUM_URL, { withCredentials: true })
        .then((response) => {
            //ログアウト処理
            const res = axios
            .post(
                `${API_BASE_URL}/login`,
                {email,password},
                {withCredentials:true}
                ).then((response) =>{
                    console.log('成功');
                    console.log(response)
                    setUserName(response.data.name);
                    setUserID(response.data.user_id);
                    setUseremail(response.data.email);
                    setUserAuth(true);
                    // ローカルストレージに保存する場合-------------------------------------
                    // ローカルストレージにキーを指定して、それに紐づく値を保存
                    // localStorage.setItem('userName', response.data.name);
                    // localStorage.setItem('userEmail', response.data.email);

                    // window.location.reload();
                        
                })
            })
            return res;
    }catch(e){
        console.log('400 Error!!')
        console.log(e)
    }
}
    

export const LogOutUser = () =>{
    // const { setUserAuth,setUserName } = useContext(LoggedInContext);
    axios//csrf保護の初期化
    .get(API_SANCTUM_URL, { withCredentials: true })
        //ログアウト処理
        const res = axios
        .post(
            `${API_BASE_URL}/logout`,
            {},
            {withCredentials:true}
        )
        return res;
        // .then((response) => {
        //     // setUserAuth(false)
        //     // setUserName('');
        //     console.log(response.data)
        //     return response.data;
        // })
}



