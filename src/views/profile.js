import React, { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
require("dotenv").config({ path: "../env" });

export default function Profile(props) {

    const [formInput, setFormInput] = useState({ ...props.user })
    const [formState, setFormState] = useState("general")

    const handleChange = e => {
        setFormInput({
            ...formInput, [e.target.name]: e.target.value
        })
    }

    async function updatePW(e) {
        e.preventDefault()
        const { passwordCurrent, password1, password2 } = formInput;
        if (password1 !== password2) {
            alert("Passwords do not match")
        }

        const res = await fetch(process.env.REACT_APP_SERVER + "/users/me/password", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({ passwordCurrent, password1 })
        });

        if (res.status === 200) {
            const data = await res.json()
            props.setUser(data.data)

        } else {
            return alert("Password change failed")
        }
    }

    async function updateProfile(e) {
        e.preventDefault()

        const res = await fetch("https://localhost:5000/users/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(formInput)
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
    //RESET PASSWORD SECTION
    // const passwordFields = [{
    //     text: "Current password",
    //     type: "password",
    //     name: "passwordCurrent",
    //     icon: "envelope"
    // },
    // {
    //     text: "New password",
    //     type: "password",
    //     name: "password1",
    //     icon: "envelope"
    // },
    // {
    //     text: "Repeat new password",
    //     type: "password",
    //     name: "password2",
    //     icon: "envelope"
    // }];
    // //GENERAL PROFILE SECTION
    // const profileFields = [{
    //     text: "Full Name",
    //     className: "mt-5",
    //     type: "text",
    //     name: "name",
    //     value: formInput.name,
    //     placeholder: "name"
    // },
    // {
    //     text: "Upload your picture",
    //     type: "image",
    //     name: "profile.avatar",
    //     value: formInput["profile.avatar"]
    // },
    // {
    //     text: "Enable your location",
    //     type: "text",
    //     name: "profile.location",
    //     value: formInput["profile.location"],
    //     placeholder: "Location"
    // },
    // {
    //     text: "Mark all disciplines you practice",
    //     type: "checkbox",
    //     name: "profile.disciplines",
    //     value: formInput["profile.disciplines"],
    //     placeholder: "Disciplines"
    // },
    // {
    //     text: "Skydive licence",
    //     type: "dropdown",
    //     name: "profile.skydiveLicence",
    //     value: formInput["profile.skydiveLicence"],
    //     placeholder: "Select"
    // },
    // {
    //     text: "Estimated flying hours in a wind tunnel",
    //     type: "text",
    //     name: "profile.tunnelHours",
    //     value: formInput["profile.tunnelHours"]
    // },
    // {
    //     text: "Paste a url to your youtube account",
    //     type: "url",
    //     name: "profile.social.youtube",
    //     value: formInput["profile.social.youtube"]
    // },
    // {
    //     text: "Paste a url to your instagram account",
    //     type: "url",
    //     name: "profile.social.instagram",
    //     value: formInput["profile.social.instagram"]
    // },
    // {
    //     text: "Paste a url to your facebook account",
    //     type: "url",
    //     name: "profile.social.facebook",
    //     value: formInput["profile.social.facebook"]
    // },
    // {
    //     text: "Paste a url to twitter account",
    //     type: "url",
    //     name: "profile.social.twitter",
    //     value: formInput["profile.social.twitter"]
    // },
    // ];
    //COACH PROFILE SECTION
    // const coachFields = [{
    //     text: "Your introduction or shot bio",
    //     type: "text",
    //     name: "coach.bio",
    //     value: formInput["coach.bio"]
    // }, {
    //     text: "Year that you started your coaching career?",
    //     type: "date",
    //     name: "coach.inSportSince",
    //     value: formInput["coach.inSportSince"]
    // }, {
    //     text: "What relevant certifications have you obtained?",
    //     type: "text",
    //     name: "coach.certifications",
    //     value: formInput["coach.certifications"]
    // }, {
    //     text: "What relevant achievments would you like to share?",
    //     type: "text",
    //     name: "coach.achievments",
    //     value: formInput["coach.achievments"]
    // }, {
    //     text: "What relevant work experience would you like to share?",
    //     type: "text",
    //     name: "coach.experience",
    //     value: formInput["coach.experience"]
    // }, {
    //     text: "What disciplines are you qualified to coach?",
    //     type: "text",
    //     name: "coach.disciplines",
    //     value: formInput["coach.disciplines"]
    // },];

    console.log(formInput)
    console.log("this", props.user)

    const renderForm = (state) => {



        //RENDER COACH SECTION OF THE USER PROFILE
        if (state === "coach") {
            return (
                <div className="generalCon mt-3">
                    <form className="generalSec">
                        <div className="fields">
                            <label for="Coach bio" className="inputLabel col col-sm-4" >Introduction</label>
                            <textarea
                                className="inputBox col col-sm-4"
                                text="Coach bio"
                                type="text"
                                rows="3"
                                value=""
                                // name="coach.inSportSince"
                                placeholder="Coach bio"
                            />
                        </div>
                        <div className="fields">
                            <label className="inputLabel col col-sm-4" >Years in sport</label>
                            <input
                                className="inputBox col col-sm-4"
                                text="Year that you started your coaching career?"
                                type="date"
                                // name="coach.inSportSince"
                                placeholder="Years of experience"
                            />
                        </div>

                        <div className="fields">
                            <label className="inputLabel col col-sm-4">Pick the disciplines you are qualified to coach</label>
                            <br />
                            <input
                                className="inputBox col col-sm-4"
                                type="text"
                                text="What disciplines are you qualified to coach?"
                                name="disciplines"
                                placeholder="disciplines"
                            />
                        </div>
                        <div className="fields">
                            <label className="inputLabel col col-sm-4">Relevant work experience</label>
                            <textarea
                                className="inputBox col col-sm-4"
                                text="What relevant work experience would you like to share?"
                                type="text"
                                rows="2"
                                // name="coach.experience"
                                placeholder="experience"
                            />
                        </div>
                        <div className="fields">
                            <label className="inputLabel col col-sm-6">Certifications</label>
                            <input
                                className="inputBox col col-sm-6"
                                text="What relevant certifications have you obtained?"
                                type="file"
                                name="coach.certifications"
                                // name="coach.experience"
                                placeholder="certifications"
                            />
                        </div>
                        <div className="fields">
                            <label className="inputLabel col col-sm-6">Extras (think of achievments or unique skills)</label>
                            <input
                                className="inputBox col col-sm-6"
                                text="What relevant achievments would you like to share?"
                                type="file"
                                // name="coach.achievments"
                                placeholder="achievments"
                            />
                        </div>
                        <div className="campBtn">
                            <button type="submit" class="btn btn-danger mt-5"> Reset fields</button>
                            <button type="submit" class="btn btn-primary mt-5" style={{ marginLeft: "1rem" }}>Update</button>
                        </div>

                    </form>
                </div>
            )
        }
        //RENDER GENERAL SECTION OF THE USER PROFILE
        else if (state === "general")
            return (
                <div className="generalCon mt-3">
                    <form className="generalSec">
                        <div className="fields">
                            <label for="name" className="inputLabel col col-sm-5">Full name:</label>
                            <input
                                className="inputBox col col-sm-3"
                                text="Full Name"
                                // className="mt-5"
                                type="text"
                                name="name"
                                value={props.user.name} />
                        </div>
                        <div className="fields">
                            <label for="image" className="inputLabel col col-sm-5">Upload profile image</label>
                            <input
                                className="inputBox col col-sm-4"
                                accept="image/png, image/jpeg"
                                // style={{ display: "none" }}
                                type="file"
                                alt="profile image"
                                name="profile.avatar"
                                value={props.user.avatar}
                            />

                        </div>
                        <div className="fields">
                            <label for="Location" className="inputLabel col col-sm-5">Your location</label>
                            <input
                                className="inputBox col col-sm-3"
                                text="Enable your location"
                                type="text"
                                name="profile.location"
                                value={props.user.location}
                                placeholder="Location"
                            />
                        </div>
                        <div className="fields" >
                            <label for="profile.skydiveLicence" className="inputLabel col col-sm-5">Skydive licence</label>
                            <input
                                className="inputBox col col-sm-1"
                                text="Skydive licence"
                                type="dropdown"
                                name="profile.skydiveLicence"
                                value={props.user.skydiveLicence}
                                placeholder="Select"
                            />
                        </div>
                        <div className="fields">
                            <label for="profile.tunnelHours" className="inputLabel col col-sm-5">Estimated tunnel hours</label>
                            <input
                                className="inputBox col col-sm-1"
                                text="Estimated flying hours in a wind tunnel"
                                type="number"
                                name="profile.tunnelHours"
                                placehoolder="Estimate tunnel hours"
                            // value={props.user.profile.tunnelHours}
                            />
                        </div>
                        <div className="campBtn">
                            <button type="submit" class="btn btn-danger mt-5 "> Reset fields</button>
                            <button type="submit" class="btn btn-primary mt-5" style={{ marginLeft: "1rem" }}>Update</button>
                        </div>

                    </form>
                </div>
            )


        // RENDER RESET PASSWORD IN THE PROFILE SECTION
        else if (state === "password") {
            return (
                <div>
                    <form>
                        <div className="fields">
                            <label for="passwordCurrent" className="inputLabel col col-sm-6">Current password</label>
                            <input
                                className="inputBox col col-sm-2"
                                text="Current password"
                                type="password"
                                name="passwordCurrent"
                                icon="envelope"
                            />
                        </div>
                        <div className="fields">
                            <label for="password1" className="inputLabel col col-sm-6">New password</label>
                            <input
                                className="inputBox col col-sm-2"
                                text="New password"
                                type="password"
                                name="password1"
                            />
                        </div>
                        <div className="fields">
                            <label for="password2" className="inputLabel col col-sm-6">Repeat new password</label>
                            <input
                                className="inputBox col col-sm-2"
                                text="Repeat new password"
                                type="password"
                                name="password2"
                            />
                        </div>
                        <div className="campBtn">
                            <button type="submit" class="btn btn-danger mt-5"> Reset fields</button>
                            <button type="submit" class="btn btn-primary mt-5" style={{ marginLeft: "1rem" }}>Update</button>
                        </div>
                    </form>
                </div>
            )
        }
        //RENDER COACH SECTION OF THE USER PROFILE
        else if (state === "socMedia") {
            return (
                <div>
                    <form>
                        <div className="fields">
                            <label className="inputLabel col col-sm-5">Youtube:</label>
                            <input
                                className="inputBox col col-sm-3"
                                text="Paste a url to your youtube account"
                                type="url"
                                name="profile.social.youtube"
                            />
                        </div>
                        <div className="fields">
                            <label className="inputLabel col col-sm-5">Instagram:</label>
                            <input
                                className="inputBox col col-sm-3"
                                text="Paste a url to your facebook account"
                                type="url"
                                name="profile.social.instagram"
                            />
                        </div>
                        <div className="fields">
                            <label className="inputLabel col col-sm-5">Facebook:</label>
                            <input
                                className="inputBox col col-sm-3"
                                text="Paste a url to your facebook account"
                                type="url"
                                name="profile.social.facebook"
                            />
                        </div>
                        <div className="fields">
                            <label className="inputLabel col col-sm-5">Twitter:</label>
                            <input
                                className="inputBox col col-sm-3"
                                text="Paste a url to your twitter account"
                                type="url"
                                name="profile.social.twitter"
                            // value: formInput["profile.social.youtube"]
                            />
                        </div>
                        <div className="campBtn">
                            <button type="submit" class="btn btn-danger mt-5"> Reset fields</button>
                            <button type="submit" class="btn btn-primary mt-5" style={{ marginLeft: "1rem" }}>Update</button>
                        </div>
                    </form>
                </div>

            )
        }
    }
    //RENDER PROFILE PAGE
    return (
        <div class="containerProfile " >
            {/* <div className="medium">Update Profile</div> */}
            <div className="updateContainer col-sm-12 col-xl-12">
                <div className="menuRow">
                    <button onClick={() => setFormState("general")} className="menuBtn">General</button>
                    <button onClick={() => setFormState("coach")} className="menuBtn">Coach profile</button>
                    <button onClick={() => setFormState("socMedia")} className="menuBtn">Connect social media</button>
                    <button onClick={() => setFormState("password")} className="menuBtn">Change password</button>
                </div>
                {renderForm(formState)}
            </div>
        </div>
    )
}
