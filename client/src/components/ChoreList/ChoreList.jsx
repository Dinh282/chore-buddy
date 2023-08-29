import { useContext, useEffect } from 'react';
import { List, Checkbox, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ChoreContext } from '../../context/ChoreContext';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CHILD_CHORES } from '../../graphql/queries';
import { TOGGLE_AND_COMPLETE_CHORE, DELETE_CHORE } from '../../graphql/mutations';
import styles from './ChoreList.module.css';


const ChoreList = ({ choreBuddies, showDeleteButton }) => {
    const {  activeUser, setActiveUser } = useContext(ChoreContext);
    const adjustedStyles = useDarkModeStyles(styles);

    const { loading, data, error } = useQuery(QUERY_CHILD_CHORES, {
        variables: { childId: choreBuddies._id }
    });

    const [toggleAndCompleteChore] = useMutation(TOGGLE_AND_COMPLETE_CHORE);
    const [deleteChore] = useMutation(DELETE_CHORE, {
        update(cache, { data: { deleteChore } }) {
            const existingChores = cache.readQuery({
                query: QUERY_CHILD_CHORES,
                variables: { childId: choreBuddies._id }
            });
    
            const newChores = existingChores.getChildChores.filter(chore => chore._id !== deleteChore._id);
    
            cache.writeQuery({
                query: QUERY_CHILD_CHORES,
                variables: { childId: choreBuddies._id },
                data: { getChildChores: newChores }
            });
        }
    });

    const childchores = data?.getChildChores || [];

    useEffect(() => {
        // Only update the chores of activeUser and not any other properties
        setActiveUser(prev => ({ ...prev, chores: childchores }))
    }, [childchores])

    const toggleChoreChecked = async (e) => {
        const response = await toggleAndCompleteChore({
            variables: {
                choreId: e.target.id,
                isComplete: e.target.checked
            }
        });
        
        const updatedChore = response.data.toggleAndCompleteChore;

        const updatedChoresList = activeUser.chores.map(chore => 
            chore._id === updatedChore._id ? updatedChore : chore
        );

        setActiveUser(prev => ({
            ...prev, 
            chores: updatedChoresList,
        }));
    };

    const handleDeleteChore = async (choreToDelete) => {
    
        try {
            const response = await deleteChore({ 
                variables: { choreId: choreToDelete._id }
            });
            
            // Once the chore is confirmed deleted from the backend, update the local state.
            const choresWithChoreRemoved = activeUser.chores.filter(chore => chore._id !== choreToDelete._id);
            
            setActiveUser({ ...activeUser, chores: choresWithChoreRemoved });
    
        } catch (error) {
            console.error("Error deleting chore:", error.message);
        }
    };
    


    if (error) {
        console.error("GraphQL Error:", error);
        return <p>Error: {error.message}</p>;
    }
    if (loading) return <p>Loading...</p>

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
                                onClick={() => handleDeleteChore(chore)}
                            >
                                <DeleteOutlined />
                            </Button>
                        ),
                    ]}
                >
                    <Checkbox
                        checked={chore.isComplete}
                        className={adjustedStyles.checkBox}
                        id={chore._id}
                        onChange={(e) => toggleChoreChecked(e)}
                    >
                        {chore.title} - ${chore.rewardAmount}
                    </Checkbox>
                </List.Item>
            )}
            locale={{ emptyText: `No chores yet` }}
        />
    );
}

export default ChoreList;
