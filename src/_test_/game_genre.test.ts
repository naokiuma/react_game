import genres from 'utils/game_genre'


describe('ゲームジャンル',() =>{
    it('チェック',() =>{
        expect(genres[0]).toBe('アクション');
        expect(genres[1]).toBe('RPG');
        expect(genres[3]).toBe('パズル');    
    })
})

// 一つずつ書く
// test('ゲームジャンルチェック',()=>{
//     expect(genres[0]).toBe('アクション');
// })

// test('ゲームジャンルチェック',()=>{
//     expect(genres[1]).toBe('RPG');
// })

// test('ゲームジャンルチェック',()=>{
//     expect(genres[3]).toBe('パズル');
// })

// 分割して書く例
// import { Greeter } from './Greeter'
//     describe('Greeter', () => { it.each([
//         ['Taka', 'Hello Taka'],
//         ['Daniel', 'Hello Daniel'],
//     ])('Says Hello and $name', (name, expected) => {
//         const greeter = new Greeter()
//         expect(greeter.greet(name)).toBe(expected)
//     })
// })
