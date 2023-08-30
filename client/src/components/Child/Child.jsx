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
import { motion } from 'framer-motion';

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
        <motion.div
        initial={{ scale: .5, opacity: 0}}
        animate={{ scale: 1, opacity: 1}}
        transition={{ duration: .3, delay:  .2 }}
        >
          <Card bordered={false} className={adjustedStyles.choreList}>
            <Title className={adjustedStyles.title}>{currentUserFirstName}&apos;s Chores</Title>
            {loading ? (
              <Skeleton active />
            ) : (
              <ChoreList choreBuddies={{ _id: currentUserId, chores: activeUserChores }} showDeleteButton={false} />
            )}
          </Card>
          </motion.div>
        </Col>

        <Col xs={24} sm={8} className={styles.gutterRow}>
         <motion.div
         initial={{ scale: .5, opacity: 0}}
         animate={{ scale: 1, opacity: 1}}
         transition={{ duration: .3, delay:  .3 }}
         >
          <Card bordered={false} className={adjustedStyles.earningsCard}>
            <Title className={adjustedStyles.earningsTitle} level={2}>My wallet</Title>
            <Earnings />
          </Card>
         </motion.div>
        </Col>

      </Row>
    </>
  )
}

export default Child;
