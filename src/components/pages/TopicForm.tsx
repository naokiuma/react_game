
import { memo,FC,useState,useEffect } from "react";
import { useForm } from 'react-hook-form';
import {ImgPreview} from "../Templates/ImgPreview"
import {ImgsPreview} from "../Templates/ImgsPreview"

import { useNavigate } from 'react-router-dom';

//インフラ
import {createTopic} from "../../infrastructure/topicDriver";
import {GetCategory} from "../../infrastructure/categoryDriver";
import {getGame} from "../../infrastructure/gameDriver";


//Form用の情報
type FormInputs = {
    Title: string;
    Gameid:number;
    Body: string;
    Status: string;
};


// type Props = {
//     form_title:string,//formの題名
//     isActive:boolean,//modal表示フラグ
//     set_result_topics:Function
//     toggleModalActive:Function,
//     is_edit?:boolean,
//     title?:string,
//     body?:string,
//     status?:string    
// }

export const TopicForm = memo((props) => {

    let url = new URL(window.location.href);
    let params = url.searchParams;
    let target_game_id;

    const navigate = useNavigate();
    if(params.get('game_id') ===  ''){
        navigate('/game/search');
    }else{
        // let defaultValue = params.get('game_id') ? params.get('game_id') : '';
        target_game_id = params.get('game_id');
    }


    //数字のみ
    const numberRegExp = /^[0-9]+$/ 

    //既存カテゴリーの取得--------------
    let [categories,set_category] = useState([])
    
    //ゲームデータの取得----------------
    let [game_data,set_game] = useState([])

    //ローディング例
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        GetCategory().then((data) => {
            set_category(data);//ローグライクとか。
            console.log(data)
        });
        getGame(target_game_id).then((data)=>{
            set_game(data);
             //ゲーム情報が取得できなければリダイレクト
             if(!data[0]){
                 console.log('ないよ〜〜')
                 console.log(data[0])
                navigate('/game/search');
            }
            // console.log('取得したゲーム情報')
            // console.log(game_data[0])
            setIsLoading(false);
        })
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

    //画像のみ別途用意
    const [imgData, setImg] = useState(null);
    const [images, setImages] = useState<File[]>([]);


    
    const submit = (data:FormInputs) => {
        createTopic(data.Gameid,data.Title,data.Body,data.Status,imgData)  
    }

    return (
        <div className="main_contents form_wrap topic_form">
            <form onSubmit={handleSubmit(submit)}>
                <div className=''>
                    <span className="fw_b _title">
                            新しいトピックを投稿する
                    </span>
                    <div className="write_area game_name">
                        <span className="value_title">タイトル</span>
                        <input className="mt10" {...register('Title', { required: 'タイトルは必須です' })}/>
                        <p className="_attention_msg">{errors.Title?.message}</p> {/* エラー表示 */}
                    </div>
                    
                    <select className="write_area" {...register('Status')}>
                        <span className="value_title">状況</span>
                        <option value="プレイ中">プレイ中</option>
                        <option value="クリア">クリア</option>
                        <option value="やり込み中">やり込み中</option>
                    </select>

                    <div className="write_area game_id">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                <span className="value_title">
                                    {game_data[0].game_name}
                                </span><br/>
                                <input {...register('Gameid')}　value={game_data[0].id}/>
                            </>
                        )}
                    </div>

                    <div className="write_area" >
                        <span className="value_title">メモ・感想など</span>
                        <textarea {...register('Body', { required: '本文は必須です' })}/>
                    </div>
                    <p className="_attention_msg">{errors.Body?.message}</p> {/* エラー表示 */}
                    
                    <div className="write_area">
                        <ImgPreview setImage = {setImg}/>
                    </div>
                    <button className="submit_btn">投稿</button>
                </div>
            </form>
        </div>
    )

})