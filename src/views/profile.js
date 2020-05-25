import React, { useState } from 'react'
import { Button, ButtonGroup, form, Col, Form } from 'react-bootstrap';

export default function Profile(props) {

    const [formInput, setFormInput] = useState({ ...props.user })

    const handleChange = e => {
        setFormInput({
            ...formInput, [e.target.name]: e.target.value
        })
    }

    async function updateProfile(e) {
        e.preventDefault()

        const { name, email, password } = formInput


        const res = await fetch("https://localhost:5000/users/me/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")

            },
            body: JSON.stringify({ name, email, password })
        });
        if (res.status === 200) {
            const data = await res.json()
            // localStorage.setItem("token", data.data.token)
            props.setUser(data.data)
            console.log(data.data);
            console.log("Updated successfully")

        } else {
            return alert("Profile update failed")
        }
    }

    // async function uploadFile(e){
    //     e.preventDefault()

    //     const res = await fetch("",{
    //         method: "POST",
    //     })
    // }


    return (
        <div class="container">
            <h1 className="large text-primary">Update Profile</h1>
            <form className="form"
                onSubmit={updateProfile}
                onChange={handleChange}>
                <div className="form-group">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formInput.name}
                    />
                </div>
                <div className="form-group">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formInput.email}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"

                    />
                </div>

                <input type="image">

                </input>

                <input type="submit" className="btn btn-primary" value="Update profile" />
            </form>
            {/* <ButtonGroup className="mb-2">
                <Button>Student Profile</Button>
                <Button>Coach Profile</Button>
            </ButtonGroup> */}
        </div>
    )
}
