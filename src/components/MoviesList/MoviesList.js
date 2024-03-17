import { Spin } from 'antd';
import PropTypes from 'prop-types';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieCard from '../MovieCard/MovieCard';
import './MoviesList.css';

export default function MoviesList({
  isDataLoading,
  isError,
  activeTab,
  moviesDataArr,
  moviesIdRateObj,
  addRating,
}) {
  const moviesDataMapping = moviesDataArr.map((movieData) => (
    <MovieCard
      key={movieData.id}
      activeTab={activeTab}
      movieId={movieData.id}
      imgSrc={movieData.poster_path}
      movieTitle={movieData.original_title}
      movieReleaseDate={movieData.release_date}
      movieOverview={movieData.overview}
      movieRating={movieData.rating}
      moviesIdRateObj={moviesIdRateObj}
      addRating={addRating}
    />
  ));

  const moviesOrError = isError ? <ErrorMessage /> : moviesDataMapping;

  return (
    <ul
      className="movies-list"
      style={{ padding: moviesDataArr.length === 0 ? '0' : '20px 0 35px' }}
    >
      {isDataLoading ? <Spin size="large" /> : moviesOrError}
    </ul>
  );
}

MoviesList.defaultProps = {
  moviesIdRateObj: {},
};

MoviesList.propTypes = {
  activeTab: PropTypes.string.isRequired,
  isDataLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  moviesDataArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  moviesIdRateObj: PropTypes.objectOf(PropTypes.number),
  addRating: PropTypes.func.isRequired,
};
