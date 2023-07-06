import {ChangeEvent,useState,useContext,memo,FC} from 'react'
import { LoggedInContext } from "../../provider/LoggedInProvider";
import {CommentFormType} from "types/commentsType"
import {createComment} from "../../infrastructure/commentDriver"




export const CommentForm:FC<CommentFormType> = (props) => {
    console.log("コメントフォーム");
    console.log(props);

    
    const { username } = useContext(LoggedInContext);
    const { userid } = useContext(LoggedInContext);

    //モーダル表示フラグ
    let isActive = props.isActive
    let topic_id = props.topic_id
    let user_id = userid;

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


    const submit = async () => {
        let result = await createComment({topic_id,user_id,name,text});
		console.log('結果は２')
		console.log(result)
		props.handleValueChange(result);
        props.toggleModalActive(false);

    }


    return (
        <div className={'modal_wrap ' + (isActive == true ? 'isActive' : '')}>
            <div className="ovarlay" onClick={() =>  props.toggleModalActive(false)}></div>
        
            <div className='modal'>
                <div className="close_btn_wrap">
                    <div className="close_btn" onClick={() => props.toggleModalActive(false)}>
                    </div>
                </div>
                {props.form_title}
                <div className="write_area" >
                    投稿者名<br/>
                    <input onChange={changeName} value={name}/>
                </div>
                <div className="write_area">
                    <textarea onChange={changeBody}/>
                </div>
               
                <button className="submit_btn" onClick={submit}>投稿！</button>
            </div>
        </div>
    )

}