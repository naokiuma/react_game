import {getidfromURL} from 'utils/getidfromURL'


test('urlからidを取得1',()=>{
    expect(getidfromURL('/topic/74','topic')).toBe(74)
})


test('urlからidを取得2',()=>{
    expect(getidfromURL('/game/23','game')).toBe(23)
})


test('urlからidを取得3',()=>{
    expect(getidfromURL('/test/5','test')).toBe(5)
})