import { Alert, Space } from 'antd';

export default function OfflineMessage() {
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
      <Alert
        message="Warning"
        description="You're offline right now. Check your connection"
        type="warning"
        showIcon
      />
    </Space>
  );
}
