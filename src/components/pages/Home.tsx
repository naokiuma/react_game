import { memo,FC,useContext,useEffect, useState,ChangeEvent} from "react";
import { BrowserRouter,Route,Link,Routes } from "react-router-dom";//switch は Routesに変わった
import {ImgPreview} from "../Templates/ImgPreview"


import { Topic } from "../parts/Topic";
import { LoggedInProvider,LoggedInContext } from "../global/LoggedInProvider";

//新規form
//今これをここに直に書いている
import { TopicForm } from "../parts/form/TopicForm"

//インフラ
import { GetTopics} from "../../Infrastructure/useTopics"

//css
import '../../css/pages/top.css';













export const Home:FC = memo(() => {
    const { username,setUserName } = useContext(LoggedInContext);
    const [modalActive,toggleModalActive] = useState(false)

    //fethcが実施されたフラグ
    // let new_fetch_flg = false;


    const {fetchTopics,topics} = GetTopics();
    // const {postTopics} = CreateTopics();


    useEffect(() => {
        console.log('useeffect検知しました');
        fetchTopics()
    },[])


    // ローカルストレージからキーを指定して取得
    let loginUserName = localStorage.getItem("userName");
    let loginUserEmail = localStorage.getItem("userEmail");


    if(loginUserName !== null){
        setUserName(loginUserName);
    }

    if(loginUserEmail !== null){
        setUserName(loginUserEmail);
    }



    //------------------------ここから追加
    //タイトル
    // const [title,setTitle] = useState('')
    // const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.target.value)
    // }

    // //本文
    // const [body,setBody] = useState('')
    // const changeBody = (e:ChangeEvent<HTMLInputElement>) => {
    //     setBody(e.target.value)
    // }

    // //ステータス
    // const [status,setStatus] = useState('プレイ中')
    // const changeStatus = (e:ChangeEvent<HTMLSelectElement>) => {
    //     setStatus(e.target.value)
    // }


    // const submit = () => {
    //     postTopics(title,body,status,fetchTopics,null)
    // }

    //------------------------ここまで追加
    

    return (
        <>
            <section className="hero">
                <div className="inner">
                    <h1>Enjog</h1>

                    <p>
                        <span>
                            Enjog
                        </span>
                        で、「楽しんでいる最中」のログを残す。
                        {/* クリアしてなくても、<br/>
                        観終わってなくても、<br/>
                        読み終わってなくても、<br/>
                        その時その時のエンジョイの気持ち、感動を記録しよう。<br/> */}
                    </p>
                </div>

            </section>
            <section className="home_section main_contents">
                <ul className="topics_wrap">
                    {
                        topics.map((topic)=>(

                            <li>

                                <Link to={"/topics/" + topic.id} state={topic} key={topic.id}>
                                    <Topic
                                        key={topic.id}
                                        id={topic.id}
                                        title={topic.title}
                                        user_id={topic.parent_user_id}
                                        status={topic.status}
                                        />
                                </Link>  
                            </li>
                        ))
                    }  
                </ul>
                

                <TopicForm isActive={modalActive} fetchTopics={fetchTopics} /> 
                

                {/* <div className='isActive'>
                    <button >ボタン</button>
                    <div>
                        タイトル
                        <input onChange={changeTitle}/>
                    </div>
                    <div>
                        本文
                        <input onChange={changeBody}/>
                    </div>
                    <div>
                        ステータス
                    </div>
                    <select onChange={changeStatus}>
                        <option value="プレイ中">プレイ中</option>
                        <option value="クリア">クリア</option>
                        <option value="やり込み中">やり込み中</option>

                    </select>

                    <br/>
                    タイトル：{title}<br/>
                    本文：{body}<br/>
                    ステータス：{status}<br/>
                    
                    <ImgPreview
                        setImage = {setImg}
                        imgData = {imgData}
                    />
                    <button onClick={submit}>submit</button>
                </div> */}


                

            </section>


            <div className="new_form_button">
                <button onClick={() => toggleModalActive(!modalActive)}>新規トピックの投稿</button>
            </div>
        </>
    )

})