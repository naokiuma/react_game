import axios from "axios";
import {useState} from "react";
import { TopicsType } from "../types/topicsType"

export const GetTopics = (topic_ID?:number) => {
  let base_URL =  "http://localhost:8888/api/topics";
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

