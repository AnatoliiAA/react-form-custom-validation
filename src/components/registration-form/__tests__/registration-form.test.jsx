import React, { useState } from "react";
import {
  render,
  waitFor,
  fireEvent,
  prettyDOM,
} from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { RegistrationForm } from "../RegistrationForm";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const beforeActions = () => {
  useState.mockImplementation(jest.requireActual("react").useState);
};

describe("registration-form tests", () => {
  describe("render content tests", () => {
    beforeEach(() => {
      beforeActions();
    });
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
    beforeEach(() => {
      beforeActions();
    });
    it("should show 7 errors on submit if form is empty", async () => {
      const { container } = render(<RegistrationForm />);
      const submitButton = container.querySelector(
        ".registration-form__submit"
      );
      await waitFor(() => {
        fireEvent.click(submitButton);
      });
      const errors = container.querySelectorAll(".text-input__error");
      waitFor(() => {
        expect(errors.length).toBe(7);
      });
    });

    it("should show error on ivalid first name input", async () => {
      const { container } = render(<RegistrationForm />);
      const nameInput = container.querySelector("#first-name");
      await waitFor(() => {
        fireEvent.change(nameInput, { target: { value: "123 Invalid" } });
      });
      const error = container.querySelector(".text-input__error");
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(
        "First Name should be at least 2 characters long and contain only alphabetic"
      );
    });

    it("should show error on ivalid last name input", async () => {
      const { container } = render(<RegistrationForm />);
      const nameInput = container.querySelector("#last-name");
      await waitFor(() => {
        fireEvent.change(nameInput, { target: { value: "123 Invalid" } });
      });
      const error = container.querySelector(".text-input__error");
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(
        "Last Name should be at least 2 characters long and contain only alphabetic"
      );
    });

    it("should show error on ivalid phone number input", async () => {
      const { container } = render(<RegistrationForm />);
      const phoneInput = container.querySelector("#phone-number");
      await waitFor(() => {
        fireEvent.change(phoneInput, { target: { value: "invalid" } });
      });
      const error = container.querySelector(".text-input__error");
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(
        "Phone should contain 12 digits and can have foollowing format: '+xxxxxxxxxxxx' or 'xxxxxxxxxxxx'"
      );
    });

    it("should show error on ivalid email input", async () => {
      const { container } = render(<RegistrationForm />);
      const emailInput = container.querySelector("#email");
      await waitFor(() => {
        fireEvent.change(emailInput, { target: { value: "invalid" } });
      });
      const error = container.querySelector(".text-input__error");
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent("You should enter a valid email");
    });

    it("should show error on ivalid password input", async () => {
      const { container } = render(<RegistrationForm />);
      const passwordInput = container.querySelector("#password");
      await waitFor(() => {
        fireEvent.change(passwordInput, { target: { value: "1" } });
      });
      const error = container.querySelector(".text-input__error");
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(
        "Password should be at least 8 characters long"
      );
    });

    it("should show error on ivalid repeat password input", async () => {
      const { container } = render(<RegistrationForm />);
      const passwordInput = container.querySelector("#password");
      const repeatPasswordInput = container.querySelector("#repeat-password");
      await waitFor(() => {
        fireEvent.change(passwordInput, { target: { value: "123456789" } });
      });
      await waitFor(() => {
        fireEvent.change(repeatPasswordInput, {
          target: { value: "987654321" },
        });
      });
      const error = container.querySelector(".text-input__error");
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent("Passwords should match");
    });

    it("should show an error if you uncheck required checkbox", async () => {
      const { container } = render(<RegistrationForm />);
      const checkboxInput = container.querySelector("#accept-terms");
      await waitFor(() => {
        fireEvent.click(checkboxInput);
      });
      await waitFor(() => {
        fireEvent.click(checkboxInput);
      });
      const error = container.querySelector(".checkbox-input__error");
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent("This field is required");
    });

    it("should not show error after clearing field with invalid data", async () => {
      const { container } = render(<RegistrationForm />);
      const nameInput = container.querySelector("#first-name");
      await waitFor(() => {
        fireEvent.change(nameInput, { target: { value: "123 Invalid" } });
      });
      const error = container.querySelector(".text-input__error");
      await waitFor(() => {
        fireEvent.change(nameInput, { target: { value: "" } });
      });
      expect(error).not.toBeInTheDocument();
    })

    it("should show password after clicking on visibility button", async () => {
      const { container } = render(<RegistrationForm />);
      const passwordInput = container.querySelector("#password");
      const visibilityButton = container.querySelector(".password-visibility");
      await waitFor(() => {
        fireEvent.click(visibilityButton);
      });
      expect(passwordInput.type).toBe("text");
    })

    it("should clear form on submit if every required field is filled correctly", async () => {
      const { container } = render(<RegistrationForm />);
      const submitButton = container.querySelector(
        ".registration-form__submit"
      );
      const nameInput = container.querySelector("#first-name");
      const lastnameInput = container.querySelector("#last-name");
      const phoneInput = container.querySelector("#phone-number");
      const emailInput = container.querySelector("#email");
      const passwordInput = container.querySelector("#password");
      const repeatPasswordInput = container.querySelector("#repeat-password");
      const checkboxInput = container.querySelector("#accept-terms");
      
      await waitFor(() => {
        fireEvent.change(nameInput, { target: { value: "Valid" } });
      });
      await waitFor(() => {
        fireEvent.change(lastnameInput, { target: { value: "Valid" } });
      });
      await waitFor(() => {
        fireEvent.change(phoneInput, { target: { value: "123123123123" } });
      });
      await waitFor(() => {
        fireEvent.change(emailInput, { target: { value: "email@email.com" } });
      });
      await waitFor(() => {
        fireEvent.change(passwordInput, { target: { value: "12345678" } });
      });
      await waitFor(() => {
        fireEvent.change(repeatPasswordInput, { target: { value: "12345678" } });
      });
      await waitFor(() => {
        fireEvent.click(checkboxInput);
      });
      await waitFor(() => {
        fireEvent.click(submitButton);
      });
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
