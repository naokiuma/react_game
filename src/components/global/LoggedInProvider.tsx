import  {useState,createContext} from "react";


type LoggedInContextType ={
    setUserAuth:(value:boolean) => void;
    userAuth:boolean;
    setUserName: (value: string) => void;
    username: string;
    setUserID: (value: number) => void;
    userid: number;
    setUseremail: (value: string) => void;
    useremail: string;
  }
  
//ログイン有無のcontextを作成
// export const LoggedInContext = createContext(false);//valueの初期値はfalse
export const LoggedInContext = createContext<LoggedInContextType>({} as LoggedInContextType);


//認証情報とセットするコンテキスト
export const LoggedInProvider = (props) => {
    const { children } = props;//一般的に、どんなものでも囲えるようにchildrecなpropsにする

     // 全体のステートオブジェクト、デフォルトの値を作成
     const [username, setUserName] = useState<string>('ゲスト');
     const [userid, setUserID] = useState<number>(0);     
     const [useremail, setUseremail] = useState<string>('');
     const [userAuth, setUserAuth] = useState<boolean>(false);//ログイン有無

    return (
        <LoggedInContext.Provider value={{username,setUserName,userid,setUserID,useremail,setUseremail,userAuth,setUserAuth}}>
            {children}
        </LoggedInContext.Provider>
    )
}

