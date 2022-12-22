
import { memo,FC } from "react";
import { useEffect,useState } from 'react';
import { useLocation } from "react-router-dom";

//新規form
import { CommentForm } from "../parts/form/CommentForm"


//インフラ
import { GetComments } from "../../Infrastructure/Comments"


export const TopicPage:FC = memo(() => {
    const locationVal = useLocation().state;
    console.log("locationの中身")
    console.log(locationVal)

    let {fetchComments,comments} = GetComments(locationVal['id']) 

    const [modalActive,toggleModalActive] = useState(false)



    //この記述で初回のみ実行される
    useEffect(() => {
        fetchComments()
    },[])
    

    const tags = ['ホラー','アクション']
    return (
        <section className="topic">
            <div className="billboard">
                <div className="billboard_inner">
                    <h1 className="topic_title">{locationVal['title']}</h1>
                </div>
            </div>

            <div className="main_contents">
                <h2 className="game_title">
                    {locationVal['title']}
                </h2>
                parent_user_id：{locationVal['id']}
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
                    {locationVal['status']}
                </div>
                {/* 一つ一つのコメント */}
                <div className="comments_wrap">
                    {
                        comments.map((comment) => (
                            <div className={'text ' + (comment.user_id === locationVal['parent_user_id'] ? 'left' : 'right') } key={comment.comment_id}>
                                {comment.text}
                            </div>                                
                        ))
                    }
                </div>
                <CommentForm 
                
                    isActive={modalActive} 
                    topic_id={locationVal["id"]}
                    toggleModalActive={toggleModalActive}
                />

            </div>
            <div className="new_form_button">
                <button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
            </div>
        </section>
    )

})