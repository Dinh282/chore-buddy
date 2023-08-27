import { useQuery } from '@apollo/client';
import { QUERY_CHILD_BALANCE } from '../../graphql/queries'    
import { useCurrentUserContext } from '../../context/CurrentUser';


import { useContext } from 'react';
import { ChoreContext } from '../../context/ChoreContext';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const Earnings = () => {
    // const { users } = useContext(ChoreContext);
    const { currentUser } = useCurrentUserContext(); //accessing the currentUserContext. useCurrentUserContext is defined in CurrentUser.jsx

    // Function to compute the total earned by a chorebuddy
    // const computeTotalEarned = (chores) => {
    //     return chores.reduce((acc, chore) => {
    //         return chore.isChecked ? acc + chore.money : acc;
    //     }, 0);
    // }

    const { loading, data } = useQuery(QUERY_CHILD_BALANCE, {
        variables: { childId: currentUser._id },
      });

      if (loading) {
        return <p>Loading...</p>;
    }
  
    const childBalance = data?.getChildBalance;
    console.log(data)
    console.log(childBalance.balance)

    // Determine if a chorebuddy has earnings
    // const hasEarnings = Object.values(users).some(userData => computeTotalEarned(userData.chores) > 0);

    return (
        <>
            {/* {hasEarnings ? (
                Object.entries(users).map(([userName, userData]) => (
                    <Paragraph key={userName}>
                        {userName}: ${computeTotalEarned(userData.chores)}
                    </Paragraph>
                ))
            ) : (
                <Paragraph>No earnings yet.</Paragraph>
            )} */}

            <Paragraph>{childBalance.balance}</Paragraph>
        </>
    );
}

export default Earnings;
