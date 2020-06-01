import React, { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { Tabs } from "@yazanaabed/react-tabs";
import "../entryPage.css"
require("dotenv").config({ path: "../env" });

export default function Camp(props) {

    const [formInput, setFormInput] = useState()
    const [formState, setFormState] = useState("")

    const handleChange = e => {
        setFormInput({
            ...formInput, [e.target.name]: e.target.value
        })
    }

    async function createCamp(e) {
        e.preventDefault()
        const res = fetch("https://localhost:5000/camps/organize", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(formInput)
        })

        if (res.status === 201) {
            const data = await res.json()
            props.setUser(data.data)
        }
        else {
            return alert("Could not create camp")
        }
    }
    console.log("form input", formInput)

    //Skydive camp fields
    // const skydiveFields = [{
    //     text: "Location (tunnel name)",
    //     className: "mt-5",
    //     type: "text",
    //     name: "venue"
    // },
    // {
    //     text: "Start date",
    //     type: "date",
    //     name: "startDate"
    // },
    // {
    //     text: "End date",
    //     type: "date",
    //     name: "endDate"
    // },
    // {
    //     text: "Group size (max)",
    //     type: "number",
    //     name: "groupSize"
    // },
    // {
    //     text: "Price per person",
    //     type: "number",
    //     name: "price"
    // },
    // {
    //     text: "Title",
    //     type: "text",
    //     name: "title"
    // },
    // {
    //     text: "Description",
    //     type: "text",
    //     name: "description"
    // }];

    //Wind tunnel camp fields
    // const tunnelFields = [{
    //     text: "Location (tunnel name)",
    //     className: "mt-5",
    //     type: "text",
    //     name: "venue"
    // },
    // {
    //     text: "Start date",
    //     type: "date",
    //     name: "startDate"
    // },
    // {
    //     text: "End date",
    //     type: "date",
    //     name: "endDate"
    // },
    // {
    //     text: "Group size (max)",
    //     type: "number",
    //     name: "groupSize"
    // },
    // {
    //     text: "Price per person",
    //     type: "number",
    //     name: "price"
    // },
    // {
    //     text: "Title",
    //     type: "text",
    //     name: "title"
    // },
    // {
    //     text: "Description",
    //     type: "number",
    //     name: "description"
    // }];

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
            <div className="campContainer col col-xl-12">
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
