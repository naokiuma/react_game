import { memo,FC,useState,useEffect } from "react";
import { useForm } from 'react-hook-form';
import {ImgPreview} from "../../Templates/ImgPreview"
import {CreateTopics} from "../../../Infrastructure/useTopics"

//インフラ
import { GetCategory } from "../../../Infrastructure/useCategory"


//Form用の情報
type FormInputs = {
    Title: string;
    Body: string;
    Status: string;
};


type Props = {
    form_title:string,//formの題名
    isActive:boolean,//modal表示フラグ
    fetchTopics:Function,//topicを取得
    toggleModalActive:Function,
    is_edit?:boolean,
    title?:string,
    body?:string,
    status?:string
    // is_edit?: {
    //     Title: string;
    //     Body: string;
    //     Status: string;
    // };
    
}


export const TopicForm:FC<Props> = memo((props) => {


    //既存カテゴリーの取得
    const {fetchCategories,categories} = GetCategory();  
    useEffect(() => {
        // console.log('useeffect検知しました');
        fetchCategories()
    },[])

    const [loading, setLoading] = useState(true);


    // console.log('ここでのカテゴリー')
    // console.log(categories)
    // console.log('子供のpropsです')
    // console.log(props)
    // console.log(props.title)

    let default_Title = '';
    let default_Body = '';
    let default_Status = '';
    if(props.is_edit){
        default_Title = props.title;
        default_Body = props.body;
        default_Status = props.status;
        // default_Title = props.title =! 'undefined' ? props.title : ''
        // default_Body = props.body =! 'undefined' ? props.body : ''
        // default_Status = props.status =! 'undefined' ? props.status : 'プレイ中'
        // setLoading(false)

    }else{
        default_Title = ''
        default_Body =  ''
        default_Status =  'プレイ中'
        // setLoading(false)

    }


    //useformの初期化
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm<FormInputs>({
        // shouldUnregister:false,//廃止されてる様子 https://qiita.com/bluebill1049/items/f838bae7f3ed29e81fff
        defaultValues: { 
            Title: default_Title,
            Body:default_Body,
            Status:default_Status
        }
    });
    console.log('default_Title2')


    //モーダル表示フラグ
    let isActive = props.isActive
    const {postTopics} = CreateTopics();//importした関数の場合はこの書き方
    const fetchTopics = props.fetchTopics;//propsで渡した関数の場合はこの書き方

    //画像のみ別途用意
    const [imgData, setImg] = useState(null);
    console.log('画像。')
    console.log(imgData)


    const submit = (data:FormInputs) => {
        postTopics(data.Title,data.Body,data.Status,fetchTopics,imgData);
        props.toggleModalActive(false);
    }


    if (loading) {
        return <div>loading....</div>;
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
                        <span className="fw_b">
                            {props.form_title}
                        </span>
                        <br/>
                        <input value={default_Title} {...register('Title', { required: 'タイトルは必須です' })}/>
                        <p>{errors.Title?.message}</p> {/* エラー表示 */}
                    </div>
                    
                    <select className="write_area" {...register('Status')}>
                        <option value="プレイ中">プレイ中</option>
                        <option value="クリア">クリア</option>
                        <option value="やり込み中">やり込み中</option>
                    </select>

                    <div className="write_area" >
                        <textarea {...register('Body', { required: '本文は必須です' })}/>
                    </div>
                    <p>{errors.Body?.message}</p> {/* エラー表示 */}
                    
                    <div className="write_area">
                        <ImgPreview setImage = {setImg}/>
                    </div>


                    <button className="submit_btn">投稿！</button>
                </div>
            </div>
        </form>
    )

})