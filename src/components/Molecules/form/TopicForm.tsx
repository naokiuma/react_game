import { memo,FC,useState,useEffect } from "react";
import { useForm } from 'react-hook-form';
import {ImgPreview} from "../../Templates/ImgPreview"

//インフラ
import {createTopics} from "../../../infrastructure/topicDriver";
import {GetCategory} from "../../../infrastructure/categoryDriver";


//Form用の情報
type FormInputs = {
    Title: string;
    GameName:string;
    URL?:string;
    Body: string;
    Status: string;
};


type Props = {
    form_title:string,//formの題名
    isActive:boolean,//modal表示フラグ
    fetchTopics:Function,//topicを取得
    set_result_topics:Function
    toggleModalActive:Function,
    is_edit?:boolean,
    title?:string,
    body?:string,
    status?:string    
}


export const TopicForm:FC<Props> = memo((props) => {


    console.log('topicformです')

    //既存カテゴリーの取得--------------
    let [categories,set_category] = useState([])
    useEffect(() => {
        // fetchCategories()
        GetCategory().then((data) => {
            set_category(data);
        });
    },[])


    //useformの初期化
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm<FormInputs>({
    });

    //モーダル表示フラグ
    let isActive = props.isActive
    const fetchTopics = props.fetchTopics;//propsで渡した関数の場合はこの書き方
    const set_result_topics = props.set_result_topics

    //画像のみ別途用意
    const [imgData, setImg] = useState(null);

    const submit = (data:FormInputs) => {
        createTopics(data.Title,data.Body,data.Status,imgData)
        window.location.reload()

        // createTopics(data.Title,data.Body,data.Status,imgData).then(() =>{
            // fetchTopics().then((data) => {
                //console.log(data)
                // set_result_topics(data);
            // });
    
    }

    return (
        <form className={'modal_wrap ' + (isActive == true ? 'isActive' : '')} onSubmit={handleSubmit(submit)}>
            <div className="ovarlay" onClick={() =>  props.toggleModalActive(false)}></div>
            <div className='modal'>
                <div className="close_btn_wrap">
                    <div className="close_btn" onClick={() =>  props.toggleModalActive(false)}>
                    </div>
                </div>
                <div>
                    <div className="write_area" >
                        <span className="fw_b _title">
                            {props.form_title}
                        </span>
                        <br/>
                        <input className="mt10" {...register('Title', { required: 'タイトルは必須です' })}/>
                        <p className="_attention_msg">{errors.Title?.message}</p> {/* エラー表示 */}
                    </div>
                    
                    <select className="write_area" {...register('Status')}>
                        <option value="プレイ中">プレイ中</option>
                        <option value="クリア">クリア</option>
                        <option value="やり込み中">やり込み中</option>
                    </select>

                    <div className="write_area game_name">
                        <span>ゲーム名
                            <span className="_attention_msg">※似たタイトルを探します</span>
                        </span><br/>
                        <input {...register('GameName', { required: 'ゲーム名は必須です' })}/>
                        <p className="_attention_msg">{errors.GameName?.message}</p> {/* エラー表示 */}
                    </div>

                    <div className="write_area game_name">
                        <span>参考URL</span><br/>
                        <input placeholder="https://" {...register('URL')} value="https://"/>
                    </div>

                    <div className="write_area" >
                        <span>ゲームへの思いを書きましょう！</span>
                        <textarea {...register('Body', { required: '本文は必須です' })}/>
                    </div>
                    <p className="_attention_msg">{errors.Body?.message}</p> {/* エラー表示 */}
                    
                    <div className="write_area">
                        <ImgPreview setImage = {setImg}/>
                    </div>
                    <button className="submit_btn">投稿！</button>
                </div>
            </div>
        </form>
    )

})