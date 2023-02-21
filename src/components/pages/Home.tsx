import { memo,FC,useContext,useEffect, useState,ChangeEvent} from "react";
import { BrowserRouter,Route,Link,Routes } from "react-router-dom";//switch は Routesに変わった
import { Topic } from "../atom/Topic";
import { LoggedInContext } from "../global/LoggedInProvider";
import { TotalGameCountContext } from "../global/TotalGameCountProvider";
import { ChakraProvider } from '@chakra-ui/react'


//新規form
import { TopicForm } from "../Molecules/form/TopicForm"
//インフラ
import { GetTopics} from "../../fooks/useTopics"//topic一覧
import { GetCategory } from "../../fooks/useCategory"//カテゴリー情報

//css
import '../../css/pages/top.css';


export const Home:FC = memo(() => {

    const {fetchCategories,categories} = GetCategory();  
    useEffect(() => {
        fetchCategories()
        console.log(categories)
    },[])

    // const {TotalGameCount} = useContext(LoggedInContext);
    const [modalActive,toggleModalActive] = useState(false)
    let [selecged_tag,set_tag] = useState(null)
    let [result_topics,set_result_topics] = useState([]);//ここでnullは渡すな
    let [default_topics,set_default_topics] = useState([]);

    const { username } = useContext(LoggedInContext); 
    const { userid } = useContext(LoggedInContext);
    
    //インフラ
    const {fetchTopics} = GetTopics();

    //topicsを取得
    useEffect(() => {
        fetchTopics().then((data) => {
            set_default_topics(data);
            set_result_topics(data);
        });
    },[])

    //タグが選ばれた際
    useEffect(() => {
        console.log(default_topics)
        if(selecged_tag != 'すべて'){
            let temp_array = [];
            default_topics.filter( _topic => {
                _topic.tags.forEach(each_tags => {
                    if(Object.values(each_tags).includes(selecged_tag)){
                        temp_array.push(_topic)
                    }
                })
            })
            set_result_topics(temp_array);
        }else{
            set_result_topics(default_topics)
        }
    },[selecged_tag])
        return (
            <>
                <section className="hero" style={{ backgroundImage: "url(/img/top_billboard.jpg)" }}>
                    <div className="inner">
                            <h1>Game </h1>

                            <h3>プレイログを残す。</h3>
                            <p>
                                プレイ中のゲームのリアルタイムのメモ、攻略情報、感想を残そう。
                                自分のマイページをカスタマイズして、
                            </p>

                            <h3>探す</h3>
                            <p>
                                エモい」「繰り返し遊べる」「コスパ最高」「指痛」<br/>
                                同じカテゴリーの次にやるゲームを探すのにも使えるぞ。
                            </p>

                            <h3>みんなで崩そう</h3>
                            <p>
                                みんなのゲーム数をカウント。<br/>
                                終わらないゲーム生活を続けていこう。
                            </p>
                    </div>
                    {/* みんなの積みゲー数数:{TotalGameCount} */}
                </section>

                contextのuser_id:{userid}
                namae:{username}
                
                <section className="home_section main_contents">
                    <div className="tags_search_wrap">
                        <ul>
                            {categories.map((_category)=>(
                                <li key={_category.category_id} onClick={() => set_tag(_category.name)}>{_category.name}</li>
                            ))}
                            <li onClick={() => set_tag('すべて')}>すべて</li>
                        </ul>
                    </div>
                    {
                        (() => {
                        if (!result_topics) {
                            return( <div>loading</div> );
                        } else {
                            return ( 
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
                            );
                        }
                        })()
                    }
                 
                    <TopicForm
                        form_title='トピックを追加'
                        isActive={modalActive}
                        fetchTopics={fetchTopics}
                        set_result_topics={set_result_topics}
                        toggleModalActive={toggleModalActive}
                    />
                </section>

                <div className="new_form_button">
                    <button onClick={() => toggleModalActive(!modalActive)}>ゲームを探す</button>
                </div>
            </>
        )
    // }

})