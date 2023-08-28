import { Col, Row, Spin } from 'antd';
import { useCurrentUserContext } from '../context/CurrentUser';
import Parent from '../components/Parent/Parent';
import Child from '../components/Child/';
import { useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../graphql/queries'

function Dashboard() {
  const { currentUser } = useCurrentUserContext();
  console.log(currentUser)
  const { loading, data } = useQuery(QUERY_CURRENT_USER)

   if (loading) {
    return <Spin />;
  }
  
  const user = data?.getCurrentUser || []

 
  return (
    <Row>
      <Col span={24}>
        {loading?(
          <Spin /> ): ( 
          user.isChoreBuddy ? <Child /> : <Parent />)}
      </Col>
    </Row>
  )
}

export default Dashboard