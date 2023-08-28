import { useState, useContext } from "react";
// import { ChoreContext } from "../../context/ChoreContext";
import { useMutation } from '@apollo/client';

import {
  Form,
  Input,
  Button,
  Select,
  InputNumber
} from 'antd';
import { CREATE_CHORE } from '../../graphql/mutations';

function CreateChoreList({ onCloseModal }) {
    const [showCustomAmount, setShowCustomAmount] = useState(false);
    // const { users, activeUser, setUsers } = useContext(ChoreContext);
    const [form] = Form.useForm();
    const [createChore] = useMutation(CREATE_CHORE)
    
    // const currentUser = users[activeUser];

    const handleAddChore = async () => {
        try {
        const formValues = await form.validateFields();
        const { title, rewardAmount, customRewardAmount } = formValues;
        console.log(formValues)
        const mutationResponse = await createChore({
            variables: {
                title,
                rewardAmount: rewardAmount || customRewardAmount,
            },
        });
        mutationResponse.data.createChore;
        form.resetFields();
        onCloseModal && onCloseModal();

    } catch (error) {
        if (error) {
            console.log(error, "error!")
      }
    }
        
    };
    const defaultReward = 5;

    return (
        <Form
            form={form}
            id="add-chore-form"
            layout="vertical"
            onFinish={handleAddChore}
            initialValues={{
                rewardAmount: defaultReward
            }}
        >
            <Form.Item
                label="Chore"
                name="title"
                rules={[
                    { required: true, message: 'Please input your chore' }
                ]}
            >
                <Input placeholder="Chore" />
            </Form.Item>

            <Form.Item label="Reward" name="rewardAmount">
                <Select
                    onChange={(value) => {
                        if (value === 'custom') {
                            setShowCustomAmount(true);
                        } else {
                            setShowCustomAmount(false);
                            form.setFieldsValue({ customRewardAmount: undefined });  // Clear custom reward input
                        }
                    }}
                    options={[
                        { value: 0, label: "$0" },
                        { value: 5, label: "$5" },
                        { value: 10, label: "$10" },
                        { value: 15, label: "$15" },
                        { value: 20, label: "$20" },
                        { value: 'custom', label: 'Custom' }
                    ]}
                />
            </Form.Item>

            {showCustomAmount && (
                <Form.Item label="Custom Reward" name="customRewardAmount">
                    <InputNumber
                        min={0}
                        placeholder="$25"
                        formatter={value => `$ ${value}`}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
            )}

            <Button type="primary" htmlType="submit">
                Add it!
            </Button>
        </Form>
    )
}

export default CreateChoreList;
