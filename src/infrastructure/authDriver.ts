import axios, { AxiosResponse } from "axios";
import {useContext} from "react";
import {LoggedInContext} from "../provider/LoggedInProvider";
import {API_BASE_URL,API_SANCTUM_URL} from "../config/url"
import {checkApiUrl} from "../utils/checkApiUrl"


/**
 * ブラウザリロード時に利用。
 */
export const LogInCheck = ():Promise<AxiosResponse> =>{
    const FetchURL = `${API_BASE_URL}/user`;
	checkApiUrl(FetchURL);
	axios.get(API_SANCTUM_URL, { withCredentials: true }) // CSRFトークンの初期化
	const response = axios.get(
		`${API_BASE_URL}/user`,
		{withCredentials:true}	
	)
	return response;
}


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
}
    

export const LogOutUser = () :Promise<AxiosResponse<boolean, any>>=>{

    axios//csrf保護の初期化
    .get(API_SANCTUM_URL, { withCredentials: true })
	//ログアウト処理
	const res = axios
	.post(
		`${API_BASE_URL}/logout`,
		{},
		{withCredentials:true}
	)
	return res		
}



