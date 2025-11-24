import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import Footer from "../components/Footer/Footer"
import styles from './LayoutMain.module.css'

interface LayoutMainProps {
    children: React.ReactNode;
}

export default function LayoutMain({ children }: LayoutMainProps) {
    return (
        <div className={styles.layoutContainer}>
            <Header />

            <div className={styles.contentWrapper}>
                <Sidebar />
                <main className={styles.main}>
                    {children}
                </main>
            </div>

            <Footer />
        </div>
    );
}