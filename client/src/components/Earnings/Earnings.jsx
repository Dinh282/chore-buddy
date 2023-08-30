import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { ChoreContext } from '../../context/ChoreContext';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import { Typography, Skeleton, Row, Col, Button, Form, InputNumber, Modal } from 'antd';
import styles from './Earnings.module.css';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_CHILDREN_IN_FAMILY, QUERY_CURRENT_USER } from '../../graphql/queries';
import { EditOutlined } from '@ant-design/icons';
import { UPDATE_BALANCE } from '../../graphql/mutations'

const { Paragraph } = Typography;

const Earnings = () => {
  const { users } = useContext(ChoreContext);
  const adjustedStyles = useDarkModeStyles(styles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: '', balance: 0 });
  const [form] = Form.useForm();
  const [updateBalance] = useMutation(UPDATE_BALANCE)

  useEffect(() => {
    form.setFieldsValue({
      balance: currentUser.balance
    });
  }, [currentUser, form]);

  const showModal = (index) => {
    const currentUserBalance = choreBuddies[index].balance
    const childId = choreBuddies[index]._id
    setCurrentUser({ id: childId, balance: currentUserBalance })
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    loading: userLoading,
    data: userData,
    error: userError,
  } = useQuery(QUERY_CURRENT_USER);

  const {
    loading: childrenLoading,
    data: childrenData,
    error: childrenError,
  } = useQuery(QUERY_CHILDREN_IN_FAMILY);

  if (userLoading || childrenLoading) {
    return <Skeleton active title={false} paragraph={{ rows: 2 }} />;
  }

  if (userError || !userData) {
    return <div>Error loading user data.</div>;
  }

  const isChoreBuddy = userData.getCurrentUser.isChoreBuddy;
  const balance = userData.getCurrentUser.balance;

  if (isChoreBuddy) {
    return <Paragraph className={adjustedStyles.myBalance}>${balance}</Paragraph>;
  }

  if (childrenError || !childrenData) {
    return <div>Error loading children data.</div>;
  }

  const choreBuddies = childrenData.getChildrenInFamily || [];

  const handleBalance = async () => {
    try {
      const formValues = await form.validateFields();
      const { balance } = formValues;

      await updateBalance({
        variables: {
          userId: currentUser.id,
          balance
        }
      })
      setIsModalOpen(false);
    }
    catch (error) {
      if (error) {
        console.log(error, "error!")
      }
    }
  }

  return (
    <>
      {choreBuddies.length > 0 ? (
        choreBuddies.map((buddy, index) => (
          <React.Fragment key={index}>
            <Row className={adjustedStyles.walletRow}>
              <Col span={12}>
                <Paragraph key={index} className={adjustedStyles.text}>
                  {buddy.firstName}:
                </Paragraph>
              </Col>
              <Row>
                <Col span={12}>
                  <Paragraph key={index} className={adjustedStyles.textRight}>
                    ${buddy.balance}
                  </Paragraph>
                </Col>
                <Col span={8}>
                  <Button key={index} type="link" className={adjustedStyles.textRight} style={{ fontSize: '16px' }} onClick={() => showModal(index)}>
                    <EditOutlined style={{ fontSize: '16px', color: 'white' }} />
                  </Button>
                </Col>
              </Row>
            </Row>
            <Modal title="Balance"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}>
              <Form
                form={form}
                id="add-chore-form"
                layout="vertical"
                initialValues={{
                  balance: currentUser.balance
                }}
              >
                <Form.Item
                  label="Edit your child's balance"
                  name="balance"
                  rules={[
                    { required: true, message: 'Please type in the amount' }
                  ]}
                >
                  <InputNumber
                    min={0}
                    formatter={value => `$ ${value}`}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Button type="primary" htmlType="submit" onClick={() => handleBalance(buddy)}>
                  Done
                </Button>
              </Form>
            </Modal>
          </React.Fragment>
        ))
      ) : (
        <Paragraph className={adjustedStyles.text}>An empty wallet is a sad wallet.</Paragraph>
      )}
    </>
  );
};

export default Earnings;
