import React from "react";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { RegistrationForm } from "./RegistrationForm";

const selectors = {
  name: "#first-name",
  lastName: "#last-name",
  phone: "#phone-number",
  password: "#password",
  repeatPassword: "#repeat-password",
  email: "#email",
  submitButton: ".registration-form__submit",
  inputError: ".text-input__error",
  checkboxError: ".checkbox-input__error",
  acceptTerms: "#accept-terms",
  passwordVisibility: ".password-visibility"
};

describe("registration-form tests", () => {
  describe("render content tests", () => {
    it("should render a component", () => {
      const { container } = render(<RegistrationForm />);
      expect(container).toBeInTheDocument();
    });
    it("should match snapshot", () => {
      const tree = renderer.create(<RegistrationForm />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("actions tests", () => {
    it("should show 7 errors on submit if form is empty", () => {
      const { container } = render(<RegistrationForm />);
      const submitButton = container.querySelector(selectors["submitButton"]);

      fireEvent.click(submitButton);

      const errors = container.querySelectorAll(selectors["inputError"]);
      const checkboxError = container.querySelector(selectors["checkboxError"]);
      expect(errors.length).toBe(6);
      expect(checkboxError).toBeInTheDocument();
    });

    it("should show error on ivalid first name input", () => {
      const { container } = render(<RegistrationForm />);
      const nameInput = container.querySelector(selectors["name"]);

      fireEvent.change(nameInput, { target: { value: "123 Invalid" } });

      const error = container.querySelector(selectors["inputError"]);
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(
        "First Name should be at least 2 characters long and contain only alphabetic"
      );
    });

    it("should show error on ivalid last name input", () => {
      const { container } = render(<RegistrationForm />);
      const nameInput = container.querySelector(selectors["lastName"]);

      fireEvent.change(nameInput, { target: { value: "123 Invalid" } });

      const error = container.querySelector(selectors["inputError"]);
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(
        "Last Name should be at least 2 characters long and contain only alphabetic"
      );
    });

    it("should show error on ivalid phone number input", () => {
      const { container } = render(<RegistrationForm />);
      const phoneInput = container.querySelector(selectors["phone"]);

      fireEvent.change(phoneInput, { target: { value: "invalid" } });

      const error = container.querySelector(selectors["inputError"]);
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(
        "Phone should contain 12 digits and can have foollowing format: '+xxxxxxxxxxxx' or 'xxxxxxxxxxxx'"
      );
    });

    it("should show error on ivalid email input", () => {
      const { container } = render(<RegistrationForm />);
      const emailInput = container.querySelector(selectors["email"]);

      fireEvent.change(emailInput, { target: { value: "invalid" } });

      const error = container.querySelector(selectors["inputError"]);
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent("You should enter a valid email");
    });

    it("should show error on ivalid password input", () => {
      const { container } = render(<RegistrationForm />);
      const passwordInput = container.querySelector(selectors["password"]);

      fireEvent.change(passwordInput, { target: { value: "1" } });

      const error = container.querySelector(selectors["inputError"]);
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(
        "Password should be at least 8 characters long"
      );
    });

    it("should show error on ivalid repeat password input", () => {
      const { container } = render(<RegistrationForm />);
      const passwordInput = container.querySelector(selectors["password"]);
      const repeatPasswordInput = container.querySelector(selectors["repeatPassword"]);

      fireEvent.change(passwordInput, { target: { value: "123456789" } });
      fireEvent.change(repeatPasswordInput, {
        target: { value: "987654321" },
      });

      const error = container.querySelector(selectors["inputError"]);
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent("Passwords should match");
    });

    it("should show an error if you uncheck required checkbox", () => {
      const { container } = render(<RegistrationForm />);
      const checkboxInput = container.querySelector(selectors["acceptTerms"]);

      fireEvent.click(checkboxInput);
      fireEvent.click(checkboxInput);

      const error = container.querySelector(selectors["checkboxError"]);
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent("This field is required");
    });

    it("should not show error after clearing field with invalid data", () => {
      const { container } = render(<RegistrationForm />);
      const nameInput = container.querySelector(selectors["name"]);
      fireEvent.change(nameInput, { target: { value: "123 Invalid" } });
      const error = container.querySelector(selectors["inputError"]);
      fireEvent.change(nameInput, { target: { value: "" } });
      expect(error).not.toBeInTheDocument();
    });

    it("should show password after clicking on visibility button", () => {
      const { container } = render(<RegistrationForm />);
      const passwordInput = container.querySelector(selectors["password"]);
      const visibilityButton = container.querySelector(".password-visibility");

      fireEvent.click(visibilityButton);

      expect(passwordInput.type).toBe("text");
    });

    it("should clear form on submit if every required field is filled correctly", () => {
      const { container } = render(<RegistrationForm />);
      const submitButton = container.querySelector(
        ".registration-form__submit"
      );
      const nameInput = container.querySelector(selectors["name"]);
      const lastnameInput = container.querySelector(selectors["lastName"]);
      const phoneInput = container.querySelector(selectors["phone"]);
      const emailInput = container.querySelector(selectors["email"]);
      const passwordInput = container.querySelector(selectors["password"]);
      const repeatPasswordInput = container.querySelector(selectors["repeatPassword"]);
      const checkboxInput = container.querySelector(selectors["acceptTerms"]);

      fireEvent.change(nameInput, { target: { value: "Valid" } });
      fireEvent.change(lastnameInput, { target: { value: "Valid" } });
      fireEvent.change(phoneInput, { target: { value: "123123123123" } });
      fireEvent.change(emailInput, { target: { value: "email@email.com" } });
      fireEvent.change(passwordInput, { target: { value: "12345678" } });
      fireEvent.change(repeatPasswordInput, {
        target: { value: "12345678" },
      });
      fireEvent.click(checkboxInput);
      fireEvent.click(submitButton);

      expect(nameInput).toHaveValue("");
      expect(lastnameInput).toHaveValue("");
      expect(phoneInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
      expect(passwordInput).toHaveValue("");
      expect(repeatPasswordInput).toHaveValue("");
      expect(checkboxInput).not.toBeChecked();
    });
  });
});
