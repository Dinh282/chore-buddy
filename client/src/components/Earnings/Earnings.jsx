import { useContext } from 'react';
import { ChoreContext } from '../../context/ChoreContext';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import { Typography, Skeleton } from 'antd';
import styles from './Earnings.module.css';
import { useQuery } from '@apollo/client';
import { QUERY_CHILDREN_IN_FAMILY, QUERY_CURRENT_USER } from '../../graphql/queries';

const { Paragraph } = Typography;

const Earnings = () => {
  const { users } = useContext(ChoreContext);
  const adjustedStyles = useDarkModeStyles(styles);

  const {
    loading: userLoading,
    data: userData,
    error: userError,
  } = useQuery(QUERY_CURRENT_USER);

  const {
    loading: childrenLoading,
    data: childrenData,
    error: childrenError,
  } = useQuery(QUERY_CHILDREN_IN_FAMILY);

  if (userLoading || childrenLoading) {
    return <Skeleton active title={false} paragraph={{ rows: 2 }} />;
  }

  if (userError || !userData) {
    return <div>Error loading user data.</div>;
  }

  const isChoreBuddy = userData.getCurrentUser.isChoreBuddy;
  const balance = userData.getCurrentUser.balance;

  if (isChoreBuddy) {
    return <Paragraph>${balance}</Paragraph>;
  }

  if (childrenError || !childrenData) {
    return <div>Error loading children data.</div>;
  }

  const choreBuddies = childrenData.getChildrenInFamily || [];

  const computeTotalEarned = (chores) => {
    if (!chores) return 0;

    return chores.reduce((acc, chore) => {
      return chore.isChecked ? acc + chore.rewardAmount : acc;
    }, 0);
  };

  return (
    <>
      {choreBuddies.length > 0 ? (
        choreBuddies.map((buddy, index) => (
          <Paragraph key={index} className={adjustedStyles.text}>
            {buddy.firstName}: ${computeTotalEarned(buddy.chores)}
          </Paragraph>
        ))
      ) : (
        <Paragraph className={adjustedStyles.text}>An empty wallet is a sad wallet.</Paragraph>
      )}
    </>
  );
};

export default Earnings;
