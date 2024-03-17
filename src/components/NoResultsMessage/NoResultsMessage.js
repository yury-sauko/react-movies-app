import { Alert, Space } from 'antd';
import PropTypes from 'prop-types';

export default function NoResultsMessage({ activeTab }) {
  let mess;
  let descr;
  if (activeTab === '1') {
    mess = 'We are so sorry...';
    descr = 'The search did not yield any results. Try to change the query';
  } else {
    mess = 'Oops...';
    descr = "You haven't rated any movies yet";
  }

  return (
    <Space
      direction="vertical"
      style={{
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '25%',
        width: '50%',
      }}
    >
      <Alert message={mess} description={descr} type="info" />
    </Space>
  );
}

NoResultsMessage.defaultProps = {
  activeTab: '1',
};

NoResultsMessage.propTypes = {
  activeTab: PropTypes.string,
};
