import axios from "axios";
import {API_BASE_URL,API_SANCTUM_URL} from "../config/url"
import { CategoryType } from "../types/categoryType"
import {checkApiUrl} from "../utils/checkApiUrl"

export const GetCategory = async() => {
    try{
        let FetchURL = `${API_BASE_URL}/categories`;
        checkApiUrl(FetchURL)
        const res = await axios.get(FetchURL)
        return res.data;
      }catch(err){
		  return err      
      }

}


// カテゴリー追加時に利用
// export const createCategory = (name:string) => {
//   const target_URL =  `${API_BASE_URL}/categories/create`;
//   const res = axios//csrf保護の初期化
//       .get(API_SANCTUM_URL, { withCredentials: true })
//       .then(() => {
//           axios.post(target_URL,
//               {name: name},
//               {headers:
//                   {'Content-Type': 'multipart/form-data',},//画像を送る際にはこの指定が必要
//                   withCredentials:true,
//               },
//           )
//       })
//       return res;
// }