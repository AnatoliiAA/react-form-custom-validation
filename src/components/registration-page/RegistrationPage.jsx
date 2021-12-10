import { RegistrationForm } from "../registration-form/RegistrationForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import "./RegistrationPage.scss";
import background from "../../img/1.png";

const formClassName = "registration-page";

export const RegistrationFormExtended = () => (
  <div className={formClassName}>
    <div className={`${formClassName}__leftbar`}>
      <div className={`${formClassName}__header`}>
        <h1 className={`${formClassName}__title`}>
          <span className={`${formClassName}__icon`}>
            <FontAwesomeIcon icon={faTicketAlt} />
          </span>
          Lottery Display
        </h1>
        <p className={`${formClassName}__text`}>
          A few clicks away from creating your Lottery Display
        </p>
      </div>
      <img
        src={background}
        className={`${formClassName}__image`}
        alt="lottery"
      />
    </div>
    <div className={`${formClassName}__rightbar`}>
      <RegistrationForm />
    </div>
  </div>
);
