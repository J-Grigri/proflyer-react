import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage(props) {

    const [formInput, setFormInput] = useState()

    //set state from user inputs
    const handleChange = e => {
        setFormInput({
            ...formInput, [e.target.name]: e.target.value
        })
    }

    //capture user input
    async function handleLogin(e) {
        e.preventDefault()
        const { email, password } = formInput

        if (!email || !password) {
            return alert("Please provide user email and password")
        }

        const res = await fetch(process.env.REACT_APP_SERVER + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        if (res.status === 200 || 201) {
            const data = await res.json()
            localStorage.setItem("token", data.data.token)
            await props.setUser(data.data.user)

        } else {
            return alert("Login not successful")
        }
    }



    return (

        <section className="container">
            <div className="alert alert-danger">
                Invalid credentials
             </div>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form
                className="form"
                onSubmit={handleLogin}
                onChange={handleChange}
            >
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
            <p className="my-1">
                Forgot your password? <Link to="login/forgot-password">Reset password</Link>
            </p>
            <ul>
                <li>
                    <a href={process.env.REACT_APP_SERVER + "/auth/facebook"}>
                        {" "}Login with facebook{" "}
                    </a>
                    <a href={process.env.REACT_APP_SERVER + "/auth/google"}>
                        {" "}Login with google{" "}
                    </a>


                </li>
            </ul>
        </section>

    )
}

