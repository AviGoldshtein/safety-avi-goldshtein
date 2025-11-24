import styles from './Header.module.css'

export default function Header(){
    return(
        <div className={styles.headerContainer}>
            <h1>מערכת לאיסוף אירועים</h1>
        </div>
    )
}