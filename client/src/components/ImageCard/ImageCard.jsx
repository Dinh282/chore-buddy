import styles from './ImageCard.module.css';
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd';
import Logo from '../Logo';

const { Paragraph } = Typography;

function ImageCard() {
  const navigate = useNavigate()
  function handleClick() {
    navigate('/register')
  }
  return (
    <section className={styles.landing}>
      <div className={styles.cardHeaderDiv}>
        <Logo type='default' />
        <Paragraph className={styles.cardMessage}>Your Partner in Productivity</Paragraph>
        <Button type='primary' shape='round' onClick={handleClick} className={styles.cardBtn} size='large'>Get Started</Button>
      </div>
      <div className={styles.cardDiv}>
        <img className={styles.cardImg} src='/images/landing.png'></img>
      </div>
    </section>
  )
}

export default ImageCard;