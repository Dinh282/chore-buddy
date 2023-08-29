import { useState, useContext, useEffect } from 'react';
import { ChoreContext, ChoreProvider } from '../../context/ChoreContext';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import CreateChoreList from '../CreateChoreList/';
import ChoreList from '../ChoreList/';
import Earnings from '../Earnings/';
import RegisterChoreBuddy from '../RegisterChoreBuddy';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CHILDREN_IN_FAMILY } from '../../graphql/queries';
import { DELETE_CHILD } from '../../graphql/mutations';
import {
  Col,
  Row,
  Tabs,
  Card,
  FloatButton,
  Modal,
  Tooltip,
  Typography,
  Spin
} from 'antd';
const { Title, Paragraph } = Typography;
import { PlusOutlined, UserAddOutlined, CheckSquareOutlined, LoadingOutlined, EditOutlined } from '@ant-design/icons';
import styles from "./Parent.module.css";

const loadingIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function Parent() {
  return (
    <ChoreProvider>
      <ParentInner />
    </ChoreProvider>
  )
}

const ParentInner = () => {
  const { loading, data } = useQuery(QUERY_CHILDREN_IN_FAMILY)
  const [deleteChild] = useMutation(DELETE_CHILD, {
    refetchQueries: [
      QUERY_CHILDREN_IN_FAMILY,
      'getChildrenInFamily'
    ]
  })
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const {activeUser, setActiveUser } = useContext(ChoreContext);
  const adjustedStyles = useDarkModeStyles(styles);
  const choreBuddies = data?.getChildrenInFamily;

  
 
  useEffect(() => {
    if (!loading && choreBuddies && choreBuddies.length > 0) {
      setActiveUser({ id: choreBuddies[0]._id, name: choreBuddies[0].firstName, chores: [] });
    }
  }, [loading, choreBuddies]);

  if (loading) return <Spin />;

  // console.log('>>>>>>>>CHOREBUDDIES', choreBuddies)
  console.log('>>>>>>>>ActiveUser', activeUser)

  const handleTabChange = (key) => {
    const activeBuddy = choreBuddies[parseInt(key)];
    setActiveUser({ id: activeBuddy._id, name: activeBuddy.firstName, chores: [] });

  };
  const onEdit = (key) => {
    const activeBuddy = choreBuddies[parseInt(key)];
    deleteChild({
      variables: {
        childId: activeBuddy._id
      }
    })
  };

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
          <Card bordered={false} className={adjustedStyles.choreList}>
            <Title className={adjustedStyles.title}>Children</Title>
            {choreBuddies.length <= 1  ? console.log(choreBuddies) : <Paragraph>Please select a chorebuddy!</Paragraph>} 
            {Object.keys(choreBuddies).length ? (
              <Tabs
                onChange={handleTabChange}
                type="editable-card"
                hideAdd
                onEdit={onEdit}
                items={Object.keys(choreBuddies).map((buddies, index) => ({
                  label: choreBuddies[index].firstName,
                  key: String(index),
                  children: <ChoreList choreBuddies={choreBuddies[index]} showDeleteButton={true} />
                }))}
              />
            ) : (
              <Paragraph className={adjustedStyles.text}>Create a ChoreBuddy and add some chores to get started!</Paragraph>
            )}
          </Card>
        </Col>

        <Col xs={24} sm={8} className={styles.gutterRow}>
          <Card bordered={false} className={adjustedStyles.earningsCard}>
            <Title className={adjustedStyles.title} level={2}>Wallet</Title>
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
        {!isObjectEmpty(choreBuddies) && (
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
        <RegisterChoreBuddy onCloseModal2={handleOk2} />
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