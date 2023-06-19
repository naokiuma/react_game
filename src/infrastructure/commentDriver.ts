import axios from "axios";
import {API_BASE_URL,API_SANCTUM_URL} from "../config/url"
import { CommentsType } from "../types/commentsType"
import {checkApiUrl} from "../utils/checkApiUrl"



export const getComments = async(topic_ID?:number) => {
    try{
        let FetchURL = `${API_BASE_URL}/comments`;
        let target_URL = topic_ID == undefined ? FetchURL : `${FetchURL}/${topic_ID}`;
        checkApiUrl(target_URL)
        const res = await axios.get<Array<CommentsType>>(target_URL)
        return res.data;
      }catch(e){
        console.log('400 Error!!')
        console.log(e)
      }

}


export const createComment = async (topic_id,user_id,name,text) => {
    const target_URL =  `${API_BASE_URL}/comments/create`;
    checkApiUrl(target_URL)
	// try {
		await axios.get(API_SANCTUM_URL, { withCredentials: true }) // CSRFトークンの初期化
	
		const response = await axios.post(
		  target_URL,
		  { topic_id: topic_id, name: name, text: text, user_id: user_id },
		  {
			headers: {
			  'Content-Type': 'multipart/form-data', // 画像を送る際にはこの指定が必要
			},
			withCredentials: true,
		  }
		);
	
		return response.data; // レスポンスのデータを返す
	//   } catch (error) {
	// 	console.error(error);
	// 	throw new Error('コメントの作成に失敗しました');
	//   }
}

