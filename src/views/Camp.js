import React, { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { Tabs } from "@yazanaabed/react-tabs";
import "../entryPage.css";
import { useHistory } from "react-router-dom";

require("dotenv").config({ path: "../env" });

export default function Camp(props) {
    const history = useHistory();

    let body
    let campsList = [];
    const [formInput, setFormInput] = useState()
    const [formState, setFormState] = useState("")

    const [skydiveForm, setSkydiveForm] = useState()
    const [tunnelForm, setTunnelForm] = useState()

    const handleChange = e => {

        if (formState === "skydiveCamp") {
            setSkydiveForm({
                ...skydiveForm, [e.target.name]: e.target.value
            })
        }
        else if (formState === "tunnelCamp") {
            setTunnelForm({
                ...tunnelForm, [e.target.name]: e.target.value
            })
        }
    }

    async function createCamp(e) {
        e.preventDefault()

        if (formState === "skydiveCamp") {
            body = skydiveForm
            console.log("bodiiiiii", body)
        }
        else if (formState === "tunnelCamp") {
            body = tunnelForm
            console.log("bodiiiiii", body)
        }


        const res = await fetch(process.env.REACT_APP_SERVER + "/camps/organize", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(body)
        })
        console.log("status", res.status)
        if (res.status === 201) {
            history.push("/camps")
        }
        else {
            return alert("Could not create camp")
        }
    }


    console.log("form input", formInput)

    const renderForm = (state) => {

        //RENDER skydive camp fields
        if (state === "skydiveCamp")
            return (
                <div >
                    <form className="campForm" onChange={handleChange} onSubmit={createCamp}>
                        <div className="form col-md-12">
                            <div className="form-group col-md-8">
                                <label for="venue">Wind tunnel name (camp location)</label>
                                <input type="text" name="venue" placeholder="Venue" />
                            </div>
                            <div className="date col-xl-4">
                                <input
                                    text="Start date"
                                    type="date"
                                    name="startDate">
                                </input>
                                <input
                                    text="End date"
                                    type="date"
                                    name="endDate"></input>
                            </div>
                            <div className="participants col-xl-7">
                                <div className="pFielfds">
                                    <label for="groupSize">Group size (max)</label>
                                    <input
                                        text="Group size (max)"
                                        type="number"
                                        name="groupSize">
                                    </input>
                                </div>
                                <div className="pFielfds">
                                    <label for="groupSize">Price per person</label>
                                    <input
                                        text="Price per person"
                                        type="number"
                                        name="price">
                                    </input>
                                </div>
                            </div>
                            <div>
                                <label for="title">Camp title</label>
                                <input
                                    text="Title"
                                    type="text"
                                    name="title"
                                    placeholder="Camp title">
                                </input>
                            </div>
                            <div>
                                <label for="title">Description and camp details</label>
                                <textarea className="desc col-md-12"
                                    text="Description"
                                    type="text"
                                    name="description"
                                    rows="4"
                                    placeholder="Make it unique and informative!">
                                </textarea>
                            </div>
                        </div>
                        <div className="campBtn">
                            <button type="submit" class="btn btn-danger "> Reset fields</button>
                            <button type="submit" class="btn btn-primary" style={{ marginLeft: "1rem" }}>Announce camp</button>
                        </div>
                    </form>
                </div>
            )

        else if (state === "tunnelCamp") {
            return
        }
    }

    return (
        <div id="Camps">
            <div className="campContainer col col-xl-12" style={{ textAlign: "center" }}>
                <h2>Create a new camp</h2>
                <ButtonGroup className="mb-2">
                    <Button onClick={() => setFormState("skydiveCamp")} >Skydive</Button>
                    <Button onClick={() => setFormState("tunnelCamp")} >Wind tunnel</Button>
                </ButtonGroup>
                {renderForm(formState)}

            </div>
        </div>
    )
}
