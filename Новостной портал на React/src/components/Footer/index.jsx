import React from "react";
import './style.scss';

const Footer = () => {
  return (
    <footer className="mainFooter">
      <div>
        Новостник
        <div className="small">
          Single Page Application
        </div>
      </div>
      <div className="small">
        Дипломный проект
      </div>
      <div>
        <div className="small">Made By</div>
        Никита Карлов
      </div>
    </footer>
  );
}

export default Footer;