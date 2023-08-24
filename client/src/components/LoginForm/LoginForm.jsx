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
const { Title } = Typography;
import styles from './LoginForm.module.css';

import { LOGIN_USER } from '../../graphql/mutations';

import { useCurrentUserContext } from '../../context/CurrentUser';

export default function Login() {
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (values) => {
    try {
      const mutationResponse = await login({
        variables: {
          email: values.email,
          password: values.password
        },
      });
      const { token, user } = mutationResponse.data.login;
      loginUser(user, token);
      navigate('/dashboard');
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <Card bordered={false} style={{ width: 300 }} className={styles.loginForm}>
      {error ? (
        <div>
          <p className="error-text">The provided credentials are incorrect</p>
        </div>
      ) : null}
      <Form
        id="login-form"
        onFinish={handleFormSubmit}
        layout="vertical"
      >
        <Title>Login</Title>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your username!',
            },
          ]}
        >
          <Input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Password"
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
            value={formState.password}
            onChange={handleChange}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <p>
          Need an account? Sign up
          {' '}
          <Link to="/register">here</Link>
        </p>
      </Form>
    </Card>
  );
}