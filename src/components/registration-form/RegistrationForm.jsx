import { useState } from "react";
import { Input } from "../form-inputs/input/Input";
import { PasswordInput } from "../form-inputs/password-input/PasswordInput";
import { Checkbox } from "../form-inputs/checkbox-input/Checkbox";
import { validateField, checkValidationObj } from "../../helpers";
import "./RegistrationForm.scss";

export const RegistrationForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    repeatPassword: "",
    acceptReceiveEmails: false,
    acceptTerms: false,
  });

  const [inputsValid, setInputsValid] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    password: false,
    repeatPassword: false,
    acceptTerms: false,
  });

  const [showError, setShowError] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    password: false,
    repeatPassword: false,
    acceptTerms: false,
  });

  const formErrors = {
    firstName:
      "First Name should be at least 2 characters long and contain only alphabetic",
    lastName:
      "Last Name should be at least 2 characters long and contain only alphabetic",
    phone:
      "Phone should contain 12 digits and can have foollowing format: '+xxxxxxxxxxxx' or 'xxxxxxxxxxxx'",
    email: "You should enter a valid email",
    password: "Password should be at least 8 characters long",
    repeatPassword: "Passwords should match",
    acceptTerms: "This field is required",
  };

  const formClassName = "registration-form";

  const termsLinks = (
    <p>
      <a href="#" className={`${formClassName}__link`}>
        &nbsp;Term,{" "}
      </a>
      <a href="#" className={`${formClassName}__link`}>
        Privacy Policy{" "}
      </a>
      and{" "}
      <a href="#" className={`${formClassName}__link`}>
        Fees
      </a>
    </p>
  );

  const inputsData = [
    {
      type: "text",
      name: "firstName",
      id: "first-name",
      labelText: "First Name",
    },
    { type: "text", name: "lastName", id: "last-name", labelText: "Last Name" },
    {
      type: "tel",
      name: "phone",
      id: "phone-number",
      labelText: "Phone Number",
    },
    { type: "email", name: "email", id: "email", labelText: "Email" },
    {
      type: "password",
      name: "password",
      id: "password",
      labelText: "Password",
    },
    {
      type: "password",
      name: "repeatPassword",
      id: "repeat-password",
      labelText: "Repeat Password",
    },
  ];

  const createInput = (type, name, attrs) =>
    type === "password" ? (
      <PasswordInput
        name={name}
        onChange={handleInputChange}
        value={formValues[name]}
        validity={inputsValid[name]}
        error={formErrors[name]}
        showError={showError[name]}
        {...attrs}
      />
    ) : type === "checkbox" ? (
      <Checkbox
        name={name}
        onChange={handleInputChange}
        checked={formValues[name]}
        validity={inputsValid[name]}
        error={formErrors[name]}
        showError={showError[name]}
        {...attrs}
      />
    ) : (
      <Input
        type={type}
        name={name}
        onChange={handleInputChange}
        value={formValues[name]}
        validity={inputsValid[name]}
        error={formErrors[name]}
        showError={showError[name]}
        {...attrs}
      />
    );

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    const setValidityAndError = (name, validity) => {
      setInputsValid({ ...inputsValid, [name]: validity });
      setShowError({ ...showError, [name]: !validity });
    };

    const validateValue = (name, value) => {
      let validity;
      switch (name) {
        case "repeatPassword":
          validity = value === formValues.password ? true : false;
          break;
        case "acceptTerms":
          validity = !formValues.acceptTerms;
          break;
        default:
          validity = validateField(name, value);
      }
      return validity;
    };

    const validity = validateValue(name, value);
    setValidityAndError(name, validity);

    if (value === "") {
      setShowError({ ...showError, [name]: false });
    }

    setFormValues({ ...formValues, [name]: value });
  };

  const sendFormData = (dataObj) => {
    const response = fetch("https://google.com/", {
      method: "POST",
      mode: "no-cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(dataObj),
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formIsValid = checkValidationObj(inputsValid);
    if (formIsValid) {
      sendFormData(formValues);
      setFormValues({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        repeatPassword: "",
        acceptReceiveEmails: false,
        acceptTerms: false,
      });
      setInputsValid({
        firstName: false,
        lastName: false,
        phone: false,
        email: false,
        password: false,
        repeatPassword: false,
        acceptTerms: false,
      });
      return;
    }

    const newShowError = { ...inputsValid };
    for (let key in newShowError) {
      newShowError[key] = !newShowError[key];
    }
    setShowError(newShowError);
  };

  return (
    <div className="registration-wrapper">
      <h1 className={`${formClassName}__title`}>Register</h1>
      <h2 className={`${formClassName}__header`}>
        Manage all your lottery efficiently
      </h2>
      <p className={`${formClassName}__text`}>
        Let's get you all set up so you can verify your personal account and
        begin setting up your profile
      </p>
      <form className={formClassName} onSubmit={handleSubmit}>
        {inputsData.map((inputData) =>
          createInput(inputData["type"], inputData["name"], {
            id: inputData["id"],
            labelText: inputData["labelText"],
          })
        )}
        <div
          className={`${formClassName}__column ${formClassName}__column--wide`}
        >
          {createInput("checkbox", "acceptReceiveEmails", {
            id: "receive-emails",
            labelText: "Yes, I want to receive Lottery Display emails",
            validity: "",
          })}
          {createInput("checkbox", "acceptTerms", {
            id: "accept-terms",
            labelText: "I agree to the all",
            children: termsLinks,
          })}
        </div>
        <button className={`${formClassName}__submit`} type="submit">
          Create Account
        </button>
        <div
          className={`${formClassName}__column ${formClassName}__column--wide`}
        >
          <p>
            Already have an account?{" "}
            <a href="#" className={`${formClassName}__link`}>
              Log In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
