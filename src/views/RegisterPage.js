
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function RegisterPage(props) {
    const [formInput, setFormInput] = useState();

    console.log("form input HERE!", formInput)

    //Set state from user inputs 
    const handleChange = e => {
        setFormInput({ ...formInput, [e.target.name]: e.target.value })
    }

    //capture user input
    async function register(e) {
        e.preventDefault();
        const { name, email, password, password2 } = formInput;

        if (password !== password2) {
            alert("Passwords do not match")
        } else {
            const res = await fetch("https://localhost:5000/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formInput)
            });
            if (res.status === 201) {
                const data = await res.json()
                localStorage.setItem("token", data.data.token)

                props.setUser(data.data.user)


            } else {
                return alert("Sign up not successful")
            }
        }
    }


    return (
        <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={register} onChange={handleChange}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" required />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" />
                </div>
                <div className="form-group">
                    <small className="form-text">Password must be minimum 6 characters long</small>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                    />

                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </section>
    )
}
