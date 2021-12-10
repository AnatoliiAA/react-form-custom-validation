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
  showError,
  children,
}) => (
  <div className="input-wrapper">
    <label htmlFor={id} className="text-input-label">
      {labelText}
      {showError ? <span className="text-input__error">{error}</span> : ""}
    </label>
    <input
      type={type}
      value={value}
      id={id}
      className={`text-input ${
        !validity || showError ? "text-input--invalid" : "text-input--valid"
      } ${value === "" && !showError ? "text-input--empty" : ""}`}
      name={name}
      onChange={onChange}
    />
    {children}
  </div>
);
