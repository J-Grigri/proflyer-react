import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";
import '../cardStyle.css'

export default function Camp(props) {
    const [camp, setCamp] = useState(null)
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
            alert("No coaches to show")
        }
    }

    if (!camp) return <h1>Loading...</h1>

    return (
        <div className="col-xl-8 campExtended">
            <h5 className="campCategoryBox">Wind tunnel camp</h5>
            <div className="verticalExtended col-xl-12 " >
                <h2 className="campTitle"> {camp.title}</h2>
                <div className="campInfoElem col-xl-12">
                    <div className="organizerExtended col-xl-6">
                        <div className="campSubSec">
                            <h4 style={{ margin: "0" }}>Details</h4>
                        </div>
                        <div className="campSecTitle">
                            <p className="campDetailItem">Location:</p>
                            <p>{camp.venue}</p>
                        </div>
                        <div className="campSecTitle">
                            <p className="campDetailItem">Date:</p>
                            <p>From: {camp.startDate}</p>
                            <p>To: {camp.endDate}</p>
                        </div>
                        <div className="campSecTitle">
                            <p className="campDetailItem"> Price:</p>
                            <p>{camp.price}</p>
                        </div>
                        <div className="campSecTitle">
                            <p className="campDetailItem">Availability:</p>
                            <p>{camp.availability}</p>
                        </div>
                    </div>
                    <div className="organizerExtended col-xl-6">
                        <div className="campSubSec">
                            <h4 style={{ margin: "0" }}>Organizer</h4>
                        </div>
                        <div>
                            <h5 className="organizerName">{camp.organizer.name}</h5>
                        </div>
                        <div>
                            <p className="organizerBio">{camp.organizer.bio}</p>
                        </div>
                        <Link to={'/coaches/profile/' + camp.organizer.id} className="campCardBtn">See coach profile</Link>
                    </div>
                </div>
                <div className="campDesc col-xl-12">
                    <div className="descTitle">
                        <h3 style={{ margin: "0", color: "#17a2b8" }}>Description</h3>
                    </div>
                    <div className="descBox">
                        <p style={{ color: "#ffff", padding: "0.5rem", textAlign: "justify" }}>{camp.description}.</p>
                    </div>
                </div>
                <div className="campBtn">
                    <button type="submit" class="btn btn-primary" style={{ marginLeft: "1rem" }}>Sign me up!</button>
                </div>
                <div class="campCommentMenu" role="group" aria-label="Basic example">
                    <Link to="/camps/id" className="commentItemBtn">Comments</Link>
                    <Link to="/camps/id" className="commentItemBtn">Particinat discussion</Link>
                </div>
            </div>
        </div>
    )
}
