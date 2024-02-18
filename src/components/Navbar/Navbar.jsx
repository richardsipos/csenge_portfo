import React from "react"
import { Link } from "react-router-dom";
import './Navbar.scss'
import  logo  from '../../assets/img/logo_csenge.png'

const Navbar = () =>{
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
            </div>
        </div>
    );
};

export default Navbar;