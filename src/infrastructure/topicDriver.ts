import axios from "axios";
import {API_BASE_URL,API_SANCTUM_URL} from "../config/url"
import {checkApiUrl} from "../utils/checkApiUrl"


export const getTopics = async(topic_ID?:number,limit?:number) => {
    try{
        let FetchURL = `${API_BASE_URL}/topics`;
        let target_URL = topic_ID == undefined ? FetchURL : `${FetchURL}/${topic_ID}`;
        checkApiUrl(target_URL)

        const res = await axios.get(target_URL)
        return res.data;
      }catch(e){
        console.log('400 Error!!')
        console.log(e)
      }
}


export const createTopic = (game_id,title,body,status,imgData?) => {
    const target_URL =  `${API_BASE_URL}/topics/create`;
    checkApiUrl(target_URL);
    const res = axios//csrf保護の初期化
        .get(API_SANCTUM_URL, { withCredentials: true })
        .then(() => {
            axios.post(target_URL,
                {game_id: game_id,title: title,body: body,status: status,file:imgData},
                {headers:
                    {'Content-Type': 'multipart/form-data',},//画像を送る際にはこの指定が必要
                    withCredentials:true,
                },
            ).then(()=>{
                // window.location.reload();
            })
        })
        return res;
}
