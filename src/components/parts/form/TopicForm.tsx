import { memo,FC,useEffect } from "react";
import {ChangeEvent,useState} from 'react'
import {ImgPreview} from "../../Templates/ImgPreview"


//インフラ
import {CreateTopics} from "../../../Infrastructure/useTopics"



//複数のpropsがある場合はこういう書き方ができる
// type Props ={
//     isActive:boolean
// }

export const TopicForm:FC<{isActive:boolean}> = memo((props) => {
    console.log('formの中');
    console.log(props);





    //モーダル表示フラグ
    let isActive = props.isActive
    //再描写する処理
    // let onEventCallBack = props.onEventCallBack


    //画像
    const [imgData, setImg] = useState(null);
    console.log('画像。')
    console.log(imgData)

    //タイトル
    const [title,setTitle] = useState('')
    const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    //本文
    const [body,setBody] = useState('')
    const changeBody = (e:ChangeEvent<HTMLInputElement>) => {
        setBody(e.target.value)
    }

    //ステータス
    const [status,setStatus] = useState('プレイ中')
    const changeStatus = (e:ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value)
    }


    


    const submit = ():void => {
        console.log('中身一覧！')

        console.log(title)
        console.log(body)
        console.log(status)
        console.log(imgData);
        // postTopics({title,body,status,setTopics,imgData})
        // // onEventCallBack();
        // console.log('完了！')
    }


    return (
            <div className={'modal ' + (isActive == true ? 'isActive' : '')}>
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
                
                <ImgPreview
                    setImage = {setImg}
                    imgData = {imgData}
                />
                <button onClick={submit}>submit</button>
            </div>
    )

})