import { createRoot } from 'react-dom/client';
import { Row, Col } from 'antd';
import MoviesApp from './components/MoviesApp/MoviesApp';

const root = createRoot(document.getElementById('root'));

root.render(
  <Row>
    <Col
      xs={{
        span: 24,
      }}
      sm={{
        span: 20,
        offset: 2,
      }}
      md={{
        span: 18,
        offset: 3,
      }}
    >
      <MoviesApp />
    </Col>
  </Row>,
);
