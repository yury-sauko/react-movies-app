import { Component } from 'react';
import { Spin } from 'antd';
import FetchMoviesDataArr from '../FetchMoviesDataArr/FetchMoviesDataArr';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieCard from '../MovieCard/MovieCard';
import './MoviesList.css';

export default class MoviesList extends Component {
  constructor() {
    super();
    this.getMoviesData();
  }

  state = {
    isDataLoading: true,
    isError: false,
    moviesDataArr: [],
  };

  onFetchError = () => this.setState({ isDataLoading: false, isError: true });

  getMoviesData = () => {
    FetchMoviesDataArr()
      .then((data) => this.setState({ isDataLoading: false, moviesDataArr: data }))
      .catch(this.onFetchError);
  };

  render() {
    const { isDataLoading, isError, moviesDataArr } = this.state;

    const moviesDataMapping = moviesDataArr.map((movieData) => (
      <MovieCard
        key={movieData.id}
        imgSrc={movieData.poster_path}
        movieTitle={movieData.original_title}
        movieReleaseDate={movieData.release_date}
        movieOverview={movieData.overview}
      />
    ));

    const dataOrError = isError ? <ErrorMessage /> : moviesDataMapping;

    return <ul className="movies-list">{isDataLoading ? <Spin size="large" /> : dataOrError}</ul>;
  }
}
