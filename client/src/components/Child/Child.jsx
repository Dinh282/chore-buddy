import { ChoreProvider } from '../../context/ChoreContext';
import {
  Col,
  Row,
  Card,
  Typography
} from 'antd';
const { Title } = Typography;
import Earnings from '../Earnings/';
import styles from "./Child.module.css";

function Child() {
  return (
    <ChoreProvider>
      <ChildInner />
    </ChoreProvider>
  )
}

const ChildInner = () => {
  return (
    <>
      <Row className={styles.wrapper} justify="center">
        <Col span={16} className={styles.gutterRow}>
          <Card bordered={false} className={styles.choreList}>
            <Title className={styles.title}>Child dashboard</Title>
          </Card>
        </Col>

        <Col span={8} className={styles.gutterRow}>
          <Card bordered={false}>
            <Title className={styles.title}>My balance</Title>
            <Earnings />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Child;
