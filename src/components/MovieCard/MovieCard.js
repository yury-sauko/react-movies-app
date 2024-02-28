import { Component } from 'react';
import { format } from "date-fns";
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

    let trimmedText, 
        whitespaceIdx;

    // Название фильма (заголовок) в карточке в одну строку
    if (header.length < maxHeaderLength.oneStr) { 
        whitespaceIdx = text.lastIndexOf(' ', maxTextLength.h1str);
        trimmedText = text.length <= maxTextLength.h1str ? 
                        text : 
                        text.slice(0, whitespaceIdx + 1) + ' ...';
    // В две строки
    } else if (
        header.length >= maxHeaderLength.oneStr && 
        header.length < maxHeaderLength.twoStr
        ) {
        whitespaceIdx = text.lastIndexOf(' ', maxTextLength.h2str);
        trimmedText = text.length <= maxTextLength.h2str ? 
                        text : 
                        text.slice(0, whitespaceIdx + 1) + ' ...';
    // В три строки
    } else if (
        header.length >= maxHeaderLength.twoStr && 
        header.length < maxHeaderLength.threeStr
        ) {
        whitespaceIdx = text.lastIndexOf(' ', maxTextLength.h3str);
        trimmedText = text.length <= maxTextLength.h3str ? 
                        text : 
                        text.slice(0, whitespaceIdx + 1) + ' ...';
    // Четыре строки и более..?
    } else {
        whitespaceIdx = text.lastIndexOf(' ', maxTextLength.h4plus);
        trimmedText = text.length <= maxTextLength.h4plus ? 
                        text : 
                        text.slice(0, whitespaceIdx + 1) + ' ...';
    }

    return trimmedText;
}

export default class MovieCard extends Component {
    render() {
        const { imgSrc, movieTitle, movieReleaseDate, movieOverview } = this.props;
        const imgSrcBase = 'https://image.tmdb.org/t/p/original/';
        const noPosterUrl = 'https://www.kino-teatr.ru/static/images/no_poster.jpg';
        const releaseDate = movieReleaseDate.length > 0 ? 
                            format(movieReleaseDate, 'PP') : 
                            'Release date unknown';
        return (
            <li className='movie-card'>
                <img 
                    src={imgSrc ? `${imgSrcBase}${imgSrc}` : noPosterUrl} 
                    alt='Movie poster'
                    className='movie-poster'
                />
                <div className='movie-descr'>
                    <h3 className='movie-title'>{movieTitle}</h3>
                    <p className='movie-release-date'>{releaseDate}</p>
                    <span className='movie-genre btn-view'>Action</span>
                    <span className='movie-genre btn-view'>Drama</span>
                    <p className='movie-overview'>{trimMovieDescr(movieTitle, movieOverview)}</p>
                </div>
            </li>
        );
    }
}
