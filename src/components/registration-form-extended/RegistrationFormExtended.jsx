import { RegistrationForm } from "../registration-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import "./RegistrationFormExtended.scss";
import background from "../../img/1.png";

export const RegistrationFormExtended = () => (
  <div className="registration-form-extended">
    <div className="registration-form-extended__leftbar">
      <div className="registration-form-extended__header">
        <h1 className="registration-form-extended__title">
          <span className="registration-form-extended__icon">
            <FontAwesomeIcon icon={faTicketAlt} />
          </span>
          Lottery Display
        </h1>
        <p className="registration-form-extended__text">
          A few clicks away from creating your Lottery Display
        </p>
      </div>
      <img
        src={background}
        className="registration-form-extended__image"
        alt="lottery"
      />
    </div>
    <div className="registration-form-extended__rightbar">
      <RegistrationForm />
    </div>
  </div>
);
