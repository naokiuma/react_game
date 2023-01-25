import { memo,FC,useState } from "react";
import { useForm } from 'react-hook-form';
import {ImgPreview} from "../../Templates/ImgPreview"
import {CreateTopics} from "../../../Infrastructure/useTopics"



type Props = {
    form_title:string,
    isActive:boolean,
    fetchTopics:Function,
    toggleModalActive:Function
}

type FormInputs = {
    Title: string;
    Body: string;
    Status: string;
};


export const TopicForm:FC<Props> = memo((props) => {
    console.log('formの中');

    //useformの初期化
    const {register,handleSubmit,reset,watch,formState: { errors }} = useForm<FormInputs>();


    //モーダル表示フラグ
    let isActive = props.isActive
    const {postTopics} = CreateTopics();//importした関数の場合はこの書き方
    const fetchTopics = props.fetchTopics;//propsで渡した関数の場合はこの書き方

    //画像のみ別途用意
    const [imgData, setImg] = useState(null);
    console.log('画像。')
    console.log(imgData)


    const submit = (data:FormInputs) => {
        // console.log(data);
        postTopics(data.Title,data.Body,data.Status,fetchTopics,imgData);
        props.toggleModalActive(false);
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
                        
                        <input {...register('Title', { required: 'タイトルは必須です' })} />
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