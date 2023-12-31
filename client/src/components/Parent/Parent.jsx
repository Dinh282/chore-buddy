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
import { PlusOutlined, UserAddOutlined, CheckSquareOutlined } from '@ant-design/icons';
import styles from "./Parent.module.css";
import { motion } from 'framer-motion';
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
  const [showDeleteModal, setShowDeleteModal] = useState(false); // manage visibility of Modal
  const [childToDelete, setChildToDelete] = useState(null);

  useEffect(() => {
    if (!loading && choreBuddies.length && activeUser.id === null) {
      setActiveUser({ id: choreBuddies[0]._id, name: choreBuddies[0].firstName, chores: [] });
    }
  }, [loading, isModalOpen]);

  if(loading) return (
    <div className={adjustedStyles.mainSpinner}>
      <Spin />
    </div>
  );

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

  const handleTabDeleteClick = (key) => {
    setChildToDelete(choreBuddies[parseInt(key)]); 
    setShowDeleteModal(true); // show the Modal when delete icon is clicked
  };
  
  const confirmDeleteChild = () => {
    if (childToDelete) {
      deleteChild({
        variables: {
          childId: childToDelete._id
        }
      });
      setShowDeleteModal(false); // hide the Modal after deletion
      setChildToDelete(null); // reset the childToDelete
    }
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
          <motion.div
          initial={{ scale: .5, opacity: 0}}
          animate={{ scale: 1, opacity: 1}}
          transition={{ duration: .3, delay:  .2 }}
          >
            <Card bordered={false} className={adjustedStyles.choreList}>
              <Title className={adjustedStyles.title}>Children</Title>
              {choreBuddies.length <= 1  ? "" : <Paragraph>Please select a chorebuddy!</Paragraph>} 
              {Object.keys(choreBuddies).length ? (
                <Tabs
                  defaultActiveKey="0"
                  onChange={handleTabChange}
                  type="editable-card"
                  hideAdd
                  onEdit={(editKey, action) => {
                    if (action === "remove") {
                      handleTabDeleteClick(editKey);
                    }
                  }}
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
            {childToDelete && (
              <Modal
                title="Confirm Deletion"
                open={showDeleteModal}
                onOk={confirmDeleteChild}
                onCancel={() => setShowDeleteModal(false)}
                okText="Delete"
                cancelText="Cancel"
              >
                <Paragraph className={adjustedStyles.modalText}>Are you sure you want to delete {childToDelete.firstName}? This action is irreversible.</Paragraph>
              </Modal>
            )}
          </motion.div>
        </Col>

        <Col xs={24} sm={8} className={styles.gutterRow}>
        <motion.div
        initial={{ scale: .5, opacity: 0}}
        animate={{ scale: 1, opacity: 1}}
        transition={{ duration: .3, delay:  .3 }}
        >
          <Card bordered={false} className={adjustedStyles.earningsCard}>
            <Title className={adjustedStyles.walletTitle} level={2}>Wallet</Title>
            <Earnings />
          </Card>
        </motion.div>
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