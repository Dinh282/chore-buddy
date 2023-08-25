// components/ChoreList.js
import { useContext } from 'react';
import { List, Checkbox, Button } from 'antd';
import { ChoreContext } from '../../context/ChoreContext';

const ChoreList = () => {
    const { users, activeUser, setUsers } = useContext(ChoreContext);

    const currentUser = users[activeUser];

    const toggleChoreChecked = (choreToToggle) => {
        
        const updatedChores = currentUser.chores.map(chore => {
            if (chore.task === choreToToggle.task) {
                return { ...chore, isChecked: !chore.isChecked };
            }
            return chore;
        });

        setUsers({
            ...users,
            [activeUser]: {
                ...currentUser,
                chores: updatedChores
            }
        });
    };

    const deleteChore = (choreToDelete) => {
        const updatedChores = currentUser.chores.filter(chore => chore.task !== choreToDelete.task);

        setUsers({
            ...users,
            [activeUser]: {
                ...currentUser,
                chores: updatedChores
            }
        });
    };

    return (
        <List
            bordered
            dataSource={currentUser.chores}
            renderItem={(chore) => (
                <List.Item
                    style={chore.isChecked ? { textDecoration: 'line-through' } : {}}
                    actions={[
                        <Button
                            key="delete" 
                            type="link" 
                            onClick={() => deleteChore(chore)}
                        >
                            Delete
                        </Button>
                    ]}
                >
                    <Checkbox 
                        checked={chore.isChecked}
                        onChange={() => toggleChoreChecked(chore)}
                    >
                        {chore.task} - ${chore.money}
                    </Checkbox>
                </List.Item>
            )}
            locale={{ emptyText: 'No chores yet' }}
        />
    );
}
  
export default ChoreList;