
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
import styles from './RegistrationForm.module.css';

import { REGISTER_USER } from '../../graphql/mutations';

import { useCurrentUserContext } from '../../context/CurrentUser';

export default function Registration() {
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [register, { error }] = useMutation(REGISTER_USER);

  const handleFormSubmit = async (values) => {
    try {
      const mutationResponse = await register({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        },
      });
      const { token, user } = mutationResponse.data.register;
      loginUser(user, token);
      navigate('/dashboard');
    } catch (e) {
    // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <Card bordered={false} style={{ width: 300 }} className={styles.registrationForm}>
      {error ? (
        <div>
          <p className="error-text">The provided credentials are incorrect</p>
        </div>
      ) : null}
      <Form
        id="registration-form"
        onFinish={handleFormSubmit}
        layout="vertical"
      >
        <Title>Register</Title>
        <Form.Item
          label="First name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your first name',
            },
          ]}
        >
          <Input
            id="firstName"
            name="firstName"
            placeholder="First name"
            value={formState.firstName}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input your last name',
            },
          ]}
        >
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last name"
            value={formState.lastName}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email address, this will be your username',
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
              message: 'Please input your password!',
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
          Sign Up
        </Button>
        <p>
          Already have an account? Login
          {' '}
          <Link to="/login">here</Link>
        </p>
      </Form>
    </Card>
  );
}