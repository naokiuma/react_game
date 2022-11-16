import { memo,FC } from "react";
import {ChangeEvent,useState} from 'react'
import {ImgPreview} from "../../organisms/ImgPreview"


//Customhooks
import {CreateTopics} from "../../../hooks/Topics"


//複数のpropsがある場合はこういう書き方ができる
// type Props ={
//     isActive:boolean
// }

export const TopicForm:FC<{isActive:boolean}> = memo((props) => {
    console.log(props);
    const [imgData, setImg] = useState(null);
    console.log('画像。')
    console.log(imgData)


    let isActive = props.isActive

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
        console.log('この時点ではある？')
        console.log(title)
        console.log(body)
        console.log(status)
        console.log(imgData);
        // const formdata = new FormData();
        // formdata.append('upload_file', imgData)
        // const formData = new FormData();
        // formData.append('item_image_file', imgData);
    

        postTopics(title,body,status,imgData)
    }


    return (
        // <div>

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