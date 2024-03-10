import { useState,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { LoggedInUserContext } from "provider/LoggedInUserProvider";
import { LogInUser } from 'infrastructure/authDriver'


type LoginParams = {
    email:string;
    password:string;
}


export const Login = () => {
	const navigate = useNavigate();
	
	//バリデーションエラー
	const [errMsg,setErrMsg] = useState('')
    const { userInfo,setUserInfo } = useContext(LoggedInUserContext);

	//すでにログイン済みならtopへ。
	if(userInfo.auth){
		navigate('/')
	}

	//useformの初期化
	const {
			register,
			handleSubmit,
			formState: { errors }
		} = useForm<LoginParams>({
	});

	//バリデーションNG
	const isInValid = (erros: any) => {
		console.log(errors);
		console.log("Fail Login");
	};

	//バリデーションOK
	const isValid = async (data: LoginParams) => {
		await LogInUser(data)
			.then((response)=>{
				setUserInfo({
					name:response.data.name,
					user_id:response.data.id,
					email:response.data.email,
					auth:true
				})
				//topにリダイレクト todo 前いたページにリダイレクトしたい
				// navigate('/')
			})
			.catch((response) => {
				setErrMsg('ログインに失敗しました。メールアドレスとパスワードが正しいかご確認下さい。');
			})
	};

    return(
        <section className="basic_form">
            <h1>
                Login
            </h1>
			<form onSubmit={handleSubmit(isValid,isInValid)}>
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
				<div className='_btn_wrap'>
					<button type="submit">ログイン</button>
				</div>
				{errMsg}
			</form>
        </section>
    )
}