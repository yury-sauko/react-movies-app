import { Component } from 'react';
import FetchMoviesDataArr from '../FetchMoviesDataArr/FetchMoviesDataArr';
import MovieCard from '../MovieCard/MovieCard';
import './MoviesList.css';

export default class MoviesList extends Component {
  constructor() {
    super();
    this.getMoviesData();
  }

  state = {
    moviesDataArr: [],
  };

  getMoviesData = () => {
    FetchMoviesDataArr().then((data) => this.setState({ moviesDataArr: data }));
  };

  render() {
    const { moviesDataArr } = this.state;
    return (
      <ul className="movies-list">
        {moviesDataArr.map((movieData) => (
          <MovieCard
            key={movieData.id}
            imgSrc={movieData.poster_path}
            movieTitle={movieData.original_title}
            movieReleaseDate={movieData.release_date}
            movieOverview={movieData.overview}
          />
        ))}
      </ul>
    );
  }
}
