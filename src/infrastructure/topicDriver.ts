import axios from "axios";
import {API_BASE_URL,API_SANCTUM_URL} from "../config/url"

import { TopicType } from "../domain/topic";



export const createTopics = (title,body,status,imgData?) => {
    const target_URL =  `${API_BASE_URL}/topics/create`;
    const res = axios//csrf保護の初期化
        .get(API_SANCTUM_URL, { withCredentials: true })
        .then(() => {
            axios.post(target_URL,
                {title: title,body: body,status: status,file:imgData},
                {headers:
                    {'Content-Type': 'multipart/form-data',},//画像を送る際にはこの指定が必要
                    withCredentials:true,
                },
            ).then(()=>{
                window.location.reload();
            })
        })
        return res;
}


export const getTopics = async(topic_ID?:number) => {
    try{
        let FetchURL = `${API_BASE_URL}/topics`;
        let target_URL = topic_ID == undefined ? FetchURL : `${FetchURL}/${topic_ID}`;
        const res = await axios.get(target_URL)
        console.log('gettopicsの中');
        console.log(res.data)

        return res.data;
      }catch(e){
        console.log('400 Error!!')
        console.log(e)
      }

}
