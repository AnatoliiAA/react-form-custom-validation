describe("My First Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Input fields get 'valid' or 'invalid' class name depending on input data validity", () => {
    cy.get("#first-name")
      .type("123invalid")
      .should("have.class", "text-input--invalid")
      .clear()
      .type("Alex")
      .should("have.class", "text-input--valid");

    cy.get("#last-name")
      .type("123invalid")
      .should("have.class", "text-input--invalid")
      .clear()
      .type("Jameson")
      .should("have.class", "text-input--valid");

    cy.get("#phone-number")
      .type("123")
      .should("have.class", "text-input--invalid")
      .clear()
      .type("380000000000")
      .should("have.class", "text-input--valid")
      .clear()
      .type("+380000000000")
      .should("have.class", "text-input--valid");

    cy.get("#email")
      .type("123")
      .should("have.class", "text-input--invalid")
      .clear()
      .type("email@some.com")
      .should("have.class", "text-input--valid");

    cy.get("#password")
      .type("123")
      .should("have.class", "text-input--invalid")
      .clear()
      .type("12345678")
      .should("have.class", "text-input--valid");

    cy.get("#repeat-password")
      .type("qwerty")
      .should("have.class", "text-input--invalid")
      .clear()
      .type("12345678")
      .should("have.class", "text-input--valid");

    cy.get("#accept-terms")
      .check()
      .should("have.class", "checkbox-input--valid")
      .uncheck()
      .should("have.class", "checkbox-input--invalid");
  });

  it("Empty inputs gets 'invalid' classname and error is shown on form submit", () => {
    cy.get(".registration-form__submit").click();
    cy.get("#first-name").should("have.class", "text-input--invalid");
    cy.get("#last-name").should("have.class", "text-input--invalid");
    cy.get("#phone-number").should("have.class", "text-input--invalid");
    cy.get("#email").should("have.class", "text-input--invalid");
    cy.get("#password").should("have.class", "text-input--invalid");
    cy.get("#repeat-password").should("have.class", "text-input--invalid");
    cy.get("#accept-terms").should("have.class", "checkbox-input--invalid");
    for (let i = 1; i < 7; i++) {
      cy.get(
        `:nth-child(${i}) > .text-input-label > .text-input__error`
      ).should("exist");
    }
    cy.get(".checkbox-input__error").should("exist");
  });

  it("Should make a request with valid data on click on 'Create Account' button", () => {
    cy.intercept({
      method: "POST",
    }).as("requestCheck");

    cy.get("#first-name").type("Alex");
    cy.get("#last-name").type("Jameson");
    cy.get("#phone-number").type("380000000000");
    cy.get("#email").type("email@some.com");
    cy.get("#password").type("12345678");
    cy.get("#repeat-password").type("12345678");
    cy.get("#accept-terms").check();

    cy.get(".registration-form__submit").click();
    cy.wait("@requestCheck");

    cy.get("@requestCheck")
      .its("request.body")
      .should(
        "deep.equal",
        JSON.stringify({
          firstName: "Alex",
          lastName: "Jameson",
          phone: "380000000000",
          email: "email@some.com",
          password: "12345678",
          repeatPassword: "12345678",
          acceptReceiveEmails: false,
          acceptTerms: true,
        })
      );
  });
});
