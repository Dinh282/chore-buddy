import { useContext } from 'react';
import { ChoreContext } from '../../context/ChoreContext';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import { Typography } from 'antd';
import styles from './Earnings.module.css';
import { useQuery } from '@apollo/client';
import { QUERY_CHILDREN_IN_FAMILY, QUERY_CURRENT_USER } from '../../graphql/queries';

const { Paragraph } = Typography;

const Earnings = () => {
    const { loading, data } = useQuery(QUERY_CURRENT_USER)
    const isChoreBuddy = data.getCurrentUser.isChoreBuddy;
    const balance = data.getCurrentUser.balance;

    if(!isChoreBuddy){
    const { loading, data } = useQuery(QUERY_CHILDREN_IN_FAMILY)
    const adjustedStyles = useDarkModeStyles(styles);

    if (loading) return console.log("loading...");
    const choreBuddies = data.getChildrenInFamily
    
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
    }else{
        return(<><Paragraph>${balance}</Paragraph></>)
    }
}

export default Earnings;
