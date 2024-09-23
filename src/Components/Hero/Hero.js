import styles from './Hero.module.css'

export default function Hero({movieName}){
    return(
        <div className={`bg-dark text-white ${styles.box}`}><span className='ms-3'>{`Results for: "${movieName}"`}</span></div>
    )
}