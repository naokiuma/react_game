import  {useState,createContext,useEffect} from "react";
import {LogInCheck} from 'infrastructure/authDriver'

type UserInfoType = {
	name:string;
	user_id:number,
	email:string,
	auth:boolean
}

type LoggedInUserType ={
	setUserInfo:React.Dispatch<React.SetStateAction<UserInfoType>>;
	userInfo:UserInfoType
}

//ログイン有無のcontextを作成
export const LoggedInUserContext = createContext<LoggedInUserType>({} as LoggedInUserType);


//認証情報とセットするコンテキスト
export const LoggedInUserProvider = (props) => {
    const { children } = props;


	const [userInfo,setUserInfo] = useState({
		name:'',
		user_id:0,
		email:'',
		auth:false
	})

	useEffect(()=>{
		LogInCheck().
			then((res) => {
				// console.log('初回処理')
				// console.log(res)
				setUserInfo({
					name:res.data.name,
					user_id:res.data.id,
					email:res.data.email,
					auth:true
				});
				console.log(res.data)
				console.log('それぞれの情報');
				console.log(userInfo);

			})
			.catch(()=>{
				// console.log('エラー')
			})

	},[])


    return (
		<LoggedInUserContext.Provider value={{userInfo,setUserInfo}}>
			{children}
		</LoggedInUserContext.Provider>
    )
}



