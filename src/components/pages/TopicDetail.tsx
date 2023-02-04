
import { memo,FC,useContext } from "react";
import { useEffect,useState } from 'react';
import { useLocation } from "react-router-dom";

import {LoggedInContext} from "../global/LoggedInProvider";

//編集用フォーム
import { TopicForm } from "../Molecules/form/TopicForm"

//新規form
import { CommentForm } from "../Molecules/form/CommentForm"

//インフラ
import { GetComments } from "../../Infrastructure/useComments"
import { GetTopics} from "../../Infrastructure/useTopics"



export const TopicDetail:FC = memo(() => {

    //user_id
    const { userid } = useContext(LoggedInContext);
    console.log('userid')
    console.log(userid)

    
    const locationVal = useLocation();
    let tempID = locationVal.pathname
    tempID = tempID.replace('/topics/', '');
    let topic_id = Number(tempID)//topi_id


    //トピック編集用モーダル
    const [EditmodalActive,toggleEditModalActive] = useState(false)


    // コメントデータ取得
    let {fetchComments,comments} = GetComments(topic_id) 
    const {fetchTopics,topics} = GetTopics();
    //コメントフォーム
    const [modalActive,toggleModalActive] = useState(false)

    // console.log('取得コメント');
    // console.log(comments);

    //この記述で初回のみ実行される
    useEffect(() => {
        fetchComments()
        fetchTopics(topic_id)
    },[])

    console.log('初回_fetchtopicsで取得したデータ')
    console.log(topics)

    //左辺がtrueなら右辺を返す。 
    let title = topics[0] && topics[0]['title'];//タイトル
    let body = topics[0] && topics[0]['body'];//本文
    let status = topics[0] && topics[0]['status'];//ステータス

    //背景画像
    let main_img
    if(topics[0] && topics[0]['image_path'] != null){
        let temp_image_path = topics[0]['image_path'];
        main_img = 'http://localhost:8888/' + temp_image_path.replace("public","storage");
    }else{
        main_img = '';
    }

    const tags = ['ホラー','アクション']
    return (
        <section className="topic">
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
                <h2 className="game_title">         
                    タイトル：{title}
                </h2>
                id：{topic_id}

                <div>
                    <p>
                        本文：{body}
                    </p>
                </div>
                

                {/* topicのユーザーidがログイン中urser_idと同じなら編集可能 */}
                {(topics[0] && (topics[0]['parent_user_id'] != userid) ) && 
                    <button onClick={() => toggleEditModalActive(!EditmodalActive)}>記事を編集</button>
                }


                {(main_img !='') &&
                    <div className="_main_img_wrap">
                        <figure>
                            <img src={main_img}  />
                        </figure>
                    </div>
                }
                <div className="tags">
                    {
                        tags.map((tag:string)=>(
                            <span className="tag" key={tag}>
                                {tag}
                            </span>
                        ))
                    }
                </div>
                <div className="status_label mt10">
                    {status}
                </div>
                {/* 一つ一つのコメント */}
                <div className="comments_wrap">
                    {
                        comments.map((comment) => (
                            <div className={'text ' + (topics[0] && comment.user_id === topics[0]['parent_user_id'] ? 'left' : 'right') } key={comment.comment_id}>
                                {comment.text}
                            </div>                                
                        ))
                    }
                </div>
                <CommentForm 
                    form_title ='コメントを投稿'
                    isActive={modalActive} 
                    fetchComments={fetchComments}
                    topic_id={topic_id}
                    toggleModalActive={toggleModalActive}
                />
                <TopicForm
                    form_title='トピックを編集'
                    isActive={EditmodalActive}
                    fetchTopics={fetchTopics}
                    toggleModalActive={toggleEditModalActive}
                    is_edit={{Title:title,Body:body,Status:status}}
                /> 

            </div>
            <div className="new_form_button">
                <button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
            </div>
        </section>
    )

})