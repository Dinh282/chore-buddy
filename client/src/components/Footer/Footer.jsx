import styles from "./Footer.module.css";
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import { Typography } from 'antd';
const { Text } = Typography;

function getCurrentYear() {
  return new Date().getFullYear();
}

function Footer() {
  const adjustedStyles = useDarkModeStyles(styles);
  return (
    <footer className={adjustedStyles.footerStyles}>
      <Text>&copy; {getCurrentYear()} ChoreBuddy</Text>
    </footer>
  )
}

export default Footer