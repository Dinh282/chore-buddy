import './ImageCard.css'
import { useNavigate } from 'react-router-dom'

function ImageCard() {
  const navigate = useNavigate()
  function handleClick() {
   navigate('/register')
  }
  return (
    <>
    <section className="landing">
    <div className="card-div">
    <img className="card-img" src="/images/landing.png"></img>
        </div>
        <div className="card-header-div">
        <h1 className="card-header">Chorebuddy</h1>
        <p className="card-message">Your Partner in Productivity</p>
        <button onClick={handleClick} className="card-btn">Get Started</button>
        <div>
      </div>
    </div>
    </section>
    </>
  )
}

export default ImageCard;