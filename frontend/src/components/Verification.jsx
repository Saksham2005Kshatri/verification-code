import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Verification = ({ callback, reset, isLoading }) => {
  const [code, setCode] = useState("");
  //   const [serverCode, setServerCode] = useState(null);
  const [errorIndices, setErrorIndices] = useState([]); // To track error
  const navigate = useNavigate();

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Reset all inputs and clear state
  const resetCode = () => {
    inputRefs.forEach((ref) => {
      ref.current.value = "";
    });
    inputRefs[0].current.focus();
    setCode("");
    setErrorIndices([]); // Clear errors on reset
  };

  useEffect(() => {
    resetCode();
  }, [reset]);

  function handleInput(e, index) {
    const input = e.target;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    if (!Number(input.value)) {
      setErrorIndices([index]);
      input.value = "";
      return;
    }

    // Update code state with single digit
    const newCode = [...code];
    newCode[index] = input.value;
    setCode(newCode.join(""));

    input.select();

    if (input.value === "") {
      // If the value is deleted, select previous input, if exists
      if (previousInput) {
        previousInput.current.focus();
      }
    } else if (nextInput) {
      // Select next input on entry, if exists
      nextInput.current.select();
    }

    // Reset errors if the input is valid
    setErrorIndices(errorIndices.filter((i) => i !== index));
  }

  function handleFocus(e) {
    e.target.select();
  }

  function handleKeyDown(e, index) {
    const input = e.target;
    const previousInput = inputRefs[index - 1];

    if ((e.keyCode === 8 || e.keyCode === 46) && input.value === "") {
      e.preventDefault();
      setCode(
        (prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1)
      );
      if (previousInput) {
        previousInput.current.focus();
      }
    }
  }

  const handlePaste = (e) => {
    const pastedCode = e.clipboardData.getData("text");
    if (pastedCode.length === 6 && /^\d{6}$/.test(pastedCode)) {
      setCode(pastedCode);
      inputRefs.forEach((inputRef, index) => {
        inputRef.current.value = pastedCode.charAt(index);
      });
      setErrorIndices([]); // Clear errors on valid paste
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numericalCode = parseInt(code);

    if (code.length === 6) {
      try {
        const response = await axios.post(
          "https://verification-code-2.onrender.com/api",
          {
            code: numericalCode,
          }
        );
        console.log(response);
        if (response.status === 200) {
          if (typeof callback === "function") {
            callback(numericalCode);
          }
          toast.success("Correct code, WELCOME!", {
            theme: "dark",
          });
          resetCode();
          navigate("/success");
        } else {
          toast.error("Incorrect code Try again", { theme: "dark" });
          console.log("Wrong code");
          resetCode();
        }
      } catch (error) {
        toast.error("Incorrect Code: ", { theme: "dark" });
        resetCode();
      }
    } else {
      toast.warn("Please enter a 6 digit code", { theme: "dark" });
    }
  };

  // Clear button deletes all inputs and selects the first input for entry
  const ClearButton = () => (
    <button type="button" className="clearButton" onClick={resetCode}>
      <FaTimes />
    </button>
  );

  return (
    <div className="verificationForm">
      <h2>Verification code:</h2>
      <form onSubmit={handleSubmit}>
        <div className="container">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <input
              type="text"
              className={`codeInput ${
                errorIndices.includes(index) ? "inputError" : ""
              }`} // Conditionally add error class
              key={index}
              maxLength={1}
              onChange={(e) => handleInput(e, index)}
              ref={inputRefs[index]}
              autoFocus={index === 0}
              onFocus={handleFocus}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={isLoading}
            />
          ))}
          {code.length ? <ClearButton /> : <></>}
        </div>
        <button type="submit" className="submitButton" disabled={isLoading}>
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Verification;
