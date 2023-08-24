import { Link } from 'react-router-dom';
import { useCurrentUserContext } from '../../context/CurrentUser';
import styles from './Header.module.css';

 function Header() {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();

  return (
    <nav className={styles.navStyles}>
      {isLoggedIn() ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button type="button" onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </>
      )}
    </nav>
  );
 }

 export default Header