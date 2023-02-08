import { memo,FC,useContext,useEffect, useState,ChangeEvent} from "react";
import { BrowserRouter,Route,Link,Routes } from "react-router-dom";//switch は Routesに変わった
import { Topic } from "../atom/Topic";
import { LoggedInContext } from "../global/LoggedInProvider";
// import { TotalGameCountContext } from "../global/TotalGameCountProvider";


//新規form
import { TopicForm } from "../Molecules/form/TopicForm"

//インフラ
import { GetTopics} from "../../Infrastructure/useTopics"

//css
import '../../css/pages/top.css';

  



export const Home:FC = memo(() => {
    // const {TotalGameCount} = useContext(LoggedInContext);
    const [modalActive,toggleModalActive] = useState(false)
    let [selecged_tag,set_tag] = useState(null)
    let [result_topics,set_result_topics] = useState(null)



    const { username } = useContext(LoggedInContext); 
    const { userid } = useContext(LoggedInContext);
    
    //インフラ
    const {fetchTopics,topics} = GetTopics();

   

    //初回、topicsを取得
    useEffect(() => {
        fetchTopics();
        set_result_topics(topics);


    },[])


    useEffect(() => {
        set_result_topics(result_topics);
    },[topics])



    //タグが選ばれた際
    useEffect(() => {
        console.log('selecged_tagに変化あり')
        console.log(selecged_tag)
        if(selecged_tag){
            console.log('あ？')
            let temp_array = [];
            topics.filter( _topic => {
                // console.log(_topic)
                _topic.tags.forEach(each_tags => {
                    console.log('each_tags')//array[{}{}]

                    console.log(each_tags)//array[{}{}]
                    if(Object.values(each_tags).includes(selecged_tag)){
                        temp_array.push(_topic)
                    }
                })
            })
            console.log('選ばれたもの')
            console.log(temp_array)
            set_result_topics(temp_array);

            // result_topics = temp_array

        }else{
            console.log('何もしない')
        }

    },selecged_tag)


        return (
            <>
                <section className="hero" style={{ backgroundImage: "url(/img/top_billboard.jpg)" }}>
                    <div className="inner">
                        <div className="_left_area">
                            <h1>Enjog</h1>
                            <p>
                                記録を残そう。<br/>
                                もっとやりたいゲームをシェアしよう！
                            </p>
                        </div>
                        <div className="_right_area">
                            <ul>
                                <li>a</li>
                                <li>i</li>
                                <li>u</li>

                            </ul>
                        </div>
                    </div>
                    {/* みんなの積みゲー数数:{TotalGameCount} */}
                </section>

                contextのuser_id:{userid}
                namae:{username}

                
                <section className="home_section main_contents">

                    <div className="tags_search_wrap">
                        <ul>
                            <li onClick={() => set_tag('アクション')}>アクション</li>
                            <li>RPG</li>
                            <li>アドベンチャー</li>
                        </ul>
                    </div>

                  
                 
                    <ul className="topics_wrap">
                        
                        {
                            result_topics.map((topic)=>(
                                <li key={topic.id}>
                                    <Link to={"/topics/" + topic.id} state={topic}>
                                        <Topic
                                            id={topic.id}
                                            title={topic.title}
                                            user_id={topic.parent_user_id}
                                            tags={topic.tags}
                                            status={topic.status}
                                            image_path={topic.image_path}
                                        />
                                    </Link>
                                    parent_uder_id:{topic.parent_user_id}
                                
                                    {(username !== 'ゲスト' && userid === topic.parent_user_id) && <span>編集</span>}
                                </li>
                            ))
                        }  
                    </ul>
                    
                    <TopicForm
                        form_title='トピックを追加'
                        isActive={modalActive}
                        fetchTopics={fetchTopics}
                        toggleModalActive={toggleModalActive}
                    /> 
                    
                </section>


                <div className="new_form_button">
                    <button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
                </div>
            </>
        )
    // }

})