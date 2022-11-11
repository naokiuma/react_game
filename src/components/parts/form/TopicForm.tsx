import { memo,FC } from "react";
import {ChangeEvent,useState} from 'react'
import {ImgPreview} from "../../organisms/ImgPreview"


//Customhooks
import {CreateTopics} from "../../../hooks/Topics"

export const TopicForm:FC = memo(() => {

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
        postTopics(title,body,status)
    }


    return (
        <section >
            <button >ボタン</button>
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
                <option value="クリア">クリア</option>
                <option value="やり込み中">やり込み中</option>

            </select>

            <br/>
            タイトル：{title}<br/>
            本文：{body}<br/>
            ステータス：{status}<br/>
            
            <ImgPreview/>
            <button onClick={submit}>submit</button>
        </section>
    )

})