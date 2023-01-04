import {ChangeEvent,useState,useContext,memo,FC} from 'react'
import {ImgPreview} from "../../Templates/ImgPreview"
import { LoggedInContext } from "../../global/LoggedInProvider";



//Customhooks
import {CreateComments} from "../../../Infrastructure/useComments"


//複数のpropsがある場合はこういう書き方ができる
// type Props ={
//     isActive:boolean
// }

export const CommentForm:FC<{isActive:boolean,topic_id:number,toggleModalActive:Function,fetchComments:Function}> = memo((props) => {
    console.log("コメントフォーム");
    console.log(props);

    
    const { username } = useContext(LoggedInContext);
    const { userid } = useContext(LoggedInContext);

    //モーダル表示フラグ
    let isActive = props.isActive
    let topic_id = props.topic_id
    let user_id = userid;

   


    const fetchComments = props.fetchComments;//propsで渡した関数の場合はこの書き方

    //画像
    const [imgData, setImg] = useState(null);
    console.log('画像。')
    console.log(imgData)

    //投稿者
    const [name,setName] = useState(username)
    const changeName = (e:ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    //本文
    const [text,setBody] = useState('')
    const changeBody = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value)
    }

   

    let {postComments} = CreateComments();


    const submit = ():void => {
        postComments(topic_id,user_id,name,text,fetchComments,imgData);
        props.toggleModalActive(false);

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
                    <input onChange={changeName} value={name}/>
                </div>
                <div>
                    本文
                    <textarea onChange={changeBody}/>
                </div>
                

                <br/>
                名前：{name}<br/>
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