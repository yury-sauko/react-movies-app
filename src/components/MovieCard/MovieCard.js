import { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin, Rate } from 'antd';
// import { StarFilled } from '@ant-design/icons';
import { format } from 'date-fns';
import { MovieCardConsumer } from '../MovieCardContext/MovieCardContext';
import './MovieCard.css';
import noPosterImg from './no-poster-img.jpg';

function trimMovieDescr(header, text) {
  if (text.length === 0) return 'Sorry, there is no overview for this movie.';

  const maxTextLength = {
    h1str: 190,
    h2str: 145,
    h3str: 100,
    h4plus: 70,
  };

  if (text.length <= maxTextLength.h4plus) return text;

  const maxHeaderLength = {
    oneStr: 22,
    twoStr: 44,
    threeStr: 62,
  };

  let trimmedText;
  let whitespaceIdx;

  // Название фильма (заголовок) в карточке в одну строку
  if (header.length < maxHeaderLength.oneStr) {
    whitespaceIdx = text.lastIndexOf(' ', maxTextLength.h1str);
    trimmedText =
      text.length <= maxTextLength.h1str ? text : `${text.slice(0, whitespaceIdx + 1)} ...`;
    // В две строки
  } else if (header.length >= maxHeaderLength.oneStr && header.length < maxHeaderLength.twoStr) {
    whitespaceIdx = text.lastIndexOf(' ', maxTextLength.h2str);
    trimmedText =
      text.length <= maxTextLength.h2str ? text : `${text.slice(0, whitespaceIdx + 1)} ...`;
    // В три строки
  } else if (header.length >= maxHeaderLength.twoStr && header.length < maxHeaderLength.threeStr) {
    whitespaceIdx = text.lastIndexOf(' ', maxTextLength.h3str);
    trimmedText =
      text.length <= maxTextLength.h3str ? text : `${text.slice(0, whitespaceIdx + 1)} ...`;
    // Четыре строки и более..?
  } else {
    whitespaceIdx = text.lastIndexOf(' ', maxTextLength.h4plus);
    trimmedText =
      text.length <= maxTextLength.h4plus ? text : `${text.slice(0, whitespaceIdx + 1)} ...`;
  }

  return trimmedText;
}

export default class MovieCard extends Component {
  static defaultProps = {
    imgSrc: '',
    movieTitle: 'Movie title unknown',
    movieReleaseDate: '',
    movieOverview: "This movie hasn't overview",
    movieRating: 0,
  };

  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    moviesGenresArr: PropTypes.arrayOf(PropTypes.object).isRequired,
    genreIdsArr: PropTypes.arrayOf(PropTypes.number).isRequired,
    movieId: PropTypes.number.isRequired,
    imgSrc: PropTypes.string,
    movieTitle: PropTypes.string,
    movieReleaseDate: PropTypes.string,
    movieOverview: PropTypes.string,
    movieRating: PropTypes.number,
    moviesIdRateObj: PropTypes.objectOf(PropTypes.number).isRequired,
    // addRating: PropTypes.func.isRequired,
  };

  state = {
    isImgLoading: true,
    rateValue: 0,
  };

  handleImgLoading = () => {
    this.setState({ isImgLoading: false });
  };

  // handleRateValue = (value) => {
  //   this.setState({ rateValue: value });
  //   this.props.addRating(value, this.props.movieId);
  // };

  render() {
    const {
      activeTab,
      moviesGenresArr,
      genreIdsArr,
      imgSrc,
      movieId,
      movieTitle,
      movieReleaseDate,
      movieOverview,
      movieRating,
      moviesIdRateObj,
    } = this.props;

    const { isImgLoading, rateValue } = this.state;

    const _imgSrcBase = 'https://image.tmdb.org/t/p/w185/';

    let colorMovieRateCurrent;
    const rate = activeTab === '1' ? rateValue : movieRating;
    if (rate <= 3) colorMovieRateCurrent = '#E90000';
    else if (rate > 3 && rate <= 5) colorMovieRateCurrent = '#E97E00';
    else if (rate > 5 && rate <= 7) colorMovieRateCurrent = '#E9D100';
    else colorMovieRateCurrent = '#66E900';

    const isMovieHasRating = Object.prototype.hasOwnProperty.call(moviesIdRateObj, movieId);
    const rateValueTab1 =
      rateValue === 0 && isMovieHasRating ? moviesIdRateObj[movieId] : rateValue;
    const rateCurTab1 = rateValueTab1 === 0 ? 'Rate!' : rateValueTab1;

    const releaseDate =
      movieReleaseDate.length > 0 ? format(movieReleaseDate, 'PP') : 'Release date unknown';

    const genresNamesArr = moviesGenresArr
      .filter((genresObj) => genreIdsArr.includes(genresObj.id))
      .map((genresObj) => genresObj.name);

    let genreKey = 0;
    const genresIconsArr = genresNamesArr.map((genre) => {
      genreKey += 1;
      return (
        <span key={genreKey} className="movie-genre btn-view">
          {genre}
        </span>
      );
    });

    return (
      <MovieCardConsumer>
        {({ addRating }) => (
          <li className="movie-card">
            <div className="movie-poster-container">
              <img
                src={imgSrc ? `${_imgSrcBase}${imgSrc}` : noPosterImg}
                alt="We are sorry, but there was an error when uploading the poster"
                className="movie-poster"
                onLoad={this.handleImgLoading}
                onError={this.handleImgLoading}
                style={{ display: isImgLoading ? 'none' : 'block' }}
              />
              {isImgLoading ? <Spin /> : null}
            </div>
            <div className="movie-descr">
              <h3 className="movie-title">{movieTitle}</h3>
              <div
                className="movie-rate-current"
                style={{ borderColor: `${colorMovieRateCurrent}` }}
              >
                {activeTab === '1' ? rateCurTab1 : movieRating}
              </div>
              <p className="movie-release-date">{releaseDate}</p>
              <ul className="movie-genres-list">{genresIconsArr}</ul>
              <p className="movie-overview">{trimMovieDescr(movieTitle, movieOverview)}</p>
              <Rate
                className="movie-rate-stars"
                // character={<StarFilled style={{ width: '17px' }} />}
                allowHalf
                allowClear={false}
                count={10}
                value={activeTab === '1' ? rateValueTab1 : movieRating}
                disabled={activeTab === '2'}
                onChange={(value) => {
                  this.setState({ rateValue: value });
                  addRating(value, this.props.movieId);
                }}
              />
            </div>
          </li>
        )}
      </MovieCardConsumer>
    );
  }
}
