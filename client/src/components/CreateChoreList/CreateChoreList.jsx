import { useState, useContext } from "react";
import { ChoreContext } from "../../context/ChoreContext";
import { useMutation } from '@apollo/client';

import {
  Form,
  Input,
  Button,
  Select,
  InputNumber
} from 'antd';
import { CREATE_CHORE } from '../../graphql/mutations';
import { QUERY_CHILD_CHORES } from "../../graphql/queries";

function CreateChoreList({ onCloseModal }) {
    const [showCustomAmount, setShowCustomAmount] = useState(false);
    const { activeUser } = useContext(ChoreContext);
    const [form] = Form.useForm();
    const [createChore] = useMutation(CREATE_CHORE, {
        update: (cache, { data }) => {
            // Get the newly created chore from the mutation response
            const newChore = data.createChore;
        
            // Read the existing cache data for the active user
            const existingCache = cache.readQuery({
                query: QUERY_CHILD_CHORES,
                variables: { childId: activeUser.id }
            });
        
            // Update the cache with the new chore
            cache.writeQuery({
                query: QUERY_CHILD_CHORES,
                variables: { childId: activeUser.id },
                data: {
                    getChildChores: [...existingCache.getChildChores, newChore]
                }
            });
        }
    });
      
    
    const currentUser = activeUser;
    
    // console.log("Active user in CreateChoreList:", currentUser);
    console.log(currentUser)
    const handleAddChore = async () => {
        try {
            const formValues = await form.validateFields();
            const { title, rewardAmount, customRewardAmount } = formValues;
            if (!currentUser || !currentUser.id) {
                console.error("Current user ID is not available!");
                return;
            }
            const mutationResponse = await createChore({
                variables: {
                    title,
                    rewardAmount: rewardAmount || customRewardAmount,
                    assignee: currentUser.id,
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
                            form.setFieldsValue({ customRewardAmount: undefined });
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
