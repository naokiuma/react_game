import sum from 'utils/sum'

test('合計値チェック',()=>{
    expect(sum(2,3)).toBe(5);
})