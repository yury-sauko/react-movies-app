import { Alert, Space } from 'antd';

export default function OfflineMessage() {
  return (
    <Space
      direction="vertical"
      style={{
        paddingTop: '30px',
        width: '50%',
      }}
    >
      <Alert
        message="Warning"
        description="You're offline right now. Check your connection"
        type="warning"
        showIcon
      />
    </Space>
  );
}
