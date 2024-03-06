import { Alert, Space } from 'antd';

export default function NoResultsMessage() {
  return (
    <Space
      direction="vertical"
      style={{
        paddingTop: '15px',
        paddingLeft: '3.5%',
        width: '50%',
      }}
    >
      <Alert
        message="We are so sorry..."
        description="The search did not yield any results. Try to change the query"
        type="info"
      />
    </Space>
  );
}
