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
const { Title, Text } = Typography;
import styles from './LoginForm.module.css';
import { LOGIN_USER } from '../../graphql/mutations';
import { useCurrentUserContext } from '../../context/CurrentUser';

export default function Login() {
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [login, { error }] = useMutation(LOGIN_USER);

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
    <Card bordered={false} style={{ width: 300 }} className={styles.loginForm}>
      <Form
        form={form}
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
              message: 'Please enter your email!',
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
        <p>
          Need an account? Sign up
          {' '}
          <Link to="/register">here</Link>
        </p>
      </Form>
    </Card>
  );
}