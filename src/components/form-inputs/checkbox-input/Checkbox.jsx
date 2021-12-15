import "./Checkbox.scss";

export const Checkbox = ({
  id,
  name,
  labelText,
  checked,
  onChange,
  validity,
  showError,
  error,
  children,
}) => (
  <div className="checkbox-wrapper">
    {showError ? <span className="checkbox-input__error">{error}</span> : ""}
    <input
      type="checkbox"
      id={id}
      name={name}
      className={`checkbox-input ${
        validity
          ? "checkbox-input--valid"
          : showError
          ? "checkbox-input--invalid"
          : ""
      }`}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id} className="checkbox-label">
      {labelText}
    </label>
    {children}
  </div>
);
