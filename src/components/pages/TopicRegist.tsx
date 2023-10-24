
import { memo,useState,useEffect,Suspense } from "react";
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {ImgPreview} from "components/commons/ImgPreview"

//インフラ
import {CreateTopic} from "infrastructure/topicDriver";
import {GetCategory} from "infrastructure/categoryDriver";
import {getGames} from "infrastructure/gameDriver";


//Form用の情報
type FormInputs = {
    Gameid:number;
    Title: string;
    Body: string;
    Status: string;
};

// todo 次ここ
export const TopicRegist = memo(() => {

	const { game_id } = useParams();
    let target_game_id = Number(game_id);


    //既存カテゴリーの取得--------------
    let [categories,set_category] = useState([])
    
    //ゲームデータの取得----------------
    let [game_data,set_game] = useState([])

    //ローディング例
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        GetCategory().then((data) => {
            set_category(data);//ローグライクとか。
        });
        getGames(target_game_id).then((data)=>{
            set_game(data);
             //ゲーム情報が取得できなければリダイレクト
             if(!data[0]){
				console.log('ゲームデータがありません')
            }
            setIsLoading(false);
        })
    },[])

    //useformの初期化
    const {
			register,
			handleSubmit,
			formState: { errors }
		} = useForm<FormInputs>({
    });

    //画像のみ別途用意
    // const [imgData, setImg] = useState(null);
    const [images, setImages] = useState<File[]>([]);


    
    const submit = (data:FormInputs) => {
		console.log(data)
        CreateTopic(data.Gameid,data.Title,data.Body,data.Status,images)  
    }

	
    return (
        <div className="main_contents">
			<div className="form_wrap topic_form">
			
            	<form onSubmit={handleSubmit(submit)}>
                <div className=''>
                    <span className="fw_b _title">
                            {game_data[0].game_name}について投稿する
                    </span>
                    <div className="write_area game_name">
                        <span className="value_title">話題</span><br/>
                        <input className="mt10" {...register('Title', { required: 'タイトルは必須です' })} placeholder="タイトルを入力"/>
                        <p className="_attention_msg">{errors.Title?.message}</p> {/* エラー表示 */}
                    </div>
                    
                    <select className="write_area" {...register('Status')}>
                        <span className="value_title">状況</span>
                        <option value="プレイ中">プレイ中</option>
                        <option value="クリア">クリア</option>
                        <option value="やり込み中">やり込み中</option>
                    </select>

                    <div className="write_area game_id">
						<input {...register('Gameid')}　value={game_data[0].id}/>
                    </div>

                    <div className="write_area" >
                        <span className="value_title">本文</span><br/>
                        <textarea {...register('Body', { required: '本文は必須です' })}/>
                    </div>
                    <p className="_attention_msg">{errors.Body?.message}</p> {/* エラー表示 */}
                    
                    <div className="write_area">
                        <ImgPreview setImages = {setImages}/>
                    </div>
                    <button className="submit_btn">投稿</button>
                </div>
            	</form>
			</div>
        </div>
    )

})