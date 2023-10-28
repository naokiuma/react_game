import { ChangeEvent, useState,useContext, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';


import {LoggedInContext} from "provider/LoggedInProvider";
import {LogInUser} from 'infrastructure/authDriver'


type LoginParams = {
    email:string;
    password:string;
}


export const Login = () => {

	const navigate = useNavigate();
	
	//バリデーションエラー
	const [errMsg,setErrMsg] = useState('')

    const { userAuth,setUserName,setUserID,setUserAuth } = useContext(LoggedInContext);

	//useformの初期化
	const {
			register,
			handleSubmit,
			formState: { errors }
		} = useForm<LoginParams>({
	});

	if(userAuth){
		navigate('/')
	}


	// バリデーション後、ログイン
	const isValid = async (data: LoginParams) => {
		console.log(data);
		await LogInUser(data)
			.then((response)=>{
				console.log('then')
				setUserName(response.data.name);
				setUserID(response.data.user_id);
				// setUseremail(response.data.email);
				setUserAuth(true);

				//topにリダイレクト todo 前いたページにリダイレクトしたい
				// navigate('/')
			})
			.catch((response) => {
				setErrMsg('ログインに失敗しました。メールアドレスとパスワードが正しいかご確認下さい。');
			})
	};
	
	// バリデーション処理がNGの場合に呼ばれる関数
	const isInValid = (erros: any) => {
		console.log(errors);
		console.log("Fail Login");
	};

    return(
        <section className="login">
            <h1>
                Login
            </h1>
			<form onSubmit={handleSubmit(isValid,isInValid)}>

				<div>
					メールアドレス
					<input {...register('email', { required: 'emailは必須です' })} placeholder="example@example.com"/>
					<p className="_attention_msg">{errors.email?.message}</p>
				</div>
				<div>
					パスワード
					<input {...register('password', { required: 'passwordは必須です' })} placeholder="**********"/>
					<p className="_attention_msg">{errors.password?.message}</p>
				</div>

				<div>
					<button type="submit">LOGIN</button>
				</div>
				{errMsg}
			</form>
        </section>
    )
}