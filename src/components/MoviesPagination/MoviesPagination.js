import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import './MoviesPagination.css';

export default function MoviesPagination({ totalMovies, onPageChange }) {
  return (
    <Pagination
      className="movies-pagination"
      defaultCurrent={1}
      defaultPageSize={20}
      showSizeChanger={false}
      size="small"
      total={totalMovies}
      onChange={(page) => onPageChange(page)}
    />
  );
}

MoviesPagination.defaultProps = {
  totalMovies: 0,
};

MoviesPagination.propTypes = {
  totalMovies: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};
