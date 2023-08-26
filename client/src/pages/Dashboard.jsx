import { Col, Row } from 'antd';

import Parent from '../components/Parent/Parent';
import Child from '../components/Child/';

function Dashboard() {
  return (
    <Row>
      <Col span={24}>
        <Parent />
        <Child />
      </Col>
    </Row>
  )
}

export default Dashboard