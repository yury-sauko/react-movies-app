export default async function FetchMoviesDataArr() {
  try {
    const _baseUrl = 'https://api.themoviedb.org/3/search/';
    const targetUrl = 'movie';
    const queryString = '?query=return&include_adult=false&language=en-US&page=1';
    const url = _baseUrl + targetUrl + queryString;

    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDdmYjI2OGVmYzNhNTRlODFjYWFkYzk1ZGU0YzEyNCIsInN1YiI6IjY1ZDg3MTg2Y2VkYWM0MDE2MjUzY2ZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q0pNWFwFcUuVZ7yAcxMevBRrmp7eMQUFbBNlqK3tsIU',
      },
    };

    const response = await fetch(`${url}`, fetchOptions);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received status ${response.status}`);
    }

    const data = await response.json();
    const moviesDataArr = data.results;

    return moviesDataArr;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`${err.name}: ${err.message}`);
  }
}
