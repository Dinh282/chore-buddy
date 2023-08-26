// import { useState } from "react";
import {
  Form,
  Input,
  Button,
} from 'antd';


function RegisterChoreBuddy() {
    const [form] = Form.useForm();
    
    

    return (
        <Form
            form={form}
            id="register-choreBuddy-form"
            layout="vertical"
            initialValues={{
                rewardAmount: '$5'
            }}
        >
            <Form.Item
                label="First name"
                name="fname"
                rules={[
                    { required: true, message: 'Please enter your first name' }
                ]}
            >
            <Input placeholder="First name" />

            </Form.Item>
            <Form.Item
                label="Last name"
                name="lname"
                rules={[
                    { required: true, message: 'Please enter your last name' }
                ]}
            >
            <Input placeholder="Last name" />

            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please enter your email' }
                ]}
            >
            <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please enter your password' }
                ]}
            >
            <Input placeholder="******" />

            </Form.Item>

            <Button type="primary" htmlType="submit">
                Create
            </Button>
        </Form>
    )
}

export default RegisterChoreBuddy;
