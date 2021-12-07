import { useState } from "react";
import { TextInput } from "../text-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import "./PasswordInput.scss";

export const PasswordInput = ({
  value,
  id,
  name,
  onChange,
  labelText,
  validity,
  error,
}) => {
  const [visibility, setVisibility] = useState(false);

  const handleVisibilityChange = () => {
    setVisibility(!visibility);
  };

  const visibilityIcon = (
    <span className="password-visibility" onClick={handleVisibilityChange}>
      <FontAwesomeIcon icon={visibility ? faEye : faEyeSlash} />
    </span>
  );

  return (
    <>
      <TextInput
        type={visibility ? "text" : "password"}
        value={value}
        id={id}
        name={name}
        onChange={onChange}
        labelText={labelText}
        validity={validity}
        error={error}
        children={visibilityIcon}
      />
    </>
  );
};
