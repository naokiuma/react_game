import axios from "axios";
import {API_BASE_URL} from "../config/url"
import {useState} from "react";
import { CategoryType } from "../types/categoryType"


const search = (title:string) => {
  let FetchURL = `${API_BASE_URL}/game/search?game=${title}`;
  let target_URL = FetchURL;

  const fetchGame = () => {
    axios
      .get(target_URL)
      .then((res) => {
        console.log(res.data);
        return res.data
      })
  }

  return {fetchGame}
}




export {search}

