export default interface GameeDriver_I {
    SearchGame(keyword:string): Promise<GamesJsons>;
}
  
export type GamesJsons = {
    games: GameJson[];
};
  
export type GameJson = {
    id: number;
    game_name: string;
    genres: string;
    topics:[];
    created_at: string;
};
  