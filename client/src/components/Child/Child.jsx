import { useContext } from 'react';
import { ChoreContext, ChoreProvider } from '../../context/ChoreContext';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import {
  Col,
  Row,
  Card,
  Typography,
  Skeleton
} from 'antd';
const { Title } = Typography;
import Earnings from '../Earnings/';
import ChoreList from '../ChoreList/';
import styles from "./Child.module.css";
import { useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../../graphql/queries';

function Child() {
  return (
    <ChoreProvider>
      <ChildInner />
    </ChoreProvider>
  )
}

const ChildInner = () => {
  const { loading, data } = useQuery(QUERY_CURRENT_USER);
  const currentUserId = data?.getCurrentUser?._id;
  const currentUserFirstName = data?.getCurrentUser?.firstName;
  const { users } = useContext(ChoreContext);
  const activeUserChores = users[currentUserFirstName]?.chores || [];

  const adjustedStyles = useDarkModeStyles(styles);
  
  return (
    <>
      <Row className={styles.wrapper} justify="center">

        <Col xs={24} sm={16} className={styles.gutterRow}>
          <Card bordered={false} className={adjustedStyles.choreList}>
            <Title className={adjustedStyles.title}>{currentUserFirstName}&apos;s Chores</Title>
            {loading ? (
              <Skeleton active />
            ) : (
              <ChoreList choreBuddies={{ _id: currentUserId, chores: activeUserChores }} showDeleteButton={false} />
            )}
          </Card>
        </Col>

        <Col xs={24} sm={8} className={styles.gutterRow}>
          <Card bordered={false} className={adjustedStyles.earningsCard}>
            <Title className={adjustedStyles.title} level={2}>My wallet</Title>
            <Earnings />
          </Card>
        </Col>

      </Row>
      <Col xs={20} sm={14} className={styles.gutterRow}>
          <Card bordered={false} className={styles.choreList}>
            <Title className={styles.title}> Earn More</Title>
          </Card>
        </Col>
    </>
  )
}

export default Child;
