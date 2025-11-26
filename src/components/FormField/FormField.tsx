import styles from './FormField.module.css'


interface FormFieldProps {
    label: string;
    error: string | undefined;
    children: React.ReactNode
}

export default function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className={styles.lableWraper}>
      {label && <label>{label}</label>}
      {children}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
