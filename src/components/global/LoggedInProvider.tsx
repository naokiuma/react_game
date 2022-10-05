import React, { useEffect, useState,createContext,useContext} from "react";



type LoggedInContextType ={
    setUserName: (value: string) => void;
    username: string;
    setUseremail: (value: string) => void;
    useremail: string;
  }
//ログイン有無のcontextを作成
// export const LoggedInContext = createContext(false);//valueの初期値はfalse
export const LoggedInContext = createContext<LoggedInContextType>({} as LoggedInContextType);





//認証情報とセットするコンテキスト
export const LoggedInProvider = (props) => {
    const { children } = props;//一般的に、どんなものでも囲えるようにchildrecなpropsにする

    // const GlobalUserInfoontext = useContext(UserInfoContext)
    const isLoggedIn = true;//ここで初期値を書き換える

     // ステートオブジェクト作成
    const [username, setUserName] = useState<string>('');
    const [useremail, setUseremail] = useState<string>('');



    return (

        <LoggedInContext.Provider value={{username,setUserName,useremail,setUseremail }}>
            {children}
        </LoggedInContext.Provider>
    )
}

// export const ExampleProvider = (props) => {
//     const { children } = props;//一般的に、どんなものでも囲えるようにchildrecなpropsにする
//     const [count, setCount] = useState<number>(0);
  
//     return (
//       <ExampleContext.Provider value={{count, setCount}}>
//         {children}
//       </ExampleContext.Provider>
//     )
//   };
  