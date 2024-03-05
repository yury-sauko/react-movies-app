import { Component } from 'react';
import { Spin } from 'antd';
import FetchMoviesDataArr from '../FetchMoviesDataArr/FetchMoviesDataArr';
import MovieCard from '../MovieCard/MovieCard';
import './MoviesList.css';

export default class MoviesList extends Component {
  constructor() {
    super();
    this.getMoviesData();
  }

  state = {
    isDataLoading: true,
    moviesDataArr: [],
  };

  getMoviesData = () => {
    FetchMoviesDataArr().then((data) =>
      this.setState({ isDataLoading: false, moviesDataArr: data }),
    );
  };

  render() {
    const { isDataLoading, moviesDataArr } = this.state;
    const moviesDataMapping = moviesDataArr.map((movieData) => (
      <MovieCard
        key={movieData.id}
        imgSrc={movieData.poster_path}
        movieTitle={movieData.original_title}
        movieReleaseDate={movieData.release_date}
        movieOverview={movieData.overview}
      />
    ));

    return (
      <ul className="movies-list">{isDataLoading ? <Spin size="large" /> : moviesDataMapping}</ul>
    );
  }
}
