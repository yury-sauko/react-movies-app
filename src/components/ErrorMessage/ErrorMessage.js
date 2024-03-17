import { Alert, Space } from 'antd';

export default function ErrorMessage() {
  return (
    <Space
      direction="vertical"
      style={{
        paddingTop: '15px',
        paddingBottom: '15px',
        width: '50%',
      }}
    >
      <Alert
        message="Error"
        description="Something went wrong, please try restarting the app"
        type="error"
        showIcon
      />
    </Space>
  );
}
