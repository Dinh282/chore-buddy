import { Link } from 'react-router-dom';
import { useCurrentUserContext } from '../../context/CurrentUser';
import { Button, Dropdown, Typography } from 'antd';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';
const { Text } = Typography;
import styles from './Header.module.css';



function Header() {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();

  const items = [
    {
      key: '1',
      label: (
        <Link to="/dashboard">
          <Text>Dashboard</Text>
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Button type="text" onClick={logoutUser}>Logout</Button>
      ),
    },
  ];

  return (
    <nav className={styles.navStyles}>
      <Link className={styles.logoLink} to={isLoggedIn() ? "/dashboard" : "/"}>
          <h4 className={styles.logo}>ChoreBuddy</h4>
        </Link>
      {isLoggedIn() ? (
        <>
          <Dropdown menu={{ items }} placement="bottomRight">
            <UserOutlined className={styles.btn} />
          </Dropdown>
        </>
      ) : (
        <>
          <Link to="/login">
            <LoginOutlined className={styles.btn}/>
          </Link>
        </>
      )}
    </nav>
  );
 }

 export default Header