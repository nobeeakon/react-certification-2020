import fetchData from './fetchData';

describe('Testing fetchData function', () => {
  test('it should return an Array', async () => {
    const API_URL =
      'https://gist.githubusercontent.com/jparciga/1d4dd34fb06ba74237f8966e2e777ff5/raw/f3af25f1505deb67e2cc9ee625a633f24d8983ff/youtube-videos-mock.json';
    const result = (await fetchData(API_URL)) instanceof Array;
    expect(result).toBe(true);
  });

  test('Rejects on error', () => {
    expect.assertions(1);
    return expect(fetchData(null)).rejects.toThrow(Error);
  });
});
