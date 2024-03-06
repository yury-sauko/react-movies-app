import { Spin } from 'antd';
import PropTypes from 'prop-types';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieCard from '../MovieCard/MovieCard';
import './MoviesList.css';

export default function MoviesList({ isDataLoading, isError, moviesDataArr }) {
  const moviesDataMapping = moviesDataArr.map((movieData) => (
    <MovieCard
      key={movieData.id}
      imgSrc={movieData.poster_path}
      movieTitle={movieData.original_title}
      movieReleaseDate={movieData.release_date}
      movieOverview={movieData.overview}
    />
  ));

  const moviesOrError = isError ? <ErrorMessage /> : moviesDataMapping;

  return (
    <ul className="movies-list" style={{ padding: moviesDataArr.length === 0 ? '0' : '35px 0' }}>
      {isDataLoading ? <Spin size="large" /> : moviesOrError}
    </ul>
  );
}

MoviesList.propTypes = {
  isDataLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  moviesDataArr: PropTypes.arrayOf(PropTypes.object).isRequired,
};
