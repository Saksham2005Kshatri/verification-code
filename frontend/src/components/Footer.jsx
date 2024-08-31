import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>
        &copy; {new Date().getFullYear()} Saksham Kshatri -
        <a
          href="https://github.com/Saksham2005Kshatri"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          GitHub Profile
        </a>
      </p>
    </footer>
  );
};

const footerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  textAlign: "center",
  padding: "10px",
  backgroundColor: "#f1f1f1",
  fontSize: "30px",
};

const linkStyle = {
  marginLeft: "5px",
  textDecoration: "none",
  color: "blue",
};

export default Footer;
