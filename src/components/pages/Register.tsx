import axios from 'axios'
import {API_BASE_URL,API_SANCTUM_URL} from "config/url"
import { ChangeEvent, useState,useContext} from 'react'
import {useNavigate } from "react-router-dom";
import {LoggedInUserContext} from "provider/LoggedInUserProvider";
import { useForm } from 'react-hook-form';


type RegisterParams = {
	username:string;
	email:string;
	password:string;
}

export const Register = () => {
	const navigate = useNavigate();

	//バリデーションエラー
	const [errMsg,setErrMsg] = useState('')
	const { setUserInfo,userInfo } = useContext(LoggedInUserContext);

	//すでにログイン済みならtopへ。
	if(userInfo.auth){
		navigate('/')
	}

	const {
		register,
		handleSubmit,
		formState:{errors}
	} = useForm<RegisterParams>();


	//バリデーションNG
	const isInValid = (erros: any) => {
		console.log(errors);
		console.log("Fail Regist");
	};

	// バリデーション後OK
	const isValid = async (data: RegisterParams) => {
		axios//csrf保護の初期化
		.get(API_SANCTUM_URL, { withCredentials: true })
		.then((response) => {
			//ログイン処理
			axios
			.post(
				API_BASE_URL + '/register',
				data,
				{withCredentials:true}
			)
			.then((response) => {
				if(response.data.result){
					setUserInfo({
						name:response.data.name,
						user_id:response.data.id,
						email:response.data.email,
						auth:true
					})
				}else{
					setErrMsg(response.data.msg)
				}
			})
	})

	};


	return(
		<section className="basic_form">
			<h1>
				ユーザー登録
			</h1>
			<form onSubmit={handleSubmit(isValid,isInValid)}>

				<dl>
					<dt>お名前</dt>
					<dd>
						<input {...register('username', { required: 'お名前は必須です' })} placeholder="ななし"/>
						<p className="_attention_msg">{errors.username?.message}</p>				
					</dd>
				</dl>
				<dl>
					<dt>メールアドレス</dt>
					<dd>
						<input {...register('email', { required: 'emailは必須です' })} placeholder="example@example.com"/>
						<p className="_attention_msg">{errors.email?.message}</p>				
					</dd>
				</dl>
				<dl>
					<dt>パスワード</dt>
					<dd>
						<input {...register('password', { required: 'passwordは必須です' })} placeholder="**********"/>
						<p className="_attention_msg">{errors.password?.message}</p>
					</dd>
				</dl>
			
				<div className="_btn_wrap">
					<button type="submit">登録</button>
				</div>
				{errMsg}
			</form>

		</section>
	)
}