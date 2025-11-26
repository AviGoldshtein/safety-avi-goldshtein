import { useState } from "react";
import styles from "./CustomSelect.module.css";
import { ChevronDown } from "lucide-react"; // חץ קטן ויפה

interface CustomSelectProps {
    options: readonly string[];
    value?: string;
    onChange: (val: string) => void
}

export default function CustomSelect({ options = [], value, onChange }: CustomSelectProps) {
    const [open, setOpen] = useState(false);

    const handleSelect = (val: string) => {
        onChange(val);
        setOpen(false);
    };

    return (
        <div className={styles.wrapper}>
            <div 
                className={styles.selected}
                tabIndex={0}
                onClick={() => setOpen(!open)}
            >
                <span>{value || "בחר..."}</span>

                <ChevronDown 
                    className={`${styles.arrow} ${open ? styles.open : ""}`}
                    size={18}
                />
            </div>

            {open && (
                <ul className={styles.list}>
                    {options.map((opt) => (
                        <li 
                            key={opt} 
                            className={styles.option}
                            onClick={() => handleSelect(opt)}
                        >
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
