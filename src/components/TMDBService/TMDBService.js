export default class TMDBService {
  _apiBaseUrl = 'https://api.themoviedb.org/3/';

  async fetchBase(endPointUrl, fetchOptions) {
    const url = this._apiBaseUrl + endPointUrl;

    const response = await fetch(`${url}`, fetchOptions);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received status ${response.status}`);
    }

    const data = await response.json();

    return data;
  }

  async createGuestSession() {
    const thisEndPointUrl = 'authentication/guest_session/new';

    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDdmYjI2OGVmYzNhNTRlODFjYWFkYzk1ZGU0YzEyNCIsInN1YiI6IjY1ZDg3MTg2Y2VkYWM0MDE2MjUzY2ZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q0pNWFwFcUuVZ7yAcxMevBRrmp7eMQUFbBNlqK3tsIU',
      },
    };

    const data = await this.fetchBase(thisEndPointUrl, fetchOptions);

    return data.guest_session_id;
  }

  async getGenresArr() {
    const thisEndPointUrl = 'genre/movie/list?language=en';

    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDdmYjI2OGVmYzNhNTRlODFjYWFkYzk1ZGU0YzEyNCIsInN1YiI6IjY1ZDg3MTg2Y2VkYWM0MDE2MjUzY2ZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q0pNWFwFcUuVZ7yAcxMevBRrmp7eMQUFbBNlqK3tsIU',
      },
    };

    const data = await this.fetchBase(thisEndPointUrl, fetchOptions);

    return data.genres;
  }

  async getMoviesDataArr(queryText, page) {
    const thisBaseUrl = 'search/movie?query=';
    const queryParams = `&include_adult=false&language=en-US&page=${page}`;
    const thisEndPointUrl = thisBaseUrl + queryText + queryParams;

    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDdmYjI2OGVmYzNhNTRlODFjYWFkYzk1ZGU0YzEyNCIsInN1YiI6IjY1ZDg3MTg2Y2VkYWM0MDE2MjUzY2ZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q0pNWFwFcUuVZ7yAcxMevBRrmp7eMQUFbBNlqK3tsIU',
      },
    };

    const data = await this.fetchBase(thisEndPointUrl, fetchOptions);

    const result = { dataArr: data.results, totalMovies: !queryText ? null : data.total_results };

    return result;
  }

  async addRating(movieId, guestSessionId, ratingValue) {
    const thisBaseUrl = `movie/${movieId}/rating`;
    const queryParams = `?guest_session_id=${guestSessionId}`;
    const thisEndPointUrl = thisBaseUrl + queryParams;

    const fetchOptions = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDdmYjI2OGVmYzNhNTRlODFjYWFkYzk1ZGU0YzEyNCIsInN1YiI6IjY1ZDg3MTg2Y2VkYWM0MDE2MjUzY2ZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q0pNWFwFcUuVZ7yAcxMevBRrmp7eMQUFbBNlqK3tsIU',
      },
      body: `{"value":${ratingValue}}`,
    };

    const data = await this.fetchBase(thisEndPointUrl, fetchOptions);

    return data.success;
  }

  async getRatedMovies(guestSessionId, page) {
    const thisBaseUrl = `guest_session/${guestSessionId}/rated/movies`;
    const queryParams = `?language=en-US&page=${page}&sort_by=created_at.asc`;
    const thisEndPointUrl = thisBaseUrl + queryParams;

    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDdmYjI2OGVmYzNhNTRlODFjYWFkYzk1ZGU0YzEyNCIsInN1YiI6IjY1ZDg3MTg2Y2VkYWM0MDE2MjUzY2ZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q0pNWFwFcUuVZ7yAcxMevBRrmp7eMQUFbBNlqK3tsIU',
      },
    };

    const data = await this.fetchBase(thisEndPointUrl, fetchOptions);

    const result = { dataArr: data.results, totalMovies: data.total_results };

    return result;
  }
}
