import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import "../navbar.css"

export default function Header(props) {
    const history = useHistory();

    console.log("props.user in Header", props.user)

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
        <div className="kheader">
            <header>
                <div id="mynav" className="navbar navbar-expand-lg fixed-top ">
                    <nav className="topRow">
                        <Link to="/" className="navbar-brand  font-weight-bold"><i className="fas fa-jedi"></i>ProFlyer</Link>
                        <button
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            className="navbar-toggler navbar-toggler-right"
                        >
                            <i class="fa fa-bars"></i>
                        </button>

                        <div id="navbarSupportedContent" className="collapse navbar-collapse">
                            <ul
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                                className="navbar-nav ml-auto">

                                <li class="nav-item"> {!props.user ?
                                    <Link to="/" class="nav-link font-weight-bold" style={{ fontSize: "medium" }}>Home</Link>
                                    :
                                    <Link to="/main" class="nav-link font-weight-bold" style={{ fontSize: "medium" }}>Home</Link>}
                                </li>

                                <li class="nav-item"><Link to="/coaches" class="nav-link font-weight-bold" style={{ fontSize: "medium" }}> Coaches</Link></li>

                                <li class="nav-item"><Link to="/camps" class="nav-link font-weight-bold" style={{ fontSize: "medium" }} >Camps</Link></li>

                                <li class="nav-item"> {!props.user ?
                                    <span></span>
                                    :
                                    <Link to="/camps/create" class="nav-link font-weight-bold" style={{ fontSize: "medium" }}>Organize</Link>}
                                </li>

                                <li class="nav-item"> {!props.user ?
                                    <Link to="/register" class="nav-link font-weight-bold" style={{ fontSize: "medium" }} >Register</Link>
                                    :
                                    <Link to="/profile" class="nav-link font-weight-bold" style={{ fontSize: "medium" }}>{props.user.name}</Link>}
                                </li>
                                <li class="nav-item">
                                    {!props.user ?
                                        <Link to="/login" class="nav-link font-weight-bold" style={{ fontSize: "medium" }} >Login</Link>
                                        :
                                        <Link onClick={handleLogout} class="nav-link font-weight-bold" style={{ fontSize: "medium" }} >Logout</Link>}
                                </li>
                            </ul>
                        </div>


                    </nav>
                </div>
            </header>
        </div>
    )
}

