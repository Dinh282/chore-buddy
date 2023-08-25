import { useState, useContext } from 'react';
import { ChoreContext, ChoreProvider } from '../../context/ChoreContext';
import CreateChoreList from '../CreateChoreList/';
import ChoreList from '../ChoreList/';
import Earnings from '../Earnings/';
import {
  Col,
  Row,
  Tabs,
  Card,
  FloatButton,
  Modal,
  Tooltip
} from 'antd';
import { PlusOutlined, UserAddOutlined, CheckSquareOutlined } from '@ant-design/icons';
import styles from "./Parent.module.css";

function Parent() {
  return (
    <ChoreProvider>
      <ParentInner />
    </ChoreProvider>
  )
}

const ParentInner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users, setActiveUser, addUser } = useContext(ChoreContext);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  } 
  
  return (
    <>
      <Row className={styles.wrapper} justify="center">

        <Col span={16} className={styles.gutterRow}>
          <Card bordered={false} className={styles.choreList}>
            <Tabs
              defaultActiveKey="1"
              onChange={key => setActiveUser(Object.keys(users)[key])}
              items={Object.keys(users).map((userName, index) => ({
                label: userName,
                key: String(index),
                children: <ChoreList />
              }))}
            />
          </Card>
        </Col>

        <Col span={8} className={styles.gutterRow}>
          <Earnings />
        </Col>

      </Row>

      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{
          right: 24,
        }}
        icon={<PlusOutlined />}
      >
        {!isObjectEmpty(users) && (
          <Tooltip placement="left" title='Add a chore'>
            <FloatButton
              onClick={showModal}
              icon={<CheckSquareOutlined />}
            />
          </Tooltip>
        )}
        <Tooltip placement="left" title='Add a child'>
          <FloatButton
            onClick={() => addUser(prompt("Enter new user name"))}
            icon={<UserAddOutlined />}
          />
        </Tooltip>
      </FloatButton.Group>
      
      <Modal title="Add a chore"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CreateChoreList />
      </Modal>
    </>
  );
}

export default Parent;