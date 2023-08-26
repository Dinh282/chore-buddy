import { useState } from "react";
// import { ChoreContext } from "../../context/ChoreContext";
import {
  Form,
  Input,
  Button,
} from 'antd';


function RegisterChoreBuddy() {
    // const { users, activeUser, setUsers } = useContext(ChoreContext);
    const [form] = Form.useForm();
    
    // const currentUser = users[activeUser];

    // const handleAddChore = (values) => {
    //     if (!currentUser || !values.title) return;
    
    //     let amount;
    //     if (showCustomAmount && typeof values.customRewardAmount !== 'undefined') {
    //         amount = values.customRewardAmount;
    //     } else {
    //         amount = parseFloat(values.rewardAmount.replace('$', ''));
    //     }
    
    //     const newChore = { task: values.title, money: amount, isChecked: false };
    
    //     setUsers({
    //         ...users,
    //         [activeUser]: {
    //             ...currentUser,
    //             chores: [...currentUser.chores, newChore]
    //         }
    //     });
    //     form.resetFields();

    //     onCloseModal && onCloseModal();
    // };
    

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
