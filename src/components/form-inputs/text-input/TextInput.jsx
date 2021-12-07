import "./TextInput.scss";

export const TextInput = ({
  id,
  name,
  type,
  value,
  labelText,
  onChange,
  validity,
  error,
  children,
}) => (
  <div className="input-wrapper">
    <label htmlFor={id} className="text-input-label">
      {labelText}
      {!validity && value !== "" ? (
        <span className="text-input__error">{error}</span>
      ) : (
        ""
      )}
    </label>
    <input
      type={type}
      value={value}
      id={id}
      className={`text-input ${
        validity ? "text-input--valid" : "text-input--invalid"
      } ${value === "" ? "text-input--empty" : ""}`}
      name={name}
      onChange={onChange}
    />
    {children}
  </div>
);
