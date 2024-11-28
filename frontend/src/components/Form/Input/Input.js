function Input ({ type, text, name, placeholder, handleOnChange, value, multiple }) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{text}:</label>
            <input
                type={type}
                name={name}
                id={name}
                className={'form-control'}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                { ...(multiple ? { multiple } : '') }
            />
        </div>
    );
};

export default Input;