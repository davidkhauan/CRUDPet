function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className="d-flex flex-column mb-3">
      <label htmlFor={name} className="mb-2 fw-bold">
        {text}:
      </label>
      <select
        className="form-select"
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ""}
        style={{
          padding: "0.7em",
          border: "1px solid #777",
          borderRadius: "5px"
        }}
      >
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
