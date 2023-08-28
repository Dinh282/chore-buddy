import { useContext } from 'react';
import { List, Checkbox, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ChoreContext } from '../../context/ChoreContext';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CHILD_CHORES } from '../../graphql/queries';
import { TOGGLE_AND_COMPLETE_CHORE } from '../../graphql/mutations';
import styles from './ChoreList.module.css';

const ChoreList = ({ choreBuddies, showDeleteButton }) => {
    const { users, activeUser, setUsers } = useContext(ChoreContext);
    const adjustedStyles = useDarkModeStyles(styles);

    const { loading, data, error } = useQuery(QUERY_CHILD_CHORES, {
        variables: { childId: choreBuddies._id }
    });

    const [toggleAndCompleteChore] = useMutation(TOGGLE_AND_COMPLETE_CHORE);

    if (error) console.error("GraphQL Error:", error);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const childchores = data?.getChildChores || [];

    console.log("Child chores:", childchores);

    const toggleChoreChecked = async (choreToToggle) => {
        setUsers(prevUsers => ({
            ...prevUsers,
            [activeUser.id]: {
                ...activeUser,
                chores: activeUser.chores.map(chore => {
                    if (chore._id === choreToToggle._id) {
                        const updatedChore = { ...chore, isChecked: !chore.isChecked };
                        toggleAndCompleteChore({
                            variables: {
                                choreId: chore._id,
                                isComplete: updatedChore.isChecked
                            }
                        });
                        return updatedChore;
                    }
                    return chore;
                })
            }
        }));
    };

    const deleteChore = (choreToDelete) => {
        const updatedUsers = {
            ...users,
            [activeUser.id]: {
                ...activeUser,
                chores: activeUser.chores.filter(chore => chore._id !== choreToDelete._id)
            }
        };

        setUsers(updatedUsers);
    };

    return (
        <List
            dataSource={childchores}
            renderItem={chore => (
                <List.Item
                    style={chore.isChecked ? { textDecoration: 'line-through' } : {}}
                    actions={[
                        showDeleteButton && (
                            <Button
                                key="delete"
                                type="link"
                                onClick={() => deleteChore(chore)}
                            >
                                <DeleteOutlined />
                            </Button>
                        ),
                    ]}
                >
                    <Checkbox
                        checked={chore.isComplete}
                        onChange={() => toggleChoreChecked(chore)}
                        className={adjustedStyles.checkBox}
                    >
                        {chore.title} - ${chore.rewardAmount}
                    </Checkbox>
                </List.Item>
            )}
            locale={{ emptyText: 'No chores yet' }}
        />
    );
}

export default ChoreList;
