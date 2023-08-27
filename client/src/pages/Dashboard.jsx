import { Col, Row } from 'antd';
import { useCurrentUserContext } from '../context/CurrentUser';

import Parent from '../components/Parent/Parent';
import Child from '../components/Child/';
import { useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../graphql/queries'

function Dashboard() {
  const { currentUser } = useCurrentUserContext();

  const { loading, data } = useQuery(QUERY_CURRENT_USER, {
    variables: { email: currentUser.email }
  })
   if (loading) {
    return <div>Loading...</div>;
  }
  console.log('data>>>>.', data)
  const user = data?.getCurrentUser || []
  // console.log('cureentuserisChoreBuddy>>>>>', user.isChoreBuddy)

 
  return (
    <Row>
      <Col span={24}>
        {loading?(
          <div>Loading...</div> ): ( 
          user.isChoreBuddy ? <Child /> : <Parent />)}
      </Col>
    </Row>
  )
}

export default Dashboard