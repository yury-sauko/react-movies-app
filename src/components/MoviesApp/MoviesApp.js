import { Offline, Online } from 'react-detect-offline';
import MoviesList from '../MoviesList/MoviesList';
import OfflineMessage from '../OfflineMessage/OfflineMessage';
import './MoviesApp.css';

export default function MoviesApp() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Online>
        <MoviesList />
      </Online>
      <Offline>
        <OfflineMessage />
      </Offline>
    </div>
  );
}
