import styles from "./ChoreCard.module.css";
import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Select
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
        
        <Form.Item label="Reward">
        <Select
          className={styles.select}
          defaultValue="$5"
          name="rewardAmount"
          options={[
            {value: '$0', label:'$0'},
            {value: '$5', label:'$5'},
            {value: '$10', label:'$10'},
            {value: '$15', label:'$15'},
            {value: '$20', label:'$20'}
          ]}
        />
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
