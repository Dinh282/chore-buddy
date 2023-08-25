// components/CreateChoreList.js
import { useState, useContext } from "react";
import { Input, Button, Row, Col, Select } from "antd";
import { ChoreContext } from "../../context/ChoreContext";

const { Option } = Select;

const CreateChoreList = () => {
    const { users, activeUser, setUsers } = useContext(ChoreContext);
    const currentUser = users[activeUser];

    const [inputValue, setInputValue] = useState("");
    const [selectedMoney, setSelectedMoney] = useState(5); // Default value

    const handleAddChore = (value) => {
        if (!currentUser || !value) return;

        const newChore = { task: value, money: selectedMoney, isChecked: false };

        setUsers({
            ...users,
            [activeUser]: {
                ...currentUser,
                chores: [...currentUser.chores, newChore]
            }
        });
        setInputValue("");
    };

    if (!currentUser) return <div>No active user selected.</div>;

    return (
        <div>
            <Row gutter={16}>
                <Col flex="auto">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter a chore..."
                    />
                </Col>
                <Col>
                    <Select
                        defaultValue={5}
                        style={{ width: 60 }}
                        onChange={(value) => setSelectedMoney(value)}
                    >
                        <Option value={5}>$5</Option>
                        <Option value={10}>$10</Option>
                        <Option value={15}>$15</Option>
                    </Select>
                </Col>
                <Col>
                    <Button type="primary" onClick={() => handleAddChore(inputValue)}>
                        Add
                    </Button>
                </Col>
            </Row>
        </div>
    );
};


export default CreateChoreList;
