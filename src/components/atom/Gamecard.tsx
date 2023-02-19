
// type Topic_C_Type = {
//     id: number;
//     title: string;
//     user_id?:number;
//     tags?:string[];
//     participants?:number
//     status:string
//     image_path:string
// };


export const Gamecard = (Prop) => {
    let { id,game_name,image_path} = Prop

    return (
        <div className="game_card_wrap">
            <h4 className="_title">
                {game_name}
            </h4>
            {image_path &&
                <div>
                    <img src={"http://localhost:8888/" + image_path.replace("public","storage")} alt="" />
                </div>
            }
        </div>
        
    )
}


