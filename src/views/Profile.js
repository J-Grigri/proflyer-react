import React, { useState } from 'react'
import { Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
require("dotenv").config({ path: "../env" });

export default function Profile(props) {
    let body;
    const history = useHistory()

    const [generalForm, setGeneralForm] = useState({})
    const [coachForm, setCoachForm] = useState({})
    const [socialForm, setSocialForm] = useState({})
    const [pwForm, setPwForm] = useState({})
    const [formState, setFormState] = useState("general")

    // Each tab is handled in a seperate form
    const handleChange = e => {

        if (formState === "general") {
            setGeneralForm({
                ...generalForm, [e.target.name]: e.target.value
            })
        }
        else if (formState === "coach") {
            setCoachForm({
                ...coachForm, [e.target.name]: e.target.value
            })
        }
        else if (formState === "socMedia") {
            setSocialForm({
                ...socialForm, [e.target.name]: e.target.value
            })
        }
        else if (formState === "password") {
            setPwForm({
                ...pwForm, [e.target.name]: e.target.value
            })
        }
    }

    async function updatePW(e) {
        e.preventDefault()
        const { passwordCurrent, password1, password2 } = pwForm;
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
    async function coachProfile(e) {
        e.preventDefault()

        const resp = await fetch(process.env.REACT_APP_SERVER + "/users/coaches/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(coachForm)
        });
        if (resp.status === 200) {
            const data = await resp.json()
            // localStorage.setItem("token", data.data.token)
            // props.setUser(data.data)
            console.log("Updated successfully")
            history.push("/main/")

        } else {
            return alert("Profile update failed")
        }

    }

    async function updateProfile(e) {
        e.preventDefault()

        if (formState === "general") {
            body = generalForm
        }
        // else if (formState === "coach") {
        //     body = coachForm
        // }
        else if (formState === "socMedia") {
            body = socialForm
        }
        console.log("bodiiiiii", body)

        const res = await fetch(process.env.REACT_APP_SERVER + "/users/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(body)
        });

        if (res.status === 200) {
            const data = await res.json()
            // localStorage.setItem("token", data.data.token)
            props.setUser(data.data)
            history.push("/camps")
            console.log("Updated successfully")

        } else {
            return alert("Profile update failed")
        }
    }

    // Imgur file upload
    async function uploadFile(e) {
        e.preventDefault();
        // const selectedFile = document.getElementById('upload_form').files[0]
        // let formdata = new FormData();
        // formdata.append("image", selectedFile);
        // const res = await fetch("https://api.imgur.com/3/image", {
        //     method: "POST",
        //     headers: {
        //         Authorization: `Client-ID ` + process.env.IMGUR_CLIENT_ID
        //     },
        //     body: formdata
        // });

        // if (res.ok) {
        //     const data = await res.json();
        //     console.log(data)
        //     if (data.success) {
        //         console.log("File uploaded")
        //     }
        //     else {
        //         console.log("cannot upload because of", data.message)
        //     }
        // } else {
        //     alert("cannot upload")
        // }
    }


    const renderForm = (state) => {
        //RENDER GENERAL SECTION OF THE USER PROFILE
        if (state === "general") {
            return (
                <div className="generalCon mt-3">
                    <form onChange={handleChange} onSubmit={updateProfile} className="generalSec">
                        <div className="fields">
                            <label for="name" className="inputLabel"
                            >Full name:</label>
                            <input
                                text="Full Name"
                                type="text"
                                name="name"
                                value={generalForm.name || props.user.name}
                            />
                        </div>
                        <div className="fields">
                            <label for="image" className="inputLabel">Upload profile image</label>
                            <input
                                className="inputBox"
                                accept="image/png, image/jpeg"
                                type="image"
                                id="upload_form"
                                alt="profile image"
                                name="profile.avatar"
                            // value={generalForm["profile.avatar"] || props.user.profile.avatar}
                            />

                        </div>
                        <div className="fields">
                            <label for="Location" className="inputLabel">Your location</label>
                            <input
                                className="inputBox"
                                text="Enable your location"
                                type="text"
                                name="profile.location"
                                value={generalForm["profile.location"] || props.user.profile.location}
                                placeholder="Location"
                            />
                        </div>

                        <div className="fields" style={{ justifyContent: "center" }}>
                            <label className="inputLabel">Skydive licence</label>
                            <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" name="profile.skydiveLicence" >{generalForm["profile.skydiveLicence"] || props.user.profile.skydiveLicence}</button>
                            {/* value={props.user.skydiveLicence} */}
                            <div className="dropdown-menu">
                                <p className="dropdown-item" onClick={() => {
                                    generalForm["profile.skydiveLicence"] = "A"
                                    setGeneralForm({
                                        ...generalForm
                                    })
                                }}
                                >A</p>
                                <p className="dropdown-item" onClick={() => {
                                    generalForm["profile.skydiveLicence"] = "B"
                                    setGeneralForm({
                                        ...generalForm,
                                    })
                                }}
                                >B</p>
                                <p className="dropdown-item" onClick={() => {
                                    generalForm["profile.skydiveLicence"] = "C"

                                    setGeneralForm({
                                        ...generalForm
                                    })
                                }}
                                >C</p>
                                <p className="dropdown-item" onClick={() => {
                                    generalForm["profile.skydiveLicence"] = "D"

                                    setGeneralForm({
                                        ...generalForm
                                    })
                                }}
                                >D</p>
                                <div className="dropdown-divider"></div>
                                <div className="dropdown-item" onClick={() => {
                                    generalForm["profile.skydiveLicence"] = "No licence"

                                    setGeneralForm({
                                        ...generalForm
                                    })
                                }}
                                >No Licence</div>
                            </div>
                        </div>

                        <div className="fields" style={{ justifyContent: "center" }}>
                            <label className="inputLabel">Wind tunnel experience</label>
                            <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">{generalForm["profile.tunnelHours"] || props.user.profile.tunnelHours}</button>
                            <div className="dropdown-menu">
                                <p className="dropdown-item" onClick={() => {
                                    generalForm["profile.tunnelHours"] = "1 - 10 hours"
                                    setGeneralForm({
                                        ...generalForm
                                    })
                                }}
                                >1 - 10 hours</p>

                                <p className="dropdown-item" onClick={() => {
                                    generalForm["profile.tunnelHours"] = "10 - 50 hours"
                                    setGeneralForm({
                                        ...generalForm,
                                    })
                                }}
                                >10 - 50 hours</p>

                                <p className="dropdown-item" onClick={() => {
                                    generalForm["profile.tunnelHours"] = "50 - 100 hours"
                                    setGeneralForm({
                                        ...generalForm
                                    })
                                }}
                                >50 - 100 hours</p>

                                <p className="dropdown-item" onClick={() => {
                                    generalForm["profile.tunnelHours"] = "100+ hours"
                                    setGeneralForm({
                                        ...generalForm
                                    })
                                }}
                                >100+ hours</p>

                                <div className="dropdown-divider"></div>
                                <div className="dropdown-item" onClick={() => {
                                    generalForm["profile.tunnelHours"] = "No experience"
                                    setGeneralForm({
                                        ...generalForm
                                    })
                                }}
                                >No experience</div>
                            </div>
                        </div>
                        <div className="campBtn">
                            <button type="submit" className="btn btn-danger mt-5 "> Reset fields</button>
                            <button type="submit" className="btn btn-primary mt-5" style={{ marginLeft: "1rem" }}>Update</button>
                        </div>

                    </form>
                </div>
            )
        }


        //RENDER COACH SECTION OF THE USER PROFILE
        else if (state === "coach") {
            return (
                <div className="generalCon mt-3">
                    <form onChange={handleChange} onSubmit={coachProfile} className="generalSec">
                        <div className="fields">
                            <label for="Coach bio" className="inputLabel col col-sm-2">Introduction</label>
                            <textarea
                                className="inputBox col col-sm-4"
                                type="text"
                                placeholder="Coach bio"
                                rows="3"
                                name="coach.bio"
                                value={coachForm["coach.bio"] || props.user.coach.bio}
                            />
                        </div>
                        <div className="fields">
                            <label className="inputLabel col col-sm-2" >Years in sport</label>
                            <input
                                className="inputBox col col-sm-4"
                                type="date"
                                name="coach.inSportSince"
                                value={coachForm["coach.inSportSince"] || props.user.coach.inSportSince}
                            />
                        </div>

                        <div className="fields">
                            <label className="inputLabel col col-sm-2">Pick the disciplines you are qualified to coach</label>
                            <br />
                            <input
                                className="inputBox col col-sm-4"
                                type="text"
                                name="coach.disciplines"
                                placeholder="disciplines"
                                value={coachForm["coach.disciplines"] || props.user.coach.disciplines}
                            />
                        </div>
                        <div className="fields">
                            <label className="inputLabel col col-sm-2">Relevant work experience</label>
                            <textarea
                                className="inputBox col col-sm-4"
                                type="text"
                                placeholder="List all relevant coaching experiences"
                                rows="3"
                                name="coach.experience"
                                value={coachForm["coach.experience"] || props.user.coach.experience}
                            />
                        </div>
                        <div className="fields">
                            <label className="inputLabel col col-sm-2">Certifications</label>
                            <input
                                className="inputBox col col-sm-6"
                                // type="file"
                                placeholder="Attach all relevant coaching certifications"
                                name="coach.certifications"
                                value={coachForm["coach.certifications"] || props.user.coach.certifications}
                            />
                        </div>
                        <div className="fields">
                            <label className="inputLabel col col-sm-2">Extras (think of achievments or unique skills)</label>
                            <input
                                className="inputBox col col-sm-6"
                                // type="file"
                                name="coach.achievments"
                                value={coachForm["coach.achievments"] || props.user.coach.achievments}
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
                    <form onChange={handleChange} onSubmit={updateProfile} >

                        <div className="fields">
                            <label className="inputLabel ">Youtube:</label>
                            <input
                                className="inputBox"
                                type="string"
                                name="profile.social.youtube"
                                value={socialForm["profile.social.youtube"] || props.user.profile.social.youtube}
                            />
                        </div>
                        <div className="fields">
                            <label className="inputLabel"
                            >Instagram:</label>
                            <input
                                className="inputBox"
                                type="string"
                                name="profile.social.instagram"
                                value={socialForm["profile.social.instagram"] || props.user.profile.social.instagram}
                            />
                        </div>
                        <div className="fields">
                            <label className="inputLabel">Facebook:</label>
                            <input
                                className="inputBox"
                                placeholder="Paste a url to your facebook account"
                                type="string"
                                name="profile.social.facebook"
                                value={socialForm["profile.social.facebook"] || props.user.profile.social.facebook}
                            />
                        </div>
                        <div className="fields">
                            <label className="inputLabel">Twitter:</label>
                            <input
                                className="inputBox"
                                placeholder="Paste twitter profile url "
                                type="string"
                                name="profile.social.twitter"
                                value={socialForm["profile.social.twitter"] || props.user.profile.social.twitter}
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

        // RENDER RESET PASSWORD IN THE PROFILE SECTION
        else if (state === "password") {
            return (
                <div>
                    <form onChange={handleChange} onSubmit={updatePW} >
                        <div className="fields">
                            <label for="passwordCurrent" className="inputLabel">Current password</label>
                            <input
                                className="inputBox col col-sm-2"
                                type="password"
                                name="passwordCurrent"
                                icon="envelope"
                            />
                        </div>
                        <div className="fields">
                            <label for="password1" className="inputLabel">New password</label>
                            <input
                                className="inputBox col col-sm-2"
                                type="password"
                                name="password1"
                            />
                        </div>
                        <div className="fields">
                            <label for="password2" className="inputLabel">Repeat new password</label>
                            <input
                                className="inputBox col col-sm-2"
                                type="password"
                                name="password2"
                            />
                        </div>
                        <div className="campBtn">
                            <butßton type="submit" class="btn btn-danger mt-5"> Reset fields</butßton>
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
            <h3>Update profile</h3>
            <div className="updateContainer col-sm-12 col-xl-8">
                <div className="menuRow">
                    <button onClick={() => setFormState("general")} className="menuBtn">General</button>
                    <button onClick={() => setFormState("coach")} className="menuBtn">Coach profile</button>
                    <button onClick={() => setFormState("socMedia")} className="menuBtn">Connect social media</button>
                    <button onClick={() => setFormState("password")} className="menuBtn">Change password</button>
                </div>
                <div>
                    {renderForm(formState)}
                </div>
            </div>
        </div>
    )
}
