import React from "react";
import { LocaleStrings } from "../../constants/locale-strings";
import "./footer.scss";

const Footer = () => (
  <footer className="footer">{LocaleStrings.footer.copyRightText}</footer>
);

export default Footer;
