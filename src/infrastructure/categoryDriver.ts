import axios from "axios";
import {API_BASE_URL} from "../config/url"
import {useState} from "react";
import { CategoryType } from "../types/categoryType"


export const GetCategory = async() => {
    try{
        let FetchURL = `${API_BASE_URL}/categories`;
        let target_URL = FetchURL
        const res = await axios.get(target_URL)
        return res.data;
      }catch(e){
        console.log('400 Error!!')
        console.log(e)
      }

}
