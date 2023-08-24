import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
    if (email === "" || password === "") {
      alert("Wrong email or password");
      return;
    }
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();

    setEmail("");
    setPassword("");

    if (result.user && result.user.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please enter the correct details");
    }
  };
  return (
    <div className="register">
      <h1>Login</h1>
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

export default Login;
