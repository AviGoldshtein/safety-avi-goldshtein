import styles from './EventFormSection.module.css';

interface EventFormSectionProps {
    title: string;
    children: React.ReactNode;
}

export default function EventFormSection({ title, children }: EventFormSectionProps) {
    return (
        <div className={styles.sectionContainer}>
            {title && <h2 className={styles.sectionTitle}>{title}</h2>}
            <hr className={styles.sectionDivider} />
            <div className={styles.sectionContent}>
                {children}
            </div>
        </div>
    );
}
