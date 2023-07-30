
import { memo,useState,useEffect,Suspense } from "react";
import { useForm } from 'react-hook-form';
import {ImgPreview} from "components/templates/ImgPreview"
import { useNavigate } from 'react-router-dom';

//インフラ
import {CreateTopic} from "infrastructure/topicDriver";
import {GetCategory} from "infrastructure/categoryDriver";
import {getGames} from "infrastructure/gameDriver";



//Form用の情報
type FormInputs = {
    Title: string;
    Gameid:number;
    Body: string;
    Status: string;
};

// todo 次ここ
export const TopicRegist = memo((props) => {

	console.log('それぞれ')
    let url = new URL(window.location.href);
	console.log(url)
    let params = url.searchParams;
	console.log(params)
    let target_game_id;

    const navigate = useNavigate();
    // if(params.get('game_id') === ''){
    //     navigate('/game/search');
    // }else{
    //     target_game_id = params.get('game_id');
    // }

	target_game_id = params.get('game_id');



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
        getGames(target_game_id).then((data)=>{
            set_game(data);
             //ゲーム情報が取得できなければリダイレクト
             if(!data[0]){
				console.log('ゲームデータがありません')
                // navigate('/game/search');
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
    // const [imgData, setImg] = useState(null);
    const [images, setImages] = useState<File[]>([]);


    
    const submit = (data:FormInputs) => {
        CreateTopic(data.Gameid,data.Title,data.Body,data.Status,images)  
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
						<>
							{
								game_data[0] ? 
								(
									<>
										<span className="value_title">
											{game_data[0].game_name}
										</span><br/>
										<input {...register('Gameid')}　value={game_data[0].id}/>
									</>
								):(
									<div>ゲーム情報が取得できませんでした。</div>
								)
							}
						</>
                    </div>

                    <div className="write_area" >
                        <span className="value_title">メモ・感想など</span>
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
    )

})