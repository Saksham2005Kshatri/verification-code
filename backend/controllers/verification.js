const verifyClient = (clientCode) => {
  const stringCode = String(clientCode);
  if (stringCode.length == 6 && stringCode[stringCode.length - 1] !== "7") {
    return true;
  }
  return false;
};

const userVerificationCode = (req, res) => {
  const { code } = req.body;
  console.log("ClientCode=", code);

  if (verifyClient(parseInt(code))) {
    //  res.status(200).json({ code });
    return res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "Invalid code" });
  }
};

export default userVerificationCode;
