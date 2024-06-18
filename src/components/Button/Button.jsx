import './Button.css'

function Button({ text, type, className, clickHandler, disabled }) {
    return (
        <button type={type} onClick={clickHandler} disabled={disabled || false} className={className}>
            {text}
        </button>
    );
}

export default Button;