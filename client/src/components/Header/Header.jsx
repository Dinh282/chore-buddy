import { Link} from 'react-router-dom';
import { useCurrentUserContext } from '../../context/CurrentUser';
import { useTheme } from '../../context/ThemeContext';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import DarkIcon from '../Icons/DarkIcon';
import LightIcon from '../Icons/LightIcon';
import { Button, Dropdown, Typography, Tooltip, Space } from 'antd';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';
import Logo from '../Logo';
const { Text } = Typography;
import styles from './Header.module.css';



function Header() {
  const [darkMode, setDarkMode] = useTheme();
  const { isLoggedIn, logoutUser } = useCurrentUserContext();
  const adjustedStyles = useDarkModeStyles(styles);

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
  const navClass = isDashboard ? `${adjustedStyles.navStyles} ${adjustedStyles.onDashboard}` : adjustedStyles.navStyles;

  return (
    <nav className={navClass} >
      <div className={styles.navInner} >
        <Tooltip placement='bottom' title='Home'>
          <Link className={styles.logoLink} to={'/'}>
            <Logo type='minimal' className={styles.logo} />
          </Link>
        </Tooltip>
        
        <Space> 
          <Tooltip placement='bottom' title={darkMode ? 'Light mode' : 'Dark mode'}>
            <Button
              type='text'
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              className={adjustedStyles.themeBtn}
            >
              {darkMode ? <LightIcon /> : <DarkIcon />}
            </Button>
          </Tooltip>
        {isLoggedIn() ? (
          <>
            <Dropdown menu={{ items }} placement='bottomRight'>
              <UserOutlined className={adjustedStyles.btn} />
            </Dropdown>
          </>
        ) : (
          <>
            <Link to='/login'>
              <LoginOutlined className={adjustedStyles.btn}/>
            </Link>
          </>
        )}
        </Space>
      </div>
    </nav>
  );
 }

 export default Header