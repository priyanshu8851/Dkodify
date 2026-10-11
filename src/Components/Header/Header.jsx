import React from "react";
import "./header.css";

const Header = () => {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <a className="logo" href="/" aria-label="Decodify home">
       <span className="logo-mark" aria-hidden="true">⌘</span>Decodify
      </a>
      <span className="header-caption">Understand code with Gemini</span>
    </nav>
  );
};

export default Header;
