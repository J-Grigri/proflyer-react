import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";
import '../cardStyle.css'
import {
    CircleLoader
} from 'react-spinners'
import { useHistory } from 'react-router-dom'

export default function UpdateCamp(props) {

    const history = useHistory()

    const [camp, setCamp] = useState(null)
    const [campForm, setCampForm] = useState({})
    console.log(camp)

    // get id from params
    const { campId } = useParams()

    useEffect(() => {
        fetchSingleCamp()
    }, [])

    // use id to fetch a single camp from backend
    const fetchSingleCamp = async () => {
        const res = await fetch(process.env.REACT_APP_SERVER + "/camps/" + campId, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        if (res.status === 200) {
            const body = await res.json()
            console.log("body", body)
            setCamp(body.data)
        } else {
            alert("Camp not found")
        }
    }

    const handleChange = e => {
        setCampForm({
            ...campForm, [e.target.name]: e.target.value
        })
    }

    async function updateCamp(e) {
        e.preventDefault()
        console.log(campForm, "KHOAAAAAAAAA")
        const res = await fetch(process.env.REACT_APP_SERVER + "/camps/organize/my-camps/" + campId, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(campForm)
        })
        console.log("status", res.status)
        const data = await res.json()
        if (res.status === 200) {
            console.log(data)
            // setCampForm(campForm)
            // const data = await resp.json()
            history.push("/camps")
        }
        else {
            return alert("Could not create camp")
        }
    }

    console.log("++++", camp)
    if (!camp) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}  >
                <CircleLoader />
            </div>
        )
    }

    return (
        <div className="myOwnCont">

            <form className="campForm col-xl-8 col-sm-12" onChange={handleChange} onSubmit={updateCamp} >
                <div className="form ">
                    <div className="col-xl-12 col-sm-12 sss">
                        <div className="col-xl-8 col-sm-8">
                            <div className="form-group ">
                                <label for="venue">Wind tunnel name (camp location)</label>
                                <input type="text"
                                    name="venue"
                                    placeholder="Venue"
                                    value={campForm["venue"] || camp.venue}
                                ></input>
                            </div>
                            <div className="date">
                                <input
                                    text="Start date"
                                    type="date"
                                    name="startDate"
                                    value={campForm["startDate"] || camp.startDate}
                                >
                                </input>
                            </div>
                            <div className="date">
                                <input
                                    text="End date"
                                    type="date"
                                    name="endDate"
                                    value={campForm["endDate"] || camp.endDate}
                                >
                                </input>
                            </div>
                            <div className="participants">
                                <div className="pFielfds">
                                    <label for="groupSize">Group size (max)</label>
                                    <input
                                        className="col-xl-6"
                                        text="Group size (max)"
                                        type="number"
                                        name="groupSize"
                                        value={campForm["groupSize"] || camp.groupSize}
                                    >
                                    </input>
                                </div>
                                <div className="pFielfds">
                                    <label for="groupSize">Price per person</label>
                                    <input
                                        className="col-xl-6"
                                        text="Price per person"
                                        type="number"
                                        name="price"
                                        value={campForm["price"] || camp.price}
                                    >
                                    </input>
                                </div>
                            </div>
                        </div>
                        <div className="photoSpot col-xl-4 col-sm-4">
                            <div>
                                <p style={{ color: "white" }}>Upload camp poster</p>
                            </div>
                            <div>
                                <input
                                    className="inputBox col col-sm-6"
                                    type="file"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label for="title">Camp title</label>
                        <input
                            text="Title"
                            type="text"
                            name="title"
                            placeholder="Camp title"
                            value={campForm["title"] || camp.title}
                        >
                        </input>
                    </div>
                    <div>
                        <label for="title">Description and camp details</label>
                        <textarea className="desc col-md-12"
                            text="Description"
                            type="text"
                            name="description"
                            rows="4"
                            placeholder="Make it unique and informative!"
                            value={campForm["description"] || camp.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="campBtn">
                    <button type="submit" class="btn btn-danger "> Reset fields</button>
                    <button type="submit" class="btn btn-danger" style={{ marginLeft: "1rem" }}>Delete camp</button>
                    <button type="submit" class="btn btn-primary" style={{ marginLeft: "1rem" }}>Update</button>
                </div>
            </form>
        </div>
    )
}
