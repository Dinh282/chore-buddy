import styles from "./Footer.module.css";
import { Typography } from 'antd';
const { Text } = Typography;

function getCurrentYear() {
  return new Date().getFullYear();
}

function Footer() {
  return (
    <footer className={styles.footerStyles}>
      <Text>&copy; {getCurrentYear()} ChoreBuddy</Text>
    </footer>
  )
}

export default Footer