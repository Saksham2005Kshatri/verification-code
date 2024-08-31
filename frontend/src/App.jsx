import { useState } from "react";
import Verification from "./components/Verification";
import Footer from "./components/Footer.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Verification />
      <Footer />
    </>
  );
}

export default App;
