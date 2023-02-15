import { memo,FC,useContext,useEffect, useState,ChangeEvent} from "react";
import { BrowserRouter,Route,Link,Routes } from "react-router-dom";//switch は Routesに変わった
import { Topic } from "../atom/Topic";
import { LoggedInContext } from "../global/LoggedInProvider";
// import { TotalGameCountContext } from "../global/TotalGameCountProvider";
import { ChakraProvider } from '@chakra-ui/react'


//新規form
import { TopicForm } from "../Molecules/form/TopicForm"
//インフラ
import { GetTopics} from "../../Infrastructure/useTopics"//topic一覧
import { GetCategory } from "../../Infrastructure/useCategory"//カテゴリー情報

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
                    {/* <ChakraProvider> */}

                    <div className="tags_search_wrap">
                        <ul>
                            {categories.map((_category)=>(
                                <li key={_category.category_id} onClick={() => set_tag(_category.name)}>{_category.name}</li>
                            ))}
                            <li onClick={() => set_tag('すべて')}>すべて</li>
                        </ul>
                    </div>
                    {/* </ChakraProvider> */}


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
                    <button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
                </div>
            </>
        )
    // }

})