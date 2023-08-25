import { useContext } from 'react';
import { ChoreContext } from '../../context/ChoreContext';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const Earnings = () => {
    const { users } = useContext(ChoreContext);

    // Function to compute the total earned by a user
    const computeTotalEarned = (chores) => {
        return chores.reduce((acc, chore) => {
            return chore.isChecked ? acc + chore.money : acc;
        }, 0);
    }

    return (
        <>
            {Object.entries(users).map(([userName, userData]) => (
                <Paragraph key={userName}>
                    {userName}: ${computeTotalEarned(userData.chores)}
                </Paragraph>
            ))}
        </>
    );
}

export default Earnings;
