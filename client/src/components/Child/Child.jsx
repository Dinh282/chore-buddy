import { ChoreProvider } from '../../context/ChoreContext';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import {
  Col,
  Row,
  Card,
  Typography
} from 'antd';
const { Title } = Typography;
import Earnings from '../Earnings/';
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
const { loading, data } = useQuery(QUERY_CURRENT_USER)
const currentUserFirstName = data.getCurrentUser.firstName;

  const adjustedStyles = useDarkModeStyles(styles);
  return (
    <>
      <Row className={styles.wrapper} justify="center">

        <Col xs={24} sm={16} className={styles.gutterRow}>
          <Card bordered={false} className={styles.choreList}>
            <Title className={styles.title}>{currentUserFirstName}'s Chores</Title>
            {/* <ChildChoresList /> */}
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

  const ChildChoresList = () => {



  }


}

export default Child;
