import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import { useContext } from "react";


import "./navbar.css";

function NavBar() {
    console.log('NavBar displayed');

    // Get the user and dispatch objects from the Context.Provider.
    const { user, dispatch } = useContext(Context);
    console.log('at Navbar user: ', user)

    const PublicFolder = "http://localhost:8000/api/images/"
   
    const handleLogout = () => {
        console.log('At the handleLogout funct')
        dispatch({ type: "LOGOUT" });
    };
    console.log("NavBar user: ", user)
    return (
        <header className="navWrapper">
            <nav className="navCenter">
                <ul className="navList">
                    <li className="navListItem">
                        <Link className="link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="navListItem">
                        <Link className="link" to="/write">
                        WRITE
                        </Link>
                    </li>
                    <li className="navListItem" onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </nav>

            {/*  If user is logged in, then display the picture on the right side, else display LOIGN and REGISTER. */}
            <div className="topRight">
                {user ? 
                    (
                        <Link to="/settings">
                            <img className="topImg" src={PublicFolder+user.profilePic} alt="" />
                        </Link>
                    ):
                    (
                        <ul className="topList">
                            <li className="topListItem">
                                <Link className="link" to="/login">
                                    LOGIN
                                </Link>
                            </li>
                            <li className="topListItem">
                                <Link className="link" to="/register">
                                    REGISTER
                                </Link>
                            </li>
                        </ul>
                    )
                }
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </header>
    )
}

export default NavBar;