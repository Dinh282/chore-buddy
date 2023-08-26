import { Link} from 'react-router-dom';
import { useCurrentUserContext } from '../../context/CurrentUser';
import { Button, Dropdown, Typography, Tooltip, } from 'antd';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';
import Logo from '../Logo';
const { Text } = Typography;
import styles from './Header.module.css';



function Header() {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();

  const items = [
    {
      key: '1',
      label: (
        <Link to='/dashboard'>
          <Text>Dashboard</Text>
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Button type='text' onClick={logoutUser} className={styles.logoutButton}>Logout</Button>
      ),
    },
  ];

  const isDashboard = location.pathname === '/dashboard';
  const navClass = isDashboard ? `${styles.navStyles} ${styles.onDashboard}` : styles.navStyles;

  return (
    <nav className={navClass}>
      <div className={styles.navInner}>
        <Tooltip placement='bottom' title='Home'>
          <Link className={styles.logoLink} to={'/'}>
            <Logo type='minimal' className={styles.logo} />
          </Link>
        </Tooltip>
        {isLoggedIn() ? (
          <>
            <Dropdown menu={{ items }} placement='bottomRight'>
              <UserOutlined className={styles.btn} />
            </Dropdown>
          </>
        ) : (
          <>
            <Link to='/login'>
              <LoginOutlined className={styles.btn}/>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
 }

 export default Header