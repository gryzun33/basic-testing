// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

// jest.mock('axios');

afterEach(() => {
  throttledGetDataFromApi.cancel();
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    const mockCreate = jest.spyOn(axios, 'create');
    const mockGet = jest.spyOn(axios.Axios.prototype, 'get');
    mockGet.mockResolvedValue({ data: expect.anything() });

    await throttledGetDataFromApi(expect.any(String));

    expect(axios.create).toHaveBeenCalledWith({ baseURL });
    expect(mockCreate.mock.results[0]?.value.defaults.baseURL).toBe(baseURL);
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts';
    const mockGet = jest.spyOn(axios.Axios.prototype, 'get');
    mockGet.mockResolvedValue({ data: expect.anything() });

    await throttledGetDataFromApi(relativePath);

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockGet = jest.spyOn(axios.Axios.prototype, 'get');
    mockGet.mockResolvedValue({ data: 'mockData' });

    const data = await throttledGetDataFromApi(expect.any(String));

    expect(data).toEqual('mockData');
  });
});
