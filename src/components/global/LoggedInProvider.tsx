import React, { useEffect, useState,createContext} from "react";

type AuthInfo = {
    userID:string|number;
}

//ログイン有無
export const LoggedInContext = createContext(false);//valueの初期値はfalse
export const UserNameContext = createContext('ケイン');

//認証情報とセットするコンテキスト
export const LoggedInProvider = (props) => {

    //ここで何r坂の手段でデータあを取得
    const { children } = props;

  
    const isLoggedIn = true;//ここで初期値を書き換える
    console.log('isloggedinの中身')
    console.log(isLoggedIn);
    const LoggedInUserName = 'yourname';
    console.log(LoggedInUserName);


    return (

        <LoggedInContext.Provider value={isLoggedIn}>
            <UserNameContext.Provider value={LoggedInUserName}>
                {children}
            </UserNameContext.Provider>
        </LoggedInContext.Provider>
    )
}