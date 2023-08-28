import { useContext } from 'react';
import { ChoreContext } from '../../context/ChoreContext';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import { Typography } from 'antd';
import styles from './Earnings.module.css';
import { useQuery } from '@apollo/client';
import { QUERY_CHILDREN_IN_FAMILY, QUERY_CURRENT_USER } from '../../graphql/queries';

const { Paragraph } = Typography;

const Earnings = () => {
<<<<<<< HEAD
    const { loading, data } = useQuery(QUERY_CURRENT_USER)
    const isChoreBuddy = data.getCurrentUser.isChoreBuddy;
    const balance = data.getCurrentUser.balance;

    if(!isChoreBuddy){
    const { loading, data } = useQuery(QUERY_CHILDREN_IN_FAMILY)
    const adjustedStyles = useDarkModeStyles(styles);

    if (loading) return console.log("loading...");
    const choreBuddies = data.getChildrenInFamily
    
=======
    const { loading, data, error } = useQuery(QUERY_CHILDREN_IN_FAMILY);
    const { users } = useContext(ChoreContext);
    const adjustedStyles = useDarkModeStyles(styles);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const choreBuddies = data?.getChildrenInFamily || [];

    // Function to compute the total earned by a chore buddy
    const computeTotalEarned = (chores) => {
        if (!chores) return 0;

        return chores.reduce((acc, chore) => {
            return chore.isChecked ? acc + chore.rewardAmount : acc;
        }, 0);
    }

>>>>>>> be-fe
    return (
        <>
            {choreBuddies.length > 0 ? (
                choreBuddies.map((buddy, index) => (
                    <Paragraph key={index} className={adjustedStyles.text}>
                        {buddy.firstName}: ${computeTotalEarned(buddy.chores)}
                    </Paragraph>
                ))
            ) : (
                <Paragraph className={adjustedStyles.text}>No earnings yet.</Paragraph>
            )}
        </>
    );
    }else{
        return(<><Paragraph>${balance}</Paragraph></>)
    }
}

export default Earnings;
