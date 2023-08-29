import { useContext, useEffect } from 'react';
import { List, Checkbox, Button } from 'antd';
import { ChoreContext } from '../../context/ChoreContext';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CHILD_CHORES } from '../../graphql/queries';
import { TOGGLE_AND_COMPLETE_CHORE } from '../../graphql/mutations';


const ChoreList = ({ choreBuddies, showDeleteButton }) => {
    const { users, activeUser, setUsers, setActiveUser } = useContext(ChoreContext);

    const { loading, data, error } = useQuery(QUERY_CHILD_CHORES, {
        variables: { childId: choreBuddies._id }
    });

    const [toggleAndCompleteChore] = useMutation(TOGGLE_AND_COMPLETE_CHORE);


    const childchores = data?.getChildChores || [];

    useEffect(() => {
        setActiveUser({ ...activeUser, chores: childchores })
    }, [])

    // console.log("Child chores:", childchores);

    const toggleChoreChecked = async (e) => {
        console.log('activeuser>>>>>', activeUser)
        console.log('choreToToggle>>>>>>>', e)
        const updatedChores = activeUser.chores.map(chore => (chore._id === e.target.id) ? { ...chore, isComplete: !e.target.checked } : chore)
        // const toggledChore = updatedChores.find(chore => chore._id === choreToToggle._id)
        setActiveUser({ ...activeUser, chores: [updatedChores] })

        toggleAndCompleteChore({
            variables: {
                choreId: e.target.id,
                isComplete: e.target.checked
            }
        });

        console.log('set active user2', activeUser)

    };

    const deleteChore = (choreToDelete) => {
        setActiveUser({ chores: [childchores] })
        console.log('delete>>>>', activeUser)
        console.log(users)
        const choreswithchoreremoved = activeUser.chores.filter(chore => chore._id !== choreToDelete._id)
        setActiveUser({ ...activeUser, chores: [choreswithchoreremoved] })
        // const updatedUsers = {
        //     ...users,
        //     [activeUser.id]: {
        //         ...activeUser,
        //         chores: activeUser.chores.filter(chore => chore._id !== choreToDelete._id)
        //     }
        // };
        // console.log('updatedusers>>>>', updatedUsers)
        // setUsers(updatedUsers);
    };


    if (error) console.error("GraphQL Error:", error);
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>;

    return (
        <List
            bordered
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
                                Delete
                            </Button>
                        ),
                    ]}
                >
                    <Checkbox
                        checked={chore.isComplete}
                        id={chore._id}
                        onChange={(e) => toggleChoreChecked(e)}
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
