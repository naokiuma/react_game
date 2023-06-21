
import { memo,FC,useContext } from "react";
import { useEffect,useState } from 'react';
import { useLocation } from "react-router-dom";
import {getidfromURL} from '../../utils/getidfromURL'
import {CommentsType} from "types/commentsType"



import {LoggedInContext} from "../../provider/LoggedInProvider";

//新規form
import { CommentForm } from "../Molecules/form/CommentForm"

//インフラ
import {getComments} from "../../infrastructure/commentDriver";
import {GetTopics} from "../../infrastructure/topicDriver";



export const TopicDetail:FC = memo(() => {

    const [topic,setTopic] = useState([]);
    const [comments,setComment] = useState<CommentsType[]>([])
	const handleValueChange = (newValue) =>{
		setComment([...comments,newValue])
	}
    
    //user_id
    const { userid } = useContext(LoggedInContext);
    console.log('userid')
    console.log(userid)

    //topic_id
    const locationVal = useLocation();
    let thisURL = locationVal.pathname
    console.log(thisURL)

    
    // let topic_id = Number(thisURL.replace('/topic/', ''))//topic_id
    let topic_id = getidfromURL(thisURL,'topic');


    //トピック編集用モーダル
    const [EditmodalActive,toggleEditModalActive] = useState(false)
    const [modalActive,toggleModalActive] = useState(false)
    

    useEffect(() => {
        GetTopics(topic_id).then((data) => {
            setTopic(data)
        })
        getComments(topic_id).then((data) => {
			console.log('ここでのデータ')
			console.log(data)
            setComment(data);
        });
    },[])


    //左辺がtrueなら右辺を返す。 
    let title = topic[0] && topic[0]['title'];//タイトル
    let body = topic[0] && topic[0]['body'];//本文
    let status = topic[0] && topic[0]['status'];//ステータス



    //背景画像
    let main_img;
    if(topic[0] && topic[0]['image_path'] != null){
        let temp_image_path = topic[0]['image_path'];
        main_img = 'http://localhost:8888/' + temp_image_path.replace("public","storage");
    }else{
        main_img = '';
    }

    const tags = ['ローグライク','泣ける']

    
    return (
        <section className="topic_detail">
            <div className="billboard"
                style={{ 
                backgroundImage: `url(${main_img})`
                }}
            >
                <div className="billboard_inner">
                    <h1 className="topic_title">{title}</h1>
                </div>
            </div>
           
            <div className="main_contents">
                <h2 className="topic_title">         
                    {title}
                </h2>
                <div className="tags">
                    {
                        tags.map((tag:string)=>(
                            <span className="tag" key={tag}>
                                {tag}
                            </span>
                        ))
                    }
                </div>

                <div className="main_text">
                    <p>{body}</p>
                </div>
                

                {/* topicのユーザーidがログイン中urser_idと同じなら編集可能 */}
                {(topic[0] && (topic[0]['parent_user_id'] != userid) ) && 
                    <button onClick={() => toggleEditModalActive(!EditmodalActive)}>記事を編集</button>
                }


                {(main_img !='') &&
                    <div className="_main_img_wrap">
                        <figure>
                            <img src={main_img}  />
                        </figure>
                    </div>
                }
              
                <div className="status_label mt10">
                    {status}
                </div>
                {/* 一つ一つのコメント */}
                <div className="comments_wrap">
                    {
                        comments.map((comment) => (
                            <div className={'text ' + (topic[0] && comment.user_id === topic[0]['parent_user_id'] ? 'left' : 'right') }
							 key={comment.comment_id}>
                                {comment.text}
                            </div>                                
                        ))
                    }
                </div>
                <CommentForm 
                    form_title ='コメントを投稿'
                    isActive={modalActive} 
                    topic_id={topic_id}
                    toggleModalActive={toggleModalActive}
					handleValueChange ={handleValueChange}
                />

            </div>
            <div className="new_form_button">
                <button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
            </div>
        </section>
    )

})