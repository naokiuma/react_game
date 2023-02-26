import genres from '../utils/game_genre'

test('ゲームジャンルチェック',()=>{
    expect(genres[1]).toBe('アクション');
})

test('ゲームジャンルチェック',()=>{
    expect(genres[2]).toBe('RPG');
})

test('ゲームジャンルチェック',()=>{
    expect(genres[4]).toBe('パズル');
})