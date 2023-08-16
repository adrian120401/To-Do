import { Link } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"
import {PiSignIn} from 'react-icons/pi';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { Menu } from "./Menu";

const Navbar = ({url}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    
    const {user, logOut} = UserAuth()

    const handleToggle = () => {
      setIsCollapsed(!isCollapsed);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

    const handleLogout = async() =>{
        try {
            await logOut()
        } catch (error) {
            console.error(error)
        }
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-light" style={{"backgroundColor": "#e3f2fa"}}>
            <button className={`navbar-toggler mx-3 border-0 d-lg-none`} type="button" onClick={toggleMenu}>
               <span className="navbar-toggler-icon"></span> 
            </button>
            <a className="navbar-brand m-auto" href="/">Easy Task</a>
                <button className="navbar-toggler mx-3 border-0" type="button" onClick={handleToggle} aria-expanded={!isCollapsed}>
                    <FontAwesomeIcon icon={faUser} />
                </button>
            <div className={`collapse navbar-collapse justify-content-between ${isCollapsed ? 'collapse' : 'show'}`} id="navbarNav">
                <ul className="navbar-nav  mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link mx-1" to='account'>Account</Link>
                    </li>  
                </ul>
                <div>
                    {user?.displayName ?
                            <button type="button" className="btn btn-outline-danger mx-1" onClick={handleLogout}>Logout</button>
                            :
                            <Link className="nav-link text-primary mx-1" to='signin'>Sign in <PiSignIn /></Link>}
                </div>
            
                      
            </div>
            <Menu isOpen={isMenuOpen} isMenuOpen={setIsMenuOpen} url={url} />
        </nav>
    )
}

export {Navbar}