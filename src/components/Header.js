import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export default function Header(props) {
    const history = useHistory();

    console.log(props.user)

    const handleLogout = async () => {

        try {
            const req = await fetch("https://localhost:5000/auth/logout", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            console.log("fetch", req)
            if (req.status === 204) {
                props.setUser(null);
                localStorage.removeItem("token");
                history.push("/login");
            } else alert("cannot log out");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i class="fas fa-jedi"></i> ProFlyer</Link>
                </h1>
                <ul>
                    <li><Link to="/coaches">Coaches</Link></li>
                    <li><Link to="/camps">Camps</Link></li>

                    <li> {!props.user ?
                        <Link to="/register">Register</Link>
                        :
                        <Link to="/profile">{props.user.name}</Link>}
                    </li>

                    <li> {!props.user ?
                        <Link to="/login">Login</Link>
                        :
                        <Link onClick={handleLogout} >Logout</Link>}</li>
                </ul>
            </nav>
        </div>
    )
}

