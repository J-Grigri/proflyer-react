import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import "../entryPage.css"
import { Link } from 'react-router-dom'

require("dotenv").config({ path: "../env" });

export default function EntryPage(props) {

    const [formInput, setFormInput] = useState()
    const [formState, setFormState] = useState(props.page)

    useEffect(() => {
        setFormState(props.page)
    }, [props.page])

    const handleChange = e => {
        setFormInput({
            ...formInput, [e.target.name]: e.target.value
        })
    }

    async function login(e) {
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

    async function register(e) {
        e.preventDefault();
        const { name, email, password, password2 } = formInput;

        if (password !== password2) {
            alert("Passwords do not match")
        } else {
            const res = await fetch(process.env.REACT_APP_SERVER + "/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formInput)
            });
            if (res.status === 200 || 201) {
                const data = await res.json()

                localStorage.setItem("token", data.data.token)
                props.setUser(data.data.user)


            } else {
                return alert("Registration not successful")
            }
        }
    }

    async function forgotPassword(e) {
        e.preventDefault()
        const { email } = formInput

        if (!email) return alert("Please input a valid email")

        const res = await fetch(process.env.REACT_APP_SERVER + "/users/forgot-password/" + email, {
            method: 'GET',
        })

        if (res.status === 200) {
            alert("Please followe the link sent to your email to reset your password")
        }
    }

    const loginFields = [{
        type: "email",
        name: "email",
        placeholder: "Email",
        text: "email",
        icon: "envelope",
    },
    {
        type: "password",
        name: "password",
        placeholder: "Password",
        text: "password",
        icon: "key",
    },]

    const registerFields = [{
        type: "text",
        name: "name",
        placeholder: "Full name",
        text: "Password",

        icon: "user"
    },
    {
        placeholder: "Email",
        text: "Email",
        type: "email",
        name: "email",
        icon: "envelope"
    }, {
        placeholder: "Password",
        text: "Password",
        type: "password",
        name: "password",
        icon: "key",
        minLength: "6"
    }, {
        placeholder: "Repeat password",
        text: "Repeat password",
        type: "password",
        name: "password2",
        icon: "key",
        minLength: "6"
    },]

    const forgotPWFields = [{
        text: "User email",
        type: "email",
        name: "email",
        icon: "key",
        placeholder: "Email"
    },]

    console.log("formInput", formInput)

    const renderForm = (state) => {

        //Login section
        if (state === "login")
            return (
                <div className="container" >
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Login</h3>
                                <div>
                                    <a href={process.env.REACT_APP_SERVER + "/auth/facebook"}><i style={{ color: "white", }} class="fab fa-facebook-square"></i></a>
                                    <a href={process.env.REACT_APP_SERVER + "/auth/google"}><i style={{ color: "white" }} class="fab fa-google"></i></a>
                                </div>

                            </div>
                            <div className="card-body">

                                <form onChange={handleChange} onSubmit={login}>
                                    {loginFields.map(e => {
                                        return (
                                            <div className="input-group form-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className={`fas fa-${e.icon}`}></i></span>
                                                </div>
                                                <input className="form-control" {...e} />
                                            </div>
                                        )
                                    })}

                                    <div class="d-flex justify-content-center">
                                        <a className="forgotpsw" onClick={() => setFormState("resetPW")} >Forgot your password?</a>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Login" className="btn float-right login_btn" />
                                    </div>
                                    <div class="card-footer">
                                        <div class="d-flex justify-content-center links" style={{ display: "flex", flexDirection: "Column", alignItems: "center" }}>
                                            Don't have an account?
                                            <br></br>
                                            <a style={{ cursor: "pointer" }}>
                                                <Link to="/register">
                                                    Sign Up
                                            </Link></a>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            )

        //REGISTER NEW USER
        else if (state === "register") {
            return (
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Register</h3>
                                <div className="d-flex justify-content-end social_icon">
                                    <span><i className="fab fa-facebook-square"></i></span>
                                    <span><i className="fab fa-google-plus-square"></i></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onChange={handleChange} onSubmit={register}>
                                    {registerFields.map(e => {
                                        return (
                                            <div className="input-group form-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className={`fas fa-${e.icon}`}></i></span>
                                                </div>
                                                <input className="form-control" {...e} />
                                            </div>
                                        )
                                    })}
                                    <div className="form-group">
                                        <input type="submit" value="Go!" className="btn float-right login_btn" />
                                        <p style={{ cursor: "pointer" }}>
                                            <Link to="/login">
                                                Already registered?  Sign in!</Link> </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        else if (state === "resetPW") {
            return (
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Reset password</h3>
                                <p> Reset will be sent to you email. Follow the link to reset your password </p>
                            </div>
                            <div className="card-body">

                                <form onChange={handleChange} onSubmit={forgotPassword}>
                                    {forgotPWFields.map(e => {
                                        return (
                                            <div className="input-group form-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className={`fas fa-${e.icon}`}></i></span>
                                                </div>
                                                <input className="form-control" {...e} />
                                            </div>
                                        )
                                    })}

                                    <div className="form-group">
                                        <input type="submit" value="Go!" className="btn float-right login_btn" />
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    return (
        <div className="container col ">
            {renderForm(formState)}
        </div>
    )
}
