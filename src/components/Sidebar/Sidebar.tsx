import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar(){
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <Link to="/over-view">מבט על</Link>
                <Link to="/">הזנת אירוע</Link>
                <Link to="/development">חיפוש אירועים</Link>
                <Link to="/development">דוחות BI</Link>
            </nav>

            <button className={styles.exampleBtn}>Example</button>
        </aside>
    );
}
