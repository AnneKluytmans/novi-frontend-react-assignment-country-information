import './InputField.css';

function InputField({ value, setValue, placeholder, name, type }) {
    return (
        <input
            className="input-field"
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(event) => setValue(event.target.value)}
        />
    );
}

export default InputField;