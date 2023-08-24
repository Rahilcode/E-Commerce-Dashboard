import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async () => {
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();

    setName("");
    setEmail("");
    setPassword("");
    if (result) {
      navigate("/login");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="btn"
        type="button"
        value={"Submit"}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Register;
