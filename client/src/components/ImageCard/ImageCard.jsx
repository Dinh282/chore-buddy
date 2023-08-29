import styles from './ImageCard.module.css';
import { useNavigate } from 'react-router-dom';
import useDarkModeStyles from '../../hooks/useDarkModeStyles';
import { Button, Typography } from 'antd';
import Logo from '../Logo';
import { motion } from 'framer-motion';

const { Paragraph } = Typography;

function ImageCard() {
  const navigate = useNavigate()
  const adjustedStyles = useDarkModeStyles(styles);
  function handleClick() {
    navigate('/register')
  }
  return (
    <>
    <section className={adjustedStyles.landing}>
      <div className={adjustedStyles.cardHeaderDiv}>

        <motion.div
        initial={{ scale: 0, opacity: 0, translateY: 100 }}
        animate={{ scale: 1, opacity: 1, translateY: 0}}
        transition={{ duration: 1, delay:  .2 }}
        >
        <Logo type='default' className={adjustedStyles.logo} />
        </motion.div>

        <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: .2, delay:  .3 }}
        >
        <Paragraph className={adjustedStyles.cardMessage}>Your Partner in Productivity</Paragraph>
        </motion.div>

        <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: .2, delay:  .8 }}
        >
        <Button type='primary' shape='round' onClick={handleClick} className={adjustedStyles.cardBtn} size='large'>Get Started</Button>
        </motion.div>
      </div>
      <div className={adjustedStyles.cardDiv}>
        <img className={adjustedStyles.cardImg} src='/background.png'></img>
      </div>
    </section>
  </>
  )
}

export default ImageCard;