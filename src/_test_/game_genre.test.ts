import genres from '../utils/game_genre'

test('ゲームジャンルチェック',()=>{
    expect(genres[0]).toBe('アクション');
})

test('ゲームジャンルチェック',()=>{
    expect(genres[1]).toBe('RPG');
})

test('ゲームジャンルチェック',()=>{
    expect(genres[3]).toBe('パズル');
})