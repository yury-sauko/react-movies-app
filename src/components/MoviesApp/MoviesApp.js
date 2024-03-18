import { Component } from 'react';
import { Tabs, FloatButton } from 'antd';
import { Offline, Online } from 'react-detect-offline';
import { debounce } from 'lodash';
import TMDBService from '../TMDBService/TMDBService';
import SearchString from '../SearchString/SearchString';
import MoviesList from '../MoviesList/MoviesList';
import { MovieCardProvider } from '../MovieCardContext/MovieCardContext';
import MoviesPagination from '../MoviesPagination/MoviesPagination';
import NoResultsMessage from '../NoResultsMessage/NoResultsMessage';
import OfflineMessage from '../OfflineMessage/OfflineMessage';
import './MoviesApp.css';

export default class MoviesApp extends Component {
  state = {
    queryText: '',
    activeTab: '1',
    hasRatedMovie: false,
    queryPage: 1,
    ratedPage: 1,
    isDataLoading: false,
    isError: false,
    moviesGenresArr: [],
    queryMoviesDataArr: [],
    queryTotalMovies: null,
    ratedMoviesDataArr: [],
    ratedTotalMovies: 0,
    moviesIdRateObj: {},
    guestSessionId: null,
  };

  TMDBService = new TMDBService();

  componentDidMount() {
    this.createGuestSession();
    this.getGenresArr();
  }

  componentDidUpdate(prevProps, prevState) {
    const { queryText, queryPage, ratedPage, activeTab, hasRatedMovie } = this.state;

    if (queryText !== prevState.queryText || queryPage !== prevState.queryPage) {
      this.getMoviesData();
    }

    if (
      (activeTab !== prevState.activeTab && activeTab === '2' && hasRatedMovie) ||
      (queryPage !== prevState.queryPage && hasRatedMovie) ||
      ratedPage !== prevState.ratedPage
    ) {
      this.getRatedMovies();
    }
  }

  onFetchError = () => this.setState({ isDataLoading: false, isError: true });

  // eslint-disable-next-line react/sort-comp
  createGuestSession = () => {
    this.TMDBService.createGuestSession()
      .then((guestSessionId) =>
        this.setState({
          guestSessionId,
        }),
      )
      .catch(this.onFetchError);
  };

  getGenresArr = () => {
    this.TMDBService.getGenresArr()
      .then((moviesGenresArr) =>
        this.setState({
          moviesGenresArr,
        }),
      )
      .catch(this.onFetchError);
  };

  onLabelChange = (e) => {
    this.setState({
      queryText: e.target.value,
    });
  };

  onPageChange = (page) => {
    if (this.state.activeTab === '1') {
      this.setState({
        queryPage: page,
      });
    } else {
      this.setState({
        ratedPage: page,
        isDataLoading: true,
      });
    }
  };

  getMoviesData = debounce(() => {
    this.setState({
      isDataLoading: true,
    });

    this.TMDBService.getMoviesDataArr(this.state.queryText, this.state.queryPage)
      .then((data) =>
        this.setState({
          isDataLoading: false,
          queryMoviesDataArr: data.dataArr,
          queryTotalMovies: data.totalMovies,
        }),
      )
      .catch(this.onFetchError);
  }, 750);

  addRating = (ratingValue, movieId) => {
    const { hasRatedMovie, guestSessionId } = this.state;

    if (!hasRatedMovie) {
      this.setState({
        hasRatedMovie: true,
      });
    }

    this.TMDBService.addRating(movieId, guestSessionId, ratingValue)
      .then((res) => {
        if (res) {
          this.setState(({ moviesIdRateObj }) => {
            const newObj = { ...moviesIdRateObj };
            newObj[movieId] = ratingValue;

            return { moviesIdRateObj: newObj };
          });
        } else {
          // eslint-disable-next-line no-console
          console.log('Ошибка, рейтинг не добавлен!');
        }
      })
      .catch(this.onFetchError);
  };

  getRatedMovies = () => {
    const { ratedPage, activeTab, hasRatedMovie, guestSessionId } = this.state;

    if (activeTab === '2' && hasRatedMovie) {
      this.setState({
        isDataLoading: true,
      });
    }

    this.TMDBService.getRatedMovies(guestSessionId, ratedPage)
      .then((data) =>
        this.setState({
          isDataLoading: false,
          ratedMoviesDataArr: data.dataArr,
          ratedTotalMovies: data.totalMovies,
        }),
      )
      .catch(this.onFetchError);
  };

  render() {
    const {
      queryText,
      activeTab,
      isDataLoading,
      isError,
      moviesGenresArr,
      queryMoviesDataArr,
      queryTotalMovies,
      ratedMoviesDataArr,
      ratedTotalMovies,
      moviesIdRateObj,
    } = this.state;

    const pagTotalMovies = activeTab === '1' ? queryTotalMovies : ratedTotalMovies;

    const tabsItems = [
      {
        key: '1',
        label: 'Search',
        children: (
          <>
            <SearchString queryText={queryText} onLabelChange={this.onLabelChange} />
            <MoviesList
              activeTab={activeTab}
              isDataLoading={isDataLoading}
              isError={isError}
              moviesGenresArr={moviesGenresArr}
              moviesDataArr={queryMoviesDataArr}
              moviesIdRateObj={moviesIdRateObj}
              // addRating={this.addRating}
            />
            {queryTotalMovies === 0 && queryText ? (
              <NoResultsMessage activeTab={activeTab} />
            ) : null}
            <MoviesPagination totalMovies={pagTotalMovies} onPageChange={this.onPageChange} />
            <FloatButton.BackTop visibilityHeight={400} shape="square" />
          </>
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: (
          <>
            <MoviesList
              activeTab={activeTab}
              isDataLoading={isDataLoading}
              isError={isError}
              moviesGenresArr={moviesGenresArr}
              moviesDataArr={ratedMoviesDataArr}
              // addRating={this.addRating}
            />
            {ratedTotalMovies === 0 ? <NoResultsMessage activeTab={activeTab} /> : null}
            <MoviesPagination totalMovies={pagTotalMovies} onPageChange={this.onPageChange} />
            <FloatButton.BackTop visibilityHeight={400} shape="square" />
          </>
        ),
      },
    ];

    return (
      <section className="movies-app">
        <Online>
          <MovieCardProvider value={{ addRating: this.addRating }}>
            <Tabs
              items={tabsItems}
              defaultActiveKey="1"
              centered
              onChange={(activeKey) => this.setState({ activeTab: activeKey })}
            />
          </MovieCardProvider>
        </Online>
        <Offline>
          <OfflineMessage />
        </Offline>
      </section>
    );
  }
}
