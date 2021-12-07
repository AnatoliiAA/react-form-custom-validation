import "./CheckboxInput.scss";

export const CheckboxInput = ({
  id,
  name,
  labelText,
  checked,
  onChange,
  validity,
}) => (
  <>
    <input
      type="checkbox"
      id={id}
      name={name}
      className={`checkbox-input ${
        validity === true ? "checkbox-input--valid" : ""
      }`}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id} className="checkbox-label">
      {labelText}
    </label>
  </>
);
