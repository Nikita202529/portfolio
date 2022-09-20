import React from "react";
import './style.scss';
import routeMain from "./routes";

import avatar from '../../assets/img/avatar.png';

const Contacts = () => {
  return (
    <div className="contactsPage">
      <div className="info">
        <div className="phone">
          <a href="tel:+79991234576">+7 (999) 123 45 76</a>
        </div>
        <div className="name">
          Никита <br/> Карлов
        </div>
        <div className="mail">
          <a href="mailto:mail@domain.com">mail@domain.com</a>
        </div>
        <div className="position">
          FrontEnd Developer
        </div>
        <div className="technologies">
          HTML CSS JS
        </div>
      </div>
      <div className="image">
        <img src={avatar} alt={avatar} />
      </div>
    </div>
  );
}

export {routeMain};

export default Contacts;