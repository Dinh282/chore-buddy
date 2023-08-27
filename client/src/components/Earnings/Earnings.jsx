import { useContext } from 'react';
import { ChoreContext } from '../../context/ChoreContext';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import { Typography } from 'antd';
import styles from './Earnings.module.css';
import { useQuery } from '@apollo/client';
import { QUERY_CHILDREN_IN_FAMILY } from '../../graphql/queries';

const { Paragraph } = Typography;

const Earnings = () => {
    const { loading, data } = useQuery(QUERY_CHILDREN_IN_FAMILY)
    const { users } = useContext(ChoreContext);
    const adjustedStyles = useDarkModeStyles(styles);


    if (loading) return console.log("loading...");
    const choreBuddies = data.getChildrenInFamily
    console.log(choreBuddies)

    // Function to compute the total earned by a chorebuddy
    // const computeTotalEarned = (chores) => {
    //     return chores.reduce((acc, chore) => {
    //         return chore.isChecked ? acc + chore.money : acc;
    //     }, 0);
    // }

    // Determine if a chorebuddy has earnings
    // const hasEarnings = Object.values(users).some(userData => computeTotalEarned(userData.chores) > 0);

    return (
        <>
            {choreBuddies ? (
                choreBuddies.map((buddies, index) => (
                    <Paragraph key={index} className={adjustedStyles.text}>
                        {buddies.firstName}: ${buddies.balance}
                    </Paragraph>
                ))
            ) : (
                <Paragraph className={adjustedStyles.text}>No earnings yet.</Paragraph>
            )}
        </>
    );
}

export default Earnings;
