import axios from "axios";
import {API_BASE_URL} from "./config"
import {useState} from "react";
import { TopicsType } from "../types/topicsType"


const GetTopics = (topic_ID?:number) => {
  let base_URL =  `${API_BASE_URL}/topics`;
  let target_URL = topic_ID == undefined ? base_URL : `${base_URL}/${topic_ID}`;


  const [topics,setTopics] = useState<Array<TopicsType>>([]);
  const fetchTopics = () => {
    axios
    .get(target_URL)
    .then((res) => {
      console.log('getTopics')
      setTopics(res.data);
    })
    }

    return {fetchTopics,topics}
}



const CreateTopics = (title,body,status) => {
  let target_URL =  `${API_BASE_URL}/topics/create`;


  const postTopics = (title,body,status) => {
    console.log('postTopics動いてる？')
    axios//csrf保護の初期化
      .get('http://localhost:8888/sanctum/csrf-cookie', { withCredentials: true })
      .then((response) => {

        axios
        .post(
          target_URL,
          {title: title,body: body,status: status},
          {withCredentials:true}
          )
          .then((res) => {
            console.log('createTopics')
            console.log(res)
          })
        
      })

  }
  return {postTopics}
}



export {GetTopics,CreateTopics}
