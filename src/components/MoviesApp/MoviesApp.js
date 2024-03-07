import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { debounce } from 'lodash';
import FetchMoviesDataArr from '../FetchMoviesDataArr/FetchMoviesDataArr';
import SearchString from '../SearchString/SearchString';
import MoviesList from '../MoviesList/MoviesList';
import MoviesPagination from '../MoviesPagination/MoviesPagination';
import NoResultsMessage from '../NoResultsMessage/NoResultsMessage';
import OfflineMessage from '../OfflineMessage/OfflineMessage';
import './MoviesApp.css';

export default class MoviesApp extends Component {
  state = {
    queryText: '',
    page: 1,
    isDataLoading: true,
    isError: false,
    moviesDataArr: [],
    totalMovies: null,
  };

  componentDidMount() {
    this.getMoviesData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.queryText !== prevState.queryText || this.state.page !== prevState.page) {
      this.getMoviesData();
    }
  }

  onFetchError = () => this.setState({ isDataLoading: false, isError: true });

  getMoviesData = debounce(() => {
    FetchMoviesDataArr(this.state.queryText, this.state.page)
      .then((data) =>
        this.setState({
          isDataLoading: false,
          moviesDataArr: data.dataArr,
          totalMovies: data.totalMovies,
        }),
      )
      .catch(this.onFetchError);
  }, 750);

  onLabelChange = (e) => {
    this.setState({
      queryText: e.target.value,
    });
  };

  onPageChange = (page) => {
    this.setState({
      page,
    });
  };

  render() {
    const { queryText, isDataLoading, isError, moviesDataArr, totalMovies } = this.state;

    return (
      <section className="moviesApp">
        <Online>
          <SearchString queryText={queryText} onLabelChange={this.onLabelChange} />
          <MoviesList
            isDataLoading={isDataLoading}
            isError={isError}
            moviesDataArr={moviesDataArr}
          />
          {totalMovies === 0 && queryText ? <NoResultsMessage /> : null}
          <MoviesPagination totalMovies={totalMovies} onPageChange={this.onPageChange} />
        </Online>
        <Offline>
          <OfflineMessage />
        </Offline>
      </section>
    );
  }
}
