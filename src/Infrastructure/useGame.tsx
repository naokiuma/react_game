import axios from "axios";
import {API_BASE_URL} from "../config/url"
import {useState} from "react";
// import { CategoryType } from "../types/categoryType"


const SearchGame = () => {
  
  const fetchGame = async(keyword:string) => {
    let FetchURL = `${API_BASE_URL}/game/search?game=${keyword}`;
    let target_URL = FetchURL
    const res = await axios.get(target_URL)
    return res.data;
  }

  return {fetchGame}
}




export {SearchGame}

