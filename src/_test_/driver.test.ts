import axios from 'axios'
import {GetTopics} from "../infrastructure/topicDriver";

jest.mock('axios')

test('should fetch all topics', async () => {
    const topics = [{ topic: ['id','name'] }]
    const res = { data: topics };
    (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(res)//resを返してくれるようになる
    // axios.get.mockResolvedValue(resp)//通常はこれ書く
    // axios.get.mockImplementation(() => Promise.resolve(resp)) // 上記のmockResolvedValueと同 じ設定

    await expect(GetTopics()).resolves.toEqual(topics) })