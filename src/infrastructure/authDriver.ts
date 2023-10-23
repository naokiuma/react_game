import axios, { AxiosResponse, AxiosError } from "axios";
import {useContext} from "react";
import {LoggedInContext} from "../provider/LoggedInProvider";
import {API_BASE_URL,API_SANCTUM_URL} from "../config/url"
import {checkApiUrl} from "../utils/checkApiUrl"


export const LogInUser = (loginParams) =>{

    const {email,password} = loginParams;
    const FetchURL = `${API_BASE_URL}/login`;
	checkApiUrl(FetchURL);
	axios.get(API_SANCTUM_URL, { withCredentials: true }) // CSRFトークンの初期化
	const response = axios.post(
		`${API_BASE_URL}/login`,
		{email,password},
		{withCredentials:true}	
	)
	return response;

    // try{
    //     checkApiUrl(FetchURL);
	// 	axios.get(API_SANCTUM_URL, { withCredentials: true }) // CSRFトークンの初期化
	// 	const response = axios.post(
	// 		`${API_BASE_URL}/login`,
	// 		{email,password},
	// 		{withCredentials:true}	
	// 	)
	// 	return response;      
    // }catch(e){
    //     console.log('400 Error!!')
    //     console.log(e)
    // }
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



