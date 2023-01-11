
import { memo,FC } from "react";
import { useEffect,useState } from 'react';
import { useLocation } from "react-router-dom";

//新規form
import { CommentForm } from "../Molecules/form/CommentForm"

//インフラ
import { GetComments } from "../../Infrastructure/useComments"
import { GetTopics} from "../../Infrastructure/useTopics"
import { url } from "inspector";




export const TopicPage:FC = memo(() => {
    const locationVal = useLocation().state;
    console.log("locationの中身")
    console.log(locationVal)

    let {fetchComments,comments} = GetComments(locationVal['id']) 
    const {fetchTopics,topics} = GetTopics();
    const [modalActive,toggleModalActive] = useState(false)


    //この記述で初回のみ実行される
    useEffect(() => {
        fetchComments()
        fetchTopics(locationVal['id'])
    },[])

    console.log('初回')
    console.log(topics)

    let bg_img
    if(topics[0] && topics[0]['image_path'] != null){
        bg_img = 'http://localhost:8888/' + topics[0]['image_path'].replace("public","storage");
    }else{
        bg_img = '';
    }

    const tags = ['ホラー','アクション']
    return (
        <section className="topic">
            <div className="billboard"
                style={{ 
                backgroundImage: `url(${bg_img})`
                }}
            >
                <div className="billboard_inner">
                    <h1 className="topic_title">{topics[0] && topics[0]['title']}</h1>
                </div>
            </div>
           

            <div className="main_contents">
                <h2 className="game_title">
                    {topics[0] && topics[0]['title']}
                </h2>
                id：{locationVal['id']}

                {(topics[0] && topics[0]['image_path'] != null) &&
                    <div className="_main_img_wrap">
                        <figure>
                            <img src={"http://localhost:8888/" + topics[0]['image_path'].replace("public","storage")}  />
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
                    {topics[0] && topics[0]['status']}
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
                    fetchComments={fetchComments}
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