import { createRoot } from 'react-dom/client';
import { Row, Col } from 'antd';
import MoviesApp from './components/MoviesApp/MoviesApp';

const root = createRoot(document.getElementById('root'));

root.render(
    <Row>
        <Col span={16} offset={4}>
            <MoviesApp />
        </Col>
    </Row>
);
