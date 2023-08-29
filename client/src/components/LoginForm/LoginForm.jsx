
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  message
} from 'antd';
const { Title, Text, Paragraph } = Typography;
import styles from './LoginForm.module.css';
import { LOGIN_USER } from '../../graphql/mutations';
import { useCurrentUserContext } from '../../context/CurrentUser';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import { motion } from 'framer-motion';

export default function Login() {
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [login, { error }] = useMutation(LOGIN_USER);
  const [isShown, setIsShown] = useState(true);
  const adjustedStyles = useDarkModeStyles(styles);

  const handleClick = () => {
    setIsShown(!isShown)
  }
  const handleFormSubmit = async () => {
    try {
      const formValues = await form.validateFields();
      const { email, password } = formValues;
      const mutationResponse = await login({
        variables: {
          email,
          password,
        },
      });
      const { token, user } = mutationResponse.data.login;
      loginUser(user, token);
      navigate('/dashboard');
    } catch (e) {
      console.log(e);
      message.error("Login Unsuccessful.");
    }
  };

  return (
    
    <div className={styles.backgroundContainer}>
    <div className={styles.blurredBgContainer}></div>

    {isShown && 
    (<motion.div
    key="login-form"
    initial={{y: '50%', opacity: 0, scale: 0.5}}
    animate={{y: 0, opacity: 1, scale: 1}}
    transition={{duration: 0.2, ease: 'easeOut'}}
    >
    <Card bordered={false} style={{ width: 300 }} className={adjustedStyles.loginForm}>
      <Form
        form={form}
        id="login-form"
        onFinish={handleFormSubmit}
        layout="vertical"
      >
        <Title>Login</Title>
        <Form.Item
          label="Email"
          className={adjustedStyles.formItem}
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
            },
            {
              type: 'email',
              message: 'Please enter a valid email address',
            },
          ]}
        >
          <Input
            placeholder="youremail@test.com"
            name="email"
            type="email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          className={adjustedStyles.formItem}
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
          ]}
        >
          <Input.Password
            placeholder="******"
            name="password"
            type="password"
          />
        </Form.Item>
        {error ? (
        <div style={{ paddingBottom: '20px' }}>
          <p className="error-text"><Text type='danger'>The provided credentials are incorrect </Text></p>
        </div>
      ) : null}
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <Paragraph className={adjustedStyles.formText}>
          Need an account? Sign up
          {' '}
          <Link onClick={handleClick} to="/register">here</Link>
        </Paragraph>
      </Form>
    </Card>
    </motion.div>)}
    </div>
    
  );
}