import { Alert, Space } from 'antd';

export default function ErrorMessage() {
  return (
    <Space
      direction="vertical"
      style={{
        width: '70%',
      }}
    >
      <Alert
        message="Error"
        description="Something went wrong, try to change the query or come back later"
        type="error"
        showIcon
      />
    </Space>
  );
}
