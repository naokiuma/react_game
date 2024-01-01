import  {useState,createContext,useEffect} from "react";
import {LogInCheck} from 'infrastructure/authDriver'

type LoggedInContextType ={
    setUserAuth:(value:boolean) => void;
    setUserName: (value: string) => void;
    setUserID: (value: number) => void;
    setUseremail: (value: string) => void;
    userAuth:boolean;
    userid: number;
    username: string;
    useremail: string;
}
  
//ログイン有無のcontextを作成
export const LoggedInContext = createContext<LoggedInContextType>({} as LoggedInContextType);


//認証情報とセットするコンテキスト
export const LoggedInProvider = (props) => {
    const { children } = props;//一般的に、どんなものでも囲えるようにchildrecなpropsにする

     // 全体のステートオブジェクト、デフォルトの値を作成
     const [username, setUserName] = useState<string>('');
     const [userid, setUserID] = useState<number>(0);     
     const [useremail, setUseremail] = useState<string>('');
     const [userAuth, setUserAuth] = useState<boolean>(false);//ログイン有無

	useEffect(()=>{
		LogInCheck().
			then((res) => {
				setUserName(res.data.name);
				setUserID(res.data.user_id);
				setUseremail(res.data.email);
				setUserAuth(true);
			})
			.catch(()=>{
				// console.log('エラー')
			})

	},[])

    return (
        <LoggedInContext.Provider value={{username,setUserName,userid,setUserID,useremail,setUseremail,userAuth,setUserAuth}}>
            {children}
        </LoggedInContext.Provider>
    )
}
