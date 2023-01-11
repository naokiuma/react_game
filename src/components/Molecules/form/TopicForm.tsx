import { memo,FC } from "react";
import {ChangeEvent,useState} from 'react'
import {ImgPreview} from "../../Templates/ImgPreview"
import {CreateTopics} from "../../../Infrastructure/useTopics"



export const TopicForm:FC<{form_title:string,isActive:boolean,fetchTopics:Function,toggleModalActive:Function}> = memo((props) => {
    console.log('formの中');

    //モーダル表示フラグ
    let isActive = props.isActive
    const {postTopics} = CreateTopics();//importした関数の場合はこの書き方

    const fetchTopics = props.fetchTopics;//propsで渡した関数の場合はこの書き方


    //タイトル
    const [title,setTitle] = useState('')
    const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    //本文
    const [body,setBody] = useState('')
    const changeBody = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value)
    }

    //ステータス
    const [status,setStatus] = useState('プレイ中')
    const changeStatus = (e:ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value)
    }

     //画像
     const [imgData, setImg] = useState(null);
     console.log('画像。')
     console.log(imgData)


    const submit = ():void => {
        postTopics(title,body,status,fetchTopics,imgData);
        props.toggleModalActive(false);

    }


    return (
        <div className={'modal_wrap ' + (isActive == true ? 'isActive' : '')}>
            <div className="ovarlay" onClick={() =>  props.toggleModalActive(false)}></div>
            <div className='modal'>
                <div className="close_btn_wrap">
                    <div className="close_btn" onClick={() =>  props.toggleModalActive(false)}>
                    </div>
                </div>
                <div>
                    <div className="write_area" >
                        <span className="fw_b">
                            タイトル
                        </span>
                        <br/>
                        <input onChange={changeTitle}/>
                    </div>
                    <select className="write_area" onChange={changeStatus}>
                        <option value="プレイ中">プレイ中</option>
                        <option value="クリア">クリア</option>
                        <option value="やり込み中">やり込み中</option>
                    </select>
                    <div className="write_area" >
                        <textarea onChange={changeBody}/>
                    </div>
                    
                   
                    <div className="write_area">
                        <ImgPreview setImage = {setImg}/>
                    </div>

                    <button className="submit_btn" onClick={submit}>投稿！</button>
                </div>
            </div>
        </div>
    )

})