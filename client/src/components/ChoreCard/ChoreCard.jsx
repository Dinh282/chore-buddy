import styles from "./ChoreCard.module.css";
import {
  Typography,
  Card,
  Form,
  Input,
  Button
} from 'antd';
// import { CREATE_CHORE } from '../../graphql/mutations';
// const [createChore] = useMutation(REGISTER_USER)
// import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate()
const { Title } = Typography;


function ChoreCard() {
  const [form] = Form.useForm();
  // const handleFormSubmit = async (values) => {
  //     const formValues = await form.validateFields();
  //     const { title, rewardAmount, family } = formValues;
  //     const mutationResponse = await createChore({
  //       variables: {
  //         title,
  //         rewardAmount,
  //         family
  //       },
  //     });
  //     navigate('/dashboard');
  //     }
  //   };
  // }
  return (
    
    <>
    <Card bordered={false} style={{ width: 300 }} className={styles.registrationForm}>
      <Form
        form={form}
        id="add-chore-form"
        layout="vertical"
        // onFinish={handleFormSubmit}
      >
        <Title>Add Chore</Title>

        <Form.Item
          label="Chore"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input your chore',
            },
          ]}
        >
          <Input placeholder="Chore"/>
        </Form.Item>

        <Form.Item
          label="Reward"
          name="rewardAmount"
          rules={[
            {
              required: true,
              message: 'Please input your last name',
            },
          ]}
        >
          <Input placeholder="Last name"/>
        </Form.Item>

        <Form.Item
          label="Custom-reward"
          name="custom-reward"
        >
          <Input placeholder="$25"/>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Add it!
        </Button>
      </Form>
    </Card>
    </>
  )
}

export default ChoreCard;
