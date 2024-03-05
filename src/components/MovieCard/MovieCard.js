import { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { format } from 'date-fns';
import './MovieCard.css';

function trimMovieDescr(header, text) {
  if (text.length === 0) return 'There should be an overview here ...';

  const maxTextLength = {
    h1str: 220,
    h2str: 175,
    h3str: 130,
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
  };

  static propTypes = {
    imgSrc: PropTypes.string,
    movieTitle: PropTypes.string,
    movieReleaseDate: PropTypes.string,
    movieOverview: PropTypes.string,
  };

  state = {
    isImgLoading: true,
  };

  onLoadImg = () => {
    this.setState({ isImgLoading: false });
  };

  onErrLoadImg = () => {
    this.setState({ isImgLoading: false });
  };

  render() {
    const { imgSrc, movieTitle, movieReleaseDate, movieOverview } = this.props;
    const { isImgLoading } = this.state;

    const _imgSrcBase = 'https://image.tmdb.org/t/p/w185/';
    const _noPosterUrl = 'https://www.jakartaplayers.org/uploads/1/2/5/5/12551960/2297419_orig.jpg';

    const releaseDate =
      movieReleaseDate.length > 0 ? format(movieReleaseDate, 'PP') : 'Release date unknown';

    return (
      <li className="movie-card">
        <div className="movie-poster-container">
          <img
            src={imgSrc ? `${_imgSrcBase}${imgSrc}` : _noPosterUrl}
            alt="We are sorry, but there was an error when uploading the poster"
            className="movie-poster"
            onLoad={this.onLoadImg}
            onError={this.onErrLoadImg}
            style={{ display: isImgLoading ? 'none' : 'block' }}
          />
          {isImgLoading ? <Spin /> : null}
        </div>
        <div className="movie-descr">
          <h3 className="movie-title">{movieTitle}</h3>
          <p className="movie-release-date">{releaseDate}</p>
          <span className="movie-genre btn-view">Action</span>
          <span className="movie-genre btn-view">Drama</span>
          <p className="movie-overview">{trimMovieDescr(movieTitle, movieOverview)}</p>
        </div>
      </li>
    );
  }
}
