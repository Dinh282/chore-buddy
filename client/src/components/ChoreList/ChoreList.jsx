import { useContext } from 'react';
import { List, Checkbox, Button } from 'antd';
import { ChoreContext } from '../../context/ChoreContext';
import { useQuery } from '@apollo/client';
import { QUERY_CHILDREN_IN_FAMILY, QUERY_CHILD_CHORES } from '../../graphql/queries';

const ChoreList = (props) => {
    // console.log(props.choreBuddies._id)
    // const childId = props.choreBuddies._id
    const { users, activeUser, setUsers } = useContext(ChoreContext);
    const { loading, data } = useQuery(QUERY_CHILD_CHORES, {
        variables: { childId: props.choreBuddies._id }
    })
    // console.log(data)
    const childchores = data?.getChildChores || []
    // console.log(childchores)
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
            dataSource={childchores}
            renderItem={(chore=> (
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
                        {childchores[0].title} - ${chore.money}
                    </Checkbox>
                </List.Item>
            ))}
            locale={{ emptyText: 'No chores yet' }}
        />
    );
}

export default ChoreList;