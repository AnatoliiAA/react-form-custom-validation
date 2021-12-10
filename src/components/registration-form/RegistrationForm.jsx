import { useState } from "react";
import { TextInput } from "../form-inputs/text-input/TextInput";
import { PasswordInput } from "../form-inputs/password-input/PasswordInput";
import { CheckboxInput } from "../form-inputs/checkbox-input/CheckboxInput";
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
  checkValidationObj,
} from "../../helpers";
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
        case "firstName":
        case "lastName":
          validity = validateName(value);
          break;
        case "email":
          validity = validateEmail(value);
          break;
        case "phone":
          validity = validatePhone(value);
          break;
        case "password":
          validity = validatePassword(value);
          break;
        case "repeatPassword":
          validity = value === formValues.password ? true : false;
          break;
        case "acceptTerms":
          validity = !formValues.acceptTerms;
          break;
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
    if (!formIsValid) {
      const newShowError = { ...inputsValid };
      for (let key in newShowError) {
        newShowError[key] = !newShowError[key];
      }
      setShowError(newShowError);
    }
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
      <form className={formClassName}>
        <TextInput
          type="text"
          id="first-name"
          name="firstName"
          onChange={handleInputChange}
          value={formValues["firstName"]}
          labelText="First Name"
          validity={inputsValid["firstName"]}
          error={formErrors["firstName"]}
          showError={showError["firstName"]}
        />
        <TextInput
          type="text"
          id="last-name"
          name="lastName"
          onChange={handleInputChange}
          value={formValues["lastName"]}
          labelText="Last Name"
          validity={inputsValid["lastName"]}
          error={formErrors["lastName"]}
          showError={showError["lastName"]}
        />
        <TextInput
          type="tel"
          id="phone-number"
          name="phone"
          onChange={handleInputChange}
          value={formValues["phone"]}
          labelText="Phone Number"
          validity={inputsValid["phone"]}
          error={formErrors["phone"]}
          showError={showError["phone"]}
        />
        <TextInput
          type="email"
          id="email"
          name="email"
          onChange={handleInputChange}
          value={formValues["email"]}
          labelText="Email"
          validity={inputsValid["email"]}
          error={formErrors["email"]}
          showError={showError["email"]}
        />
        <PasswordInput
          id="password"
          name="password"
          onChange={handleInputChange}
          value={formValues["password"]}
          labelText="Password"
          validity={inputsValid["password"]}
          error={formErrors["password"]}
          showError={showError["password"]}
        />
        <PasswordInput
          id="repeat-password"
          name="repeatPassword"
          onChange={handleInputChange}
          value={formValues["repeatPassword"]}
          labelText="Repeat Password"
          validity={inputsValid["repeatPassword"]}
          error={formErrors["repeatPassword"]}
          showError={showError["repeatPassword"]}
        />
        <div
          className={`${formClassName}__column ${formClassName}__column--wide`}
        >
          <CheckboxInput
            id="receive-emails"
            name="acceptReceiveEmails"
            onChange={handleInputChange}
            checked={formValues["acceptReceiveEmails"]}
            labelText="Yes, I want to receive Lottery Display emails"
            validity={""}
          />
          <CheckboxInput
            id="accept-terms"
            name="acceptTerms"
            onChange={handleInputChange}
            checked={formValues["acceptTerms"]}
            labelText="I agree to the all"
            validity={inputsValid["acceptTerms"]}
            error={formErrors["acceptTerms"]}
            showError={showError["acceptTerms"]}
            children={termsLinks}
          />
        </div>
        <button className={`${formClassName}__submit`} onClick={handleSubmit}>
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
