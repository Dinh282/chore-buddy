import { useContext } from 'react';
import { ChoreContext } from '../../context/ChoreContext';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const Earnings = () => {
    const { users } = useContext(ChoreContext);

    // Function to compute the total earned by a chorebuddy
    const computeTotalEarned = (chores) => {
        return chores.reduce((acc, chore) => {
            return chore.isChecked ? acc + chore.money : acc;
        }, 0);
    }

    // Determine if a chorebuddy has earnings
    const hasEarnings = Object.values(users).some(userData => computeTotalEarned(userData.chores) > 0);

    return (
        <>
            {hasEarnings ? (
                Object.entries(users).map(([userName, userData]) => (
                    <Paragraph key={userName}>
                        {userName}: ${computeTotalEarned(userData.chores)}
                    </Paragraph>
                ))
            ) : (
                <Paragraph>No earnings yet.</Paragraph>
            )}
        </>
    );
}

export default Earnings;
