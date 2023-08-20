import { topicType } from "./topicType";

export type GameType = {
    id: number;
    game_name: string;
    genres: string;
    topics:topicType[];
    created_at: string;
	images?:any[];
	size?;string;
}