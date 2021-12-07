import { useState } from "react";
import { TextInput } from "../form-inputs/text-input";
import { PasswordInput } from "../form-inputs/password-input";
import { CheckboxInput } from "../form-inputs/checkbox-input";
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

  const handleInputChange = (e) => {
    let value = e.target.value;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    if (e.target.name === "firstName" || e.target.name === "lastName") {
      const validity = validateName(value);
      setInputsValid({ ...inputsValid, [e.target.name]: validity });
    }

    if (e.target.name === "email") {
      const validity = validateEmail(value);
      setInputsValid({ ...inputsValid, [e.target.name]: validity });
    }

    if (e.target.name === "phone") {
      const validity = validatePhone(value);
      setInputsValid({ ...inputsValid, [e.target.name]: validity });
    }

    if (e.target.name === "password") {
      const validity = validatePassword(value);
      setInputsValid({ ...inputsValid, [e.target.name]: validity });
    }

    if (e.target.name === "repeatPassword") {
      const validity = value === formValues.password ? true : false;
      setInputsValid({ ...inputsValid, [e.target.name]: validity });
    }

    if (e.target.name === "acceptTerms") {
      const validity = !formValues.acceptTerms;
      setInputsValid({ ...inputsValid, [e.target.name]: validity });
    }

    setFormValues({ ...formValues, [e.target.name]: value });
  };

  const sendFormData = async (dataObj) => {
    const response = await fetch("https://google.com/", {
      method: "POST",
      mode: "cors",
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
    }
  };

  return (
    <div className="registration-wrapper">
      <h1 className="registration-form__title">Register</h1>
      <h2 className="registration-form__header">
        Manage all your lottery efficiently
      </h2>
      <p className="registration-form__text">
        Let's get you all set up so you can verify your personal account and
        begin setting up your profile
      </p>
      <form className="registration-form" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          id="first-name"
          name="firstName"
          onChange={handleInputChange}
          value={formValues["firstName"]}
          labelText="First Name"
          validity={inputsValid["firstName"]}
          error={formErrors["firstName"]}
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
        />
        <PasswordInput
          id="password"
          name="password"
          onChange={handleInputChange}
          value={formValues["password"]}
          labelText="Password"
          validity={inputsValid["password"]}
          error={formErrors["password"]}
        />
        <PasswordInput
          id="repeat-password"
          name="repeatPassword"
          onChange={handleInputChange}
          value={formValues["repeatPassword"]}
          labelText="Repeat Password"
          validity={inputsValid["repeatPassword"]}
          error={formErrors["repeatPassword"]}
        />
        <div className="registration-form__column registration-form__column--wide">
          <div className="registration-form__checkbox-wrapper">
            <CheckboxInput
              id="receive-emails"
              name="acceptReceiveEmails"
              onChange={handleInputChange}
              checked={formValues["acceptReceiveEmails"]}
              labelText="Yes, I want to receive Lottery Display emails"
              validity={""}
            />
          </div>
          <div className="registration-form__checkbox-wrapper">
            <CheckboxInput
              id="accept-terms"
              name="acceptTerms"
              onChange={handleInputChange}
              checked={formValues["acceptTerms"]}
              labelText="I agree to the all"
              validity={inputsValid["acceptTerms"]}
            />
            <p>
              <a href="#" className="registration-form__link">
                &nbsp;Term,{" "}
              </a>
              <a href="#" className="registration-form__link">
                Privacy Policy{" "}
              </a>
              and{" "}
              <a href="#" className="registration-form__link">
                Fees
              </a>
            </p>
          </div>
        </div>
        <button className="registration-form__submit">Create Account</button>
        <div className="registration-form__column registration-form__column--wide">
          <p>
            Already have an account?{" "}
            <a href="#" className="registration-form__link">
              Log In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
