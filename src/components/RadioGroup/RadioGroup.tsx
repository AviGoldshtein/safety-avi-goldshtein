import styles from "./RadioGroup.module.css";

interface RadioGroupProps {
    options: readonly string[];
    value: string;
    name: string;
    onChange: (val: string) => void
}

export default function RadioGroup({ options, value, onChange, name }: RadioGroupProps) {

  return (
    <div className={styles.mydict}>
      <div>
        {options.map((opt: string, i: number) => (
          <label key={i}>
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={(e) => onChange(e.target.value)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
