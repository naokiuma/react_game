import { Outlet,Navigate,useNavigate,useLocation } from "react-router-dom";
import { useContext} from 'react'
import {LoggedInUserContext} from "provider/LoggedInUserProvider";



/**
 * 
 * ログインユーザーのみアクセス可能
 */
export const PrivateRoute = () => {
    const { userInfo } = useContext(LoggedInUserContext);
    const location = useLocation();

    // const navigate = useNavigate()
    //https://zenn.dev/horisan/articles/2aeaf0bd3fb70f この方法でも取れる


    if(userInfo.auth){
      return(
        <>
         <Outlet/>
        </>
      )
    }else{
      return <Navigate to="/login/" state={{url: location.pathname }} replace/>
    }
  
};