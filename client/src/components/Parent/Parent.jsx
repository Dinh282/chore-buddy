import { useState, useContext } from 'react';
import { ChoreContext, ChoreProvider } from '../../context/ChoreContext';
import CreateChoreList from '../CreateChoreList/';
import ChoreList from '../ChoreList/';
import Earnings from '../Earnings/';
import RegisterChoreBuddy from '../RegisterChoreBuddy';
import { useQuery } from '@apollo/client';
import { QUERY_CHILDREN_IN_FAMILY } from '../../graphql/queries';

import {
  Col,
  Row,
  Tabs,
  Card,
  FloatButton,
  Modal,
  Tooltip,
  Typography
} from 'antd';
const { Title } = Typography;
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
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const { users, setActiveUser } = useContext(ChoreContext);
  const { data } = useQuery(QUERY_CHILDREN_IN_FAMILY)
  console.log(data)
  const showModal = () => {
    setIsModalOpen(true);
  };
    const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleOk2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
   const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }
  
  return (
    <>
      <Row className={styles.wrapper} justify="center">

        <Col xs={24} sm={16} className={styles.gutterRow}>
          <Card bordered={false} className={styles.choreList}>
            <Title className={styles.title}>Chores</Title>
            {Object.keys(users).length ? (
              <Tabs
                defaultActiveKey="1"
                onChange={key => setActiveUser(Object.keys(users)[key])}
                items={Object.keys(users).map((userName, index) => ({
                  label: userName,
                  key: String(index),
                  children: <ChoreList />
                }))}
              />
            ) : (
              <p>Create a ChoreBuddy and add some chores to get started!</p>
            )}
          </Card>
        </Col>

        <Col xs={24} sm={8} className={styles.gutterRow}>
          <Card bordered={false}>
            <Title className={styles.title} level={2}>My balance</Title>
            <Earnings />
          </Card>
        </Col>

      </Row>

      <FloatButton.Group
        trigger="hover"
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
        <Tooltip placement="left" title='Add a chorebuddy'>
          <FloatButton
            onClick={showModal2}
            icon={<UserAddOutlined />}
          />
        </Tooltip>
      </FloatButton.Group>
      
      <Modal title="Add a chorebuddy"
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
        footer={null}
        >
        <RegisterChoreBuddy onCloseModal2={handleOk2} setIsModalOpen2={setIsModalOpen2}/>
      </Modal>

      <Modal title="Add a chore"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateChoreList onCloseModal={handleOk} />
      </Modal>
      
    </>
  );
}

export default Parent;