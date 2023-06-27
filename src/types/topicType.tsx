
export type topicType = {
    id:number;
    title:string;
    user_id:number;
	game_title:string
    body?:string;
    tags?:{
		name:string,
		color:string
	}[];
    status:string;
    image_path:string;
    created_at?:string;
    updated_at?:string;
};