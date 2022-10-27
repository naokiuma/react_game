
import { memo,FC } from "react";
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";

//Customhooks
import { GetComments } from "../../hooks/Comments"


export const TopicPage:FC = memo(() => {
    const locationVal = useLocation().state;
    console.log(locationVal)

    let {fetchComments,comments} = GetComments(locationVal['id']) 
    useEffect(() => {//この記述で初回のみ実行される
        fetchComments()
    },[])
    

    console.log('コメント')
    console.log(comments)

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
                parent_user_id：{locationVal['parent_user_id']}
                    <div className="tags">
                        {
                            tags.map((tag:string)=>(
                                <span className="tag" key={tag}>
                                    {tag}
                                </span>
                            ))
                        }
                    </div>
                    <div>
                        {locationVal['status']}
                    </div>

                    <div className="comments_wrap">
                        {
                            comments.map((comment) => (
                                <div className={'text ' + (comment.user_id === locationVal['parent_user_id'] ? 'left' : 'right') } key={comment.comment_id}>
                                    {comment.text}
                                </div>                                
                            ))
                        }
                    </div>
            </div>
        </section>
    )

})