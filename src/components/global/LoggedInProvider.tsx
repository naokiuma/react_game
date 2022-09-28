import React, { useEffect, useState,createContext,useContext} from "react";

type AuthInfo = {
    userID:string|number;
    userName:string;
}
//次回これみよう
// https://ics.media/entry/200409/


type LoggedInContextType ={
    setUserName: (value: string) => void;
    username: string;
    // useremail: string;
    // setUseremail: (useremail: string) => void;
  }
//ログイン有無のcontextを作成
// export const LoggedInContext = createContext(false);//valueの初期値はfalse
export const LoggedInContext = createContext<LoggedInContextType>({} as LoggedInContextType);



type ContextType = {
    setCount: (value: number) => void;
    count: number;
  }
export const ExampleContext = createContext<ContextType>({} as ContextType);


//認証情報とセットするコンテキスト
export const LoggedInProvider = (props) => {
    const { children } = props;//一般的に、どんなものでも囲えるようにchildrecなpropsにする

    // const GlobalUserInfoontext = useContext(UserInfoContext)
    const isLoggedIn = true;//ここで初期値を書き換える

     // ステートオブジェクト作成
    const [username, setUserName] = useState<string>('default guest name');
    // const [useremail, setUseremail] = useState('default example email');



    return (

        <LoggedInContext.Provider value={{username,setUserName }}>
            {children}
        </LoggedInContext.Provider>
    )
}

export const ExampleProvider = (props) => {
    const { children } = props;//一般的に、どんなものでも囲えるようにchildrecなpropsにする
    const [count, setCount] = useState<number>(0);
  
    return (
      <ExampleContext.Provider value={{count, setCount}}>
        {children}
      </ExampleContext.Provider>
    )
  };
  