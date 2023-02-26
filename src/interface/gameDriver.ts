export default interface GameDriver {
    SearchGame(keyword:string): Promise<GamesJsons>;
}
  
export type GamesJsons = {
    games: GameJson[];
};
  
export type GameJson = {
    id: number;
    game_name: string;
    genres: string;
    created_at: string;
};
  