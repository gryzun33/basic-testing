// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

afterEach(() => {
  throttledGetDataFromApi.cancel();
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    const mockGet = jest.fn().mockResolvedValue({ data: 'mockData' });
    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });
    await throttledGetDataFromApi('/posts');
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts';
    const mockGet = jest.fn().mockResolvedValue({ data: 'mockData' });
    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });
    await throttledGetDataFromApi(relativePath);
    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'mockData' });
    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });
    const data = await throttledGetDataFromApi('/posts');
    expect(data).toEqual('mockData');
  });
});
