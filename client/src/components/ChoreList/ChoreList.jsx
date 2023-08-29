import { useContext, useEffect } from 'react';
import { List, Checkbox, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ChoreContext } from '../../context/ChoreContext';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CHILD_CHORES } from '../../graphql/queries';
import { DELETE_CHORE, TOGGLE_AND_COMPLETE_CHORE } from '../../graphql/mutations';
import styles from './ChoreList.module.css';
import {
  Typography,
} from 'antd';
const { Title } = Typography;

const ChoreList = ({ choreBuddies, showDeleteButton }) => {
    const {  activeUser, setActiveUser } = useContext(ChoreContext);
    const adjustedStyles = useDarkModeStyles(styles);

    const { loading, data, error } = useQuery(QUERY_CHILD_CHORES, {
        variables: { childId: choreBuddies._id }
    });

    const [toggleAndCompleteChore] = useMutation(TOGGLE_AND_COMPLETE_CHORE);
    const [deleteChoreID] = useMutation(DELETE_CHORE, {
        refetchQueries: [
            QUERY_CHILD_CHORES,
          'getChildChores'
        ]
      })


    const childchores = data?.getChildChores || [];

    useEffect(() => {
        setActiveUser({ ...activeUser, chores: childchores })
    }, [])

    const toggleChoreChecked = async (e) => {
        console.log('activeuser>>>>>', activeUser)
        console.log('choreToToggle>>>>>>>', e)
        const updatedChores = activeUser.chores.map(chore => (chore._id === e.target.id) ? { ...chore, isComplete: !e.target.checked } : chore)
        setActiveUser({ ...activeUser, chores: [updatedChores] })

        toggleAndCompleteChore({
            variables: {
                choreId: e.target.id,
                isComplete: e.target.checked
            }
        });
    };

    const deleteChore = (choreToDelete) => {
        const choreswithchoreremoved = activeUser.chores.filter(chore => chore._id !== choreToDelete._id)
        setActiveUser({ ...activeUser, chores: [choreswithchoreremoved] })
        deleteChoreID ({
            variables:{
                choreId:choreToDelete._id
            }
        })
    };


    if (error) console.error("GraphQL Error:", error);
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
        <Title className={adjustedStyles.title}>Chores</Title>
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
                        className={adjustedStyles.checkBox}
                        id={chore._id}
                        onChange={(e) => toggleChoreChecked(e)}
                    >
                        {chore.title} - ${chore.rewardAmount}
                    </Checkbox>
                </List.Item>
            )}
            locale={{ emptyText: 'No chores yet' }}
        />
        </>
    );
}

export default ChoreList;
