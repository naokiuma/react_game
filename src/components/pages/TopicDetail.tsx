
import { memo,useContext } from "react";
import { useEffect,useState } from 'react';
import { useLocation } from "react-router-dom";
import {getidfromURL} from 'utils/getidfromURL'
import {CommentsType} from "types/commentsType"
import {LoggedInUserContext} from "provider/LoggedInUserProvider";


//新規form
// import { CommentForm } from "components/molecules/form/CommentForm"
//インフラ
import {getComments} from "infrastructure/commentDriver";
import {useGetTopics} from "infrastructure/topicDriver";


/**
 * 投稿トピック詳細
 */
export const TopicDetail = memo(() => {
 
    const [comments,setComment] = useState<CommentsType[]>([])
	const handleValueChange = (newValue) =>{
		setComment([...comments,newValue])
	}

    //user_id
    // const { userid } = useContext(LoggedInContext);
    const { userInfo } = useContext(LoggedInUserContext);
	// console.log(userInfo)


    //topic_id
    const locationVal = useLocation();
	let topic_id = getidfromURL(locationVal.pathname,'topic');
	const { topics } = useGetTopics(8,topic_id);

	console.log('取得データ1')
    console.log(topics)

    //トピック編集用モーダル
    const [EditmodalActive,toggleEditModalActive] = useState(false)
    const [modalActive,toggleModalActive] = useState(false)
    

    useEffect(() => {
        getComments(topic_id).then((data) => {
            setComment(data);
        });
    },[])

	//コメント投稿できる場合
	// const MemoedForm = useMemo(() => 
	// <CommentForm 
	// 	form_title ='コメントを投稿'
	// 	isActive={modalActive} 
	// 	topic_id={topic_id}
	// 	toggleModalActive={toggleModalActive}
	// 	handleValueChange ={handleValueChange}
	// />,
	// [modalActive])


    //左辺がtrueなら右辺を返す。 
    let title = topics[0] && topics[0]['title'];//タイトル
    let body = topics[0] && topics[0]['body'];//本文
    let status = topics[0] && topics[0]['status'];//ステータス

    //背景画像
    let main_img;
    if(topics[0] && topics[0]['image_path'] != null){
        let temp_image_path = topics[0]['image_path'];
        main_img = 'http://now-games-api.local:8888/' + temp_image_path.replace("public","storage");
		// http://now-games-api.local:8888/
    }else{
        main_img = '';
    }

    const tags = ['ローグライク','泣けるああ']
    
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
           
            <div className="main_contents topic_detail_content">
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
                    <p>{body}</p>です
                </div>
                
                {/* topicのユーザーidがログイン中urser_idと同じなら編集可能 */}
                {(topics[0] && (topics[0]['parent_user_id'] === userInfo.user_id) ) && 
                    <button onClick={() => toggleEditModalActive(!EditmodalActive)}>記事を編集</button>
                }


                {(main_img !='') &&
                    <div className="_main_img_wrap">
                        <figure>
                            <img src={main_img}  />
                        </figure>
                    </div>
                }
                {/* 一つ一つのコメント */}
                <div className="comments_wrap">
                    {
                        comments.map((comment) => (
                            <div className={'text ' + (topics[0] && comment.user_id === topics[0]['parent_user_id'] ? 'left' : 'right') }
							 key={comment.comment_id}>
                                {comment.text}
                            </div>                                
                        ))
                    }
                </div>
				{/* {MemoedForm} */}

            </div>
            <div className="new_form_button">
                <button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
            </div>
        </section>
    )

})