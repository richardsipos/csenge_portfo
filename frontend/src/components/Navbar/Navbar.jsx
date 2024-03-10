import React from "react"
import { Link, useNavigate  } from "react-router-dom";
import './Navbar.scss'
import  logo  from '../../assets/img/logo_csenge.png'
import newRequest from "../../utils/newRequest";



const Navbar = () =>{

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await newRequest.post("/auth/logout");
          localStorage.setItem("currentUser", null);
          navigate("/");
        } catch (err) {
          console.log(err);
        }
    };

    return (
        <div className = "navbar">
            <div className="containerNav">
                <div className='logo'>
                    <Link to="/">
                        <img src={ logo }></img>
                    </Link>
                </div>
                <div className="links">
                    <Link className="link" to="/">
                        <h5>Home</h5>
                    </Link>
                    <Link className="link" to="/about">
                        <h5>About</h5>
                    </Link>
                    <Link className="link" to="/recipes">
                        <h5>Recipes</h5>
                    </Link>
                    <Link className="link" to="/qanda">
                        <h5>Q&A</h5>
                    </Link>
                </div>
                <div className="auth">
                    {currentUser ? (
                        <div className="deauthentification">
                            <p>Welcome <br /> {currentUser.fullname}</p>
                            <button onClick={handleLogout}>Log out</button>
                        </div>
                    ) : (
                        <div className="authentification">
                            <Link className="linkLogin" to="/login">
                                <h6>Login</h6>
                            </Link>
                            <Link className="linkRegister" to="/register">
                                <h6>Register</h6>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;