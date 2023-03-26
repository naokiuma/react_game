import { memo,FC,useContext,useEffect, useState,ChangeEvent} from "react";
import { Link } from "react-router-dom";//switch は Routesに変わった
import { Topic } from "../atom/Topic";
import { LoggedInContext } from "../../provider/LoggedInProvider";
import { TotalGameCountContext } from "../../provider/TotalGameCountProvider";


//インフラ
import {getTopics} from "../../infrastructure/topicDriver";
import {GetCategory} from "../../infrastructure/categoryDriver";
//css
import '../../css/pages/top.css';


export const Home:FC = memo(() => {

    const [modalActive,toggleModalActive] = useState(false)
    let [categories,set_category] = useState([])
    let [result_topics,set_result_topics] = useState([]);
    let [default_topics,set_default_topics] = useState([]);
    let [selecged_tag,set_tag] = useState(null)



    const { username } = useContext(LoggedInContext); 
    const { userid } = useContext(LoggedInContext);
    
    //topicsを取得
    useEffect(() => {
        getTopics().then((data) => {
            set_default_topics(data);
            set_result_topics(data);
        });
        GetCategory().then((data) => {
            set_category(data);
        });
    },[])

    //  useEffect(() => {
    //     // GetCategory().then((data) => {
    //     //     set_category(data);
    //     // });
    // },[])

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
            <div className="top_page">
                <section className="hero">
                    <div className="inner">

                        <div className="top_topics">


                        </div>

                        <div className="first_info">
                            <h1>ゲームを積んで、残して、広げよう。</h1>
                            <p>ゲームスプレッドは、ゲームの楽しみをもっと増やすためのサービスです。</p>
                        </div>

                        <section className="main_info_wrap">
                            <div className="_each">
                                <div>
                                    <h3>書く</h3>
                                    <p>
                                        ゲームの感想、攻略メモを残そう。<br/>
                                        ネタバレ有無の設定もできるよ！
                                    </p>
                                </div>
                                <figure>
                                    <img src="/img/top/top_billboard1.jpg" alt="" />
                                </figure>
                            </div>
                            <div className="_each">
                                <figure>
                                    <img src="/img/top/top_billboard2.jpg" alt="" />
                                </figure>
                                
                                <div>
                                    <h3>探す</h3>
                                    <p>
                                        エモい」「繰り返し遊べる」「コスパ最高」「指痛」<br/>
                                        同じカテゴリーの次にやるゲームを探すのにも使えるぞ。
                                    </p>
                                </div>
                            </div>
                            <div className="_each">

                                <div>

                                    <h3>みんなで崩そう</h3>
                                    <p>
                                        みんなのゲーム数をカウント。<br/>
                                        終わらないゲーム生活を続けていこう。
                                    </p>
                                </div>
                                <figure>
                                    <img src="/img/top/top_billboard3.jpg" alt="" />
                                </figure>
                            </div>
                        </section>
                    </div>
                </section>
                
                <section className="home_section main_contents">
                    <h2>みんなのプレイログ</h2>
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
                                            <Link to={"/topic/" + topic.id} state={topic}>
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
                </section>

                <div className="new_form_button">
                    <button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
                </div>
            </div>
        )
    // }

})