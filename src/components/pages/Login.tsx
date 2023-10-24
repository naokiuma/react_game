import { ChangeEvent, useState,useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';


import {LoggedInContext} from "provider/LoggedInProvider";
import {LogInUser} from 'infrastructure/authDriver'


type LoginParams = {
    email:string;
    password:string;
}

type LoginInputs = {
	email:string;
    password:string;
}

export const Login = () => {

    //ログイン状態
    const IsLogged = useContext(LoggedInContext);
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
	const [errMsg,setErrMsg] = useState('')
	const navigate = useNavigate();

	

    const { username,setUserName } = useContext(LoggedInContext);
    const { userid,setUserID } = useContext(LoggedInContext);
    const { userAuth,setUserAuth } = useContext(LoggedInContext);
    const { setUseremail } = useContext(LoggedInContext);

	//useformの初期化
	const {
			register,
			handleSubmit,
			formState: { errors }
		} = useForm<LoginInputs>({
	});


	// バリデーション処理がOKの場合に呼ばれる関数
	const isValid = async (data: LoginInputs) => {
		console.log(data);
		await LogInUser(data)
			.then((response)=>{
				console.log('then')
				setUserName(response.data.name);
				setUserID(response.data.user_id);
				setUseremail(response.data.email);
				setUserAuth(true);
				navigate('/')
			})
			.catch((response) => {
				console.log('キャッチ')
				console.log(response)
				setErrMsg('ログインに失敗しました。メールアドレスとパスワードが正しいかご確認下さい。');
			})
	};
	
	// バリデーション処理がNGの場合に呼ばれる関数
	const isInValid = (erros: any) => {
		console.log(errors);
		console.log("Fail Login");
	};
	




    const changeEmail = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const changePassword = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLoginClick = async () => {
        const loginParams:LoginParams = {email,password}
        // console.log('loginします')
        // console.log(loginParams)
        await LogInUser(loginParams)
		.then((response)=>{
			console.log('then')
			setUserName(response.data.name);
			setUserID(response.data.user_id);
			setUseremail(response.data.email);
			setUserAuth(true);
			navigate('/')
		})
		.catch((response) => {
			console.log('キャッチ')
			console.log(response)
			setErrMsg('ログインに失敗しました。メールアドレスとパスワードが正しいかご確認下さい。');
		})

    }


    return(
        <section className="login">
            <h1>
                Login
            </h1>
            {username}
            {userid}
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