import { Col, Row } from 'antd';
import { useCurrentUserContext } from '../context/CurrentUser';

import Parent from '../components/Parent/Parent';
import Child from '../components/Child/';

function Dashboard() {
  const { currentUser } = useCurrentUserContext();

  return (
    <Row>
      <Col span={24}>
        {currentUser.isChoreBuddy ? <Child /> : <Parent />}
      </Col>
    </Row>
  )
}

export default Dashboard