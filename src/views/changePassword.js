import React, { useState } from 'react'

export default function () {

    const [formInput, setFormInput] = useState(null)

    const handleChange = e => {
        setFormInput({
            ...formInput, [e.target.name]: e.target.value
        })
    }

    //reset user input
    async function resetPassword(e, req) {
        e.preventDefault();
        const { password, password2 } = formInput;

        const urlToken = window.location.href
            .split("email/")[1]
            ? window.location.href.split("email/")[1]
            : null;

        if (password !== password2) {
            alert("Passwords do not match")
        }
        else {
            const res = await fetch(process.env.REACT_APP_SERVER + "/users/change-password/" + urlToken, {
                method: 'POST',
                body: JSON.stringify({ password }),
                headers: {
                    "content-type": "application/json"
                }
            })

            if (res.status === 201) {
                const data = await res.json()
                // localStorage.setItem("token", data.data.token)
                // props.setUser(data.data.user)
            } else {
                return alert("Password reset failed")
            }
        }

    }
    return (
        <div>
            <div className="container">
                <h1 className="large text-primary">Reset password</h1>
                <form className="form"
                    onSubmit={resetPassword}
                    onChange={handleChange}>
                    <div className="form-group">
                        Please input your proFlyer user email:
                            <input
                            type="password"
                            name="password"
                        />
                        <input
                            type="password2"
                            name="password2"
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Change passworrd" />
                </form>

            </div>
        </div>
    )
}