
import { memo,FC } from "react";
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";

//Customhooks
import { GetComments } from "../../hooks/GetComments"
// import { CommentsType } from "../../types/commentsType"


export const TopicPage:FC = memo(() => {
    //const { fetchComments } = GetComments();
    let {fetchComments,comments} = GetComments() 
    useEffect(() => {//この記述で初回のみ実行される
        fetchComments()
    },[])
    

    console.log('コメント')
    console.log(comments)


    const location = useLocation();
    console.log('location')
    console.log(location)
    const locationVal = location.state;
    const tags = ['ホラー','アクション']

    // const comments:CommentsType[] = [
    //     {
    //         comment_id:1,
    //         topic_id:1,
    //         user_id:1,
    //         text:'めっちゃおもろいな',
    //     },
    //     {
    //         comment_id:2,
    //         topic_id:1,
    //         user_id:2,
    //         text:'でもかなり怖くない？',
    //     }
    // ]

    return (
      
        <section className="topic">
            <h1>トピックページ</h1>
            <div className="billboard">
                <div className="billboard_inner">
                    <h1 className="topic_title">{location.state['title']}</h1>
                </div>
            </div>

            <div className="main_contents">
                <h2 className="game_title">
                    ダイイングライト
                </h2>
                parent_user_id：{location.state['parent_user_id']}
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