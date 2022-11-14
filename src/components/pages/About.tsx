import { memo,FC } from "react";
import {ChangeEvent,useState} from 'react'
import {LoggedInContext} from "../global/LoggedInProvider";



//Customhooks
import {CreateTopics} from "../../hooks/Topics"


export const About:FC = memo(() => {

    

    const [title,setTitle] = useState('')
    const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const [body,setBody] = useState('')
    const changeBody = (e:ChangeEvent<HTMLInputElement>) => {
        setBody(e.target.value)
    }

    const [status,setStatus] = useState('プレイ中')
    const changeStatus = (e:ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value)
    }

    let {postTopics} = CreateTopics(title,body,status);

    const submit = ():void => {
        console.log(title)
        console.log(body)
        console.log(status)
        // CreateTopics({title,body,status})
        postTopics(title,body,status)
        

    }


    return (
        <section >
            アバウトページです
            {/* <button >ボタン</button>
            <div>
                タイトル
                <input onChange={changeTitle}/>
            </div>
            <div>
                本文
                <input onChange={changeBody}/>
            </div>
            <div>
                ステータス
            </div>
            <select onChange={changeStatus}>
                <option value="プレイ中">プレイ中</option>
                <option value="完了！">完了！</option>
            </select>


            <br/>
            タイトル：{title}<br/>
            本文：{body}<br/>
            ステータス：{status}<br/>
            

            <button onClick={submit}>submit</button> */}
        </section>
    )

})