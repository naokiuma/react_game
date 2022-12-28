import { Outlet,Navigate,useNavigate,useLocation } from "react-router-dom";
import { useContext} from 'react'
import { LoggedInContext} from "../components/global/LoggedInProvider";


/**
 * 
 * ログインユーザーのみアクセス可能
 */
export const PrivateRoute = () => {
    const { userAuth } = useContext(LoggedInContext);
    const location = useLocation();
    console.log('userAuth')
    console.log(userAuth)

    // console.log(location.pathname)

    // const navigate = useNavigate()
    //https://zenn.dev/horisan/articles/2aeaf0bd3fb70f この方法でも取れる


    if(userAuth){
      return(
        <>
        outletだよ
         <Outlet/>
        </>
      )
    }else{
      return <Navigate to="/login/" state={{url: location.pathname }} replace/>
    }
  
  };