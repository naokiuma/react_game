import axios from 'axios'
import { renderHook, act } from '@testing-library/react-hooks'
// import {GetTopics} from "infrastructure/topicDriver";
import {useGetTopics} from "infrastructure/topicDriver";




//モジュール名を渡すことで、モジュール全体をモック化できる。p71
jest.mock('axios')
test('should fetch topics', async() => {

	const mockData = [{ id: 1, title: 'Topic 1' }, { id: 2, title: 'Topic 2' }];
	const res = { data: mockData };
    (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(res)//resを返してくれるようになる


	//カスタムフックを実施
	const {result,waitForNextUpdate} = renderHook(() => useGetTopics())

	//関数を実行。一度ローディングし、解除してからtopicsの中身がmockと一致する。
	result.current.getTopics();

	expect(result.current.loading).toBe(true);

	await waitForNextUpdate();

	expect(result.current.loading).toBe(false);
	expect(result.current.topics).toEqual(mockData)

 })

 jest.mock('axios')
test('should fetch specific topics', async() => {

	const mockData = [{ id: 1, title: 'Topic 1' }];
	const res = { data: mockData };
    (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(res)//resを返してくれるようになる


	//カスタムフックを実施
	const {result,waitForNextUpdate} = renderHook(() => useGetTopics(1))

	//関数を実行。一度ローディングし、解除してからtopicsの中身がmockと一致する。
	result.current.getTopics();

	expect(result.current.loading).toBe(true);

	await waitForNextUpdate();

	expect(result.current.loading).toBe(false);
	expect(result.current.topics).toEqual(mockData)

 })


// test('should fetch all topics', async () => {
// 	const {getTopics}  = useGetTopics()

//     const topics = [{ topic: ['id','name'] }]//mockデータ
//     const res = { data: topics };
//     (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(res)//resを返してくれるようになる
//     // axios.get.mockResolvedValue(resp)//通常はこれ書く
//     // axios.get.mockImplementation(() => Promise.resolve(resp)) // 上記のmockResolvedValueと同 じ設定

//     await expect(getTopics()).resolves.toEqual(topics)
//  })