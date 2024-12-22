import styles from "./Input.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  multiple?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Input = (props: Proptypes) => {
  const {
    label,
    name,
    type,
    placeholder,
    defaultValue,
    value,
    multiple,
    onChange,
  } = props;
  return (
    <div className={styles.container}>
      {label && <label htmlFor={label}>{label}</label>}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        multiple={multiple}
        onChange={onChange}
        className={styles.container__input}
      />
    </div>
  );
};

export default Input;
