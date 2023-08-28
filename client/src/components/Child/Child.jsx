import { ChoreProvider } from '../../context/ChoreContext';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import {
  Col,
  Row,
  Card,
  Typography,
  List
} from 'antd';
const { Title } = Typography;
import Earnings from '../Earnings/';
import styles from "./Child.module.css";
import { useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER, QUERY_CHILD_CHORES } from '../../graphql/queries';

function Child() {
  return (
    <ChoreProvider>
      <ChildInner />
    </ChoreProvider>
  )
}

function ChildChoresList ({currentUserID}) {
  const { loading, data, error } = useQuery(QUERY_CHILD_CHORES, {
    variables: { childId: currentUserID }
});

console.log(data)

if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return <p>Error: {error.message}</p>;
}

const childChores = data.getChildChores;

  return (
    <> 
  <List
  bordered
  dataSource={childChores}
  renderItem={chore => (
      <List.Item
          style={chore.isComplete ? { textDecoration: 'line-through' } : {}}
      >
        {chore.title} - ${chore.rewardAmount}
      </List.Item>
  )}
  locale={{ emptyText: 'No chores assigned to you yet' }}
/>
</>
  )
}

const ChildInner = () => {
const { loading, data } = useQuery(QUERY_CURRENT_USER)
const currentUserFirstName = data.getCurrentUser.firstName;
const currentUserID = data.getCurrentUser._id;

ChildChoresList(currentUserID);
const adjustedStyles = useDarkModeStyles(styles);

  return (
    <>
      <Row className={styles.wrapper} justify="center">

        <Col xs={24} sm={16} className={styles.gutterRow}>
          <Card bordered={false} className={styles.choreList}>
            <Title className={styles.title}>{currentUserFirstName}'s Chores</Title>
            <ChildChoresList currentUserID={currentUserID} />
          </Card>
        </Col>

        <Col xs={24} sm={8} className={styles.gutterRow}>
          <Card bordered={false} className={adjustedStyles.earningsCard}>
            <Title className={adjustedStyles.title} level={2}>My Balance</Title>
            <Earnings />
          </Card>
        </Col>

      </Row>
    </>
  )
}

export default Child;
