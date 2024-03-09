import React, { useState } from "react";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [fileCover, setFileCover] = useState(null);
  const [user, setUser] = useState({
    username: "",
    fullname:"",
    email: "",
    password: "",
    img: "",
    isAdmin: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await newRequest.post("/auth/register", {
        ...user,
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <form className="registerForm" onSubmit={handleSubmit}>
        <h1>Join the platform</h1>
        <label htmlFor="">Fullname</label>
        <input
        name="fullname"
        type="text"
        placeholder="Joseph Campbell"
        onChange={handleChange}
        />

        <label htmlFor="">Email</label>
        <input
        name="email"
        type="email"
        placeholder="email"
        onChange={handleChange}
        />

        <label htmlFor="">Username</label>
        <input
        name="username"
        type="text"
        placeholder="johndoe"
        onChange={handleChange}
        />
        

        <label htmlFor="">Password</label>
        <input name="password" type="password" onChange={handleChange} />
    
        <div className="buttons">
            <button onClick={()=>{navigate("/")}}>Return</button>
            <button type="submit">Register</button>
        </div>

      </form>
    </div>
  );
}

export default Register;