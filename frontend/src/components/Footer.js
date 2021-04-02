import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__author">&copy;{new Date().getFullYear()}. Илья Шнырев</p>
    </footer>
  );
}
export default Footer;
