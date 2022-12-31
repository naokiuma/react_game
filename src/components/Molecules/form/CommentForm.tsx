import { memo,FC } from "react";
import {ChangeEvent,useState} from 'react'
import {ImgPreview} from "../../Templates/ImgPreview"


//Customhooks
import {CreateComments} from "../../../Infrastructure/Comments"


//複数のpropsがある場合はこういう書き方ができる
// type Props ={
//     isActive:boolean
// }

export const CommentForm:FC<{isActive:boolean,topic_id:number,toggleModalActive:Function}> = memo((props) => {
    console.log("コメントフォーム");
    console.log(props);
    // let topic_id = props.topic_id;
    // let user_id = props.user_id;


    //モーダル表示フラグ
    let isActive = props.isActive
    let topic_id = props.topic_id
    let user_id = 999

    //画像
    const [imgData, setImg] = useState(null);
    console.log('画像。')
    console.log(imgData)

    //投稿者
    const [name,setName] = useState('')
    const changeName = (e:ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    //本文
    const [text,setBody] = useState('')
    const changeBody = (e:ChangeEvent<HTMLInputElement>) => {
        setBody(e.target.value)
    }

   

    let {postComments} = CreateComments();


    const submit = ():void => {
        postComments(topic_id,name,text,user_id)
    }


    return (
        <div className={'modal_wrap ' + (isActive == true ? 'isActive' : '')}>
            <div className="ovarlay"></div>
        
            <div className='modal'>
                <div className="close_btn_wrap">
                
                    <div className="close_btn" onClick={() => props.toggleModalActive(false)}>
                    </div>
                </div>
                <button >ボタン</button>
                <div>
                    名前
                    <input onChange={changeName}/>
                </div>
                <div>
                    本文
                    <input onChange={changeBody}/>
                </div>
                

                <br/>
                タイトル：{name}<br/>
                本文：{text}<br/>
                
                <ImgPreview
                    setImage = {setImg}
                    imgData = {imgData}
                />
                <button onClick={submit}>submit</button>
            </div>
        </div>
    )

})