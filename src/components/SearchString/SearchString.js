import PropTypes from 'prop-types';
import './SearchString.css';

export default function SearchString({ queryText, onLabelChange }) {
  return (
    <input
      className="search-string"
      type="search"
      placeholder="Type to search..."
      name="searchInput"
      value={queryText}
      onChange={(e) => onLabelChange(e)}
    />
  );
}

SearchString.propTypes = {
  queryText: PropTypes.string.isRequired,
  onLabelChange: PropTypes.func.isRequired,
};
