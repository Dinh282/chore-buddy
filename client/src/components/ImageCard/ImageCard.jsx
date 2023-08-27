import styles from './ImageCard.module.css';
import { useNavigate } from 'react-router-dom';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import { Button, Typography } from 'antd';
import Logo from '../Logo';

const { Paragraph } = Typography;

function ImageCard() {
  const navigate = useNavigate()
  const adjustedStyles = useDarkModeStyles(styles);
  function handleClick() {
    navigate('/register')
  }
  return (
    <section className={adjustedStyles.landing}>
      <div className={adjustedStyles.cardHeaderDiv}>
        <Logo type='default' className={adjustedStyles.logo} />
        <Paragraph className={adjustedStyles.cardMessage}>Your Partner in Productivity</Paragraph>
        <Button type='primary' shape='round' onClick={handleClick} className={adjustedStyles.cardBtn} size='large'>Get Started</Button>
      </div>
      <div className={adjustedStyles.cardDiv}>
        <img className={adjustedStyles.cardImg} src='/background.png'></img>
      </div>
    </section>
  )
}

export default ImageCard;