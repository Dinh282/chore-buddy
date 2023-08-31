
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  Form,
  Input,
  Button
} from 'antd';
const { Title, Text, Paragraph } = Typography;
import styles from './RegistrationForm.module.css';
import { REGISTER_USER } from '../../graphql/mutations';
import { useCurrentUserContext } from '../../context/CurrentUser';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import { motion } from 'framer-motion';

export default function Registration({ isVisible}) {
  const adjustedStyles = useDarkModeStyles(styles);
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [duplicateEmailError, setDuplicateEmailError] = useState(false);
  const [register] = useMutation(REGISTER_USER);
   isVisible = true;
  const handleFormSubmit = async () => {
    try {
      setDuplicateEmailError(false);
      const formValues = await form.validateFields();
      const { firstName, lastName, email, password, family } = formValues;
      const mutationResponse = await register({
        variables: {
          firstName,
          lastName,
          email,
          password,
          family
        },
      });
      const { token, user } = mutationResponse.data.register;
      loginUser(user, token);
      navigate('/dashboard');
    } catch (e) {
      if (e?.message.includes("duplicate key error")) {
        // If error message indicates duplicate key error, set duplicateEmailError to true to alert user
        setDuplicateEmailError(true);
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
  };

  return (
    <div className={styles.backgroundContainer}>
    <div className={styles.blurredBgContainer}></div>

    {isVisible && (
    <motion.div
      key="registration-form"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: .2, delay:  .2 }}
    >
        
    <Card 
      bordered={false} 
      style={{ width: 300 }} 
      className={adjustedStyles.registrationForm}
    >
      <Form
        form={form}
        id="registration-form"
        onFinish={handleFormSubmit}
        layout="vertical"
      >
        <Title >Register</Title>
        <Form.Item
          label="First name"
          className={adjustedStyles.formItem}
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your first name',
            },
          ]}
        >
          <Input
            placeholder="First name"
          />
        </Form.Item>
        <Form.Item
          label="Last name"
          className={adjustedStyles.formItem}
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input your last name',
            },
          ]}
        >
          <Input
            placeholder="Last name"
          />
        </Form.Item>
        <Form.Item
          label="Family name"
          className={adjustedStyles.formItem}
          name="family"
          rules={[
            {
              required: true,
              message: 'Please input your family name',
            },
          ]}
        >
          <Input
            placeholder="Family name"
          />
        </Form.Item>
        <Form.Item
          label="Email"
          className={adjustedStyles.formItem}
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email address, this will be your username',
            },
            {
              type: 'email',
              message: 'Please enter a valid email address',
            },
          ]}
        >
          <Input
            placeholder="youremail@test.com"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          className={adjustedStyles.formItem}
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            { min: 5, message: "Password must be at least 5 characters" },
          ]}
        >
          <Input.Password
            placeholder="******"
          />
        </Form.Item>
        {duplicateEmailError && (
          <Form.Item>
            <Text type="danger">
              An account with that email already exists.
            </Text>
          </Form.Item>
        )}
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
        <Paragraph className={adjustedStyles.formText}>
          Already have an account? Login
          {' '}
          <Link to="/login">here</Link>
        </Paragraph>
      </Form>
    </Card>

     </motion.div>
)}

    </div>
  );
} 
