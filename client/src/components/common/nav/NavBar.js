import { Link } from "react-router-dom";
import "./navbar.css";

function NavBar() {
    console.log('NavBar displayed');

    return (
        <header className="nav_header">
            <nav className="navCenter">
                <ul className="navList">
                    <li className="navListItem">
                        <Link className="link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="navListItem">
                        <Link className="link" to="/about">
                            About
                        </Link>
                    </li>
                    <li className="navListItem">
                        <Link className="link" to="/contact">
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar;