import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Form,
  Typography,
  Input,
  Button,
} from 'antd';
const { Text } = Typography;
import { CREATE_CHILD } from '../../graphql/mutations';
import { QUERY_CHILDREN_IN_FAMILY } from '../../graphql/queries';

function RegisterChoreBuddy( {onCloseModal2} ) {
    const [form] = Form.useForm();
    const [duplicateEmailError, setDuplicateEmailError] = useState(false);
    const [register] = useMutation(CREATE_CHILD, {
    refetchQueries: [
      QUERY_CHILDREN_IN_FAMILY,
      'getChildrenInFamily'
    ]
  });
    
    const handleFormSubmit = async ( ) => {
    try {
      setDuplicateEmailError(false);
      const formValues = await form.validateFields();
      const { firstName, lastName, email, password } = formValues;
      const mutationResponse = await register({
        variables: {
          firstName,
          lastName,
          email,
          password
        },
      });
      mutationResponse.data.register;
      form.resetFields();
      onCloseModal2 && onCloseModal2();

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
        <Form
            form={form}
            id="register-choreBuddy-form"
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={{
                rewardAmount: '$5'
            }}
        >
            <Form.Item
                label="First name"
                name="firstName"
                rules={[
                    { required: true, 
                    message: 'Please enter your first name' }
                ]}
            >
            <Input placeholder="First name" />

            </Form.Item>
            <Form.Item
                label="Last name"
                name="lastName"
                rules={[
                    { required: true, 
                    message: 'Please enter your last name' }
                ]}
            >
            <Input placeholder="Last name" />

            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, 
                    message: 'Please enter your email' 
                   },                
                   {
                    type: 'email',
                    message: 'Please enter a valid email address',
                   },
                ]}
            >
            <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, 
                    message: 'Please enter your password' },
                    { min: 5, message: "Password must be at least 5 characters" },
                ]}
            >
            <Input.Password placeholder="******" />

            </Form.Item>
            {duplicateEmailError && (
          <Form.Item>
            <Text type="danger">
              An account with that email already exists.
            </Text>
          </Form.Item>
        )}

            <Button type="primary" htmlType="submit">
                Create
            </Button>
        </Form>
    )
}

export default RegisterChoreBuddy;