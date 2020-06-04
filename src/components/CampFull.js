import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";
import '../cardStyle.css'
import {
    CircleLoader
} from 'react-spinners'

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
            alert("No coaches to show from campfull")
        }
    }
    console.log(camp)
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
        <div >
            <div className="campExtended col-md-5">

                <div className="campInfoElem col-xl-12">
                    <div className="organizerExtended col-xl-5">
                        <h3 className="campSubSec">Title</h3>
                        <p>{camp.title}</p>
                    </div>
                    <div className="organizerExtended col-xl-7">
                        <h3 className="campSubSec">About</h3>
                        <p>{camp.description}</p>
                    </div>
                </div>
                <div className="campInfoElem col-xl-12">
                    <div className="organizerExtended col-xl-5 ">
                        <h3 className="campSubSec">Details</h3>
                        <div className="campSecTitle">
                            <h4 className="campDetailItem">Location:</h4>
                            <p>{camp.venue} </p>
                        </div>
                        <div className="campSecTitle">
                            <h4 className="campDetailItem">Starts:</h4>
                            <p>{camp.startDate}</p><br></br>
                        </div>
                        <div className="campSecTitle">
                            <h4 className="campDetailItem">Ends:</h4>
                            <p>{camp.endDate}</p>
                        </div>
                        <div className="campSecTitle">
                            <h4 className="campDetailItem"> Price:</h4>
                            <p>{camp.price}</p>
                        </div>
                        <div className="campSecTitle">
                            <h4 className="campDetailItem">Availability:</h4>
                            <p>{camp.availability}</p>
                        </div>
                    </div>
                    <div className="organizerExtended col-xl-7">
                        <h3 className="campSubSec">Organizer</h3>
                        <div>
                            <h4 className="campDetailName">{camp.organizer.name}</h4>
                        </div>
                        <div >
                            <h4 className="campDetailItem">About {camp.organizer.name} :</h4>
                            <p>{camp.organizer.coach.bio}Rows are wrappers for columns. Each column has horizontal padding (called a gutter) for controlling the space between them. This padding is then counteracted on the rows with negative margins. This way, all the content in your columns is visually aligned down the left side.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Link to={'/coaches/profile/' + camp.organizer.id} className="campCardBtnYellow">Edit camp</Link>
                    <Link to={'/coaches/profile/' + camp.organizer.id} className="campCardBtnYellow">Coach profile</Link>
                </div>

                {/* <div className="campBtn">
                    <button type="submit" class="btn btn-primary" style={{ marginLeft: "1rem" }}>Sign me up!</button>
                    <Link to={'/camps/update/' + camp.id} className="campCardBtnYellow">Edit</Link>
                </div>
                <div class="campCommentMenu" role="group" aria-label="Basic example">
                    <Link to="/camps/id" className="commentItemBtn">Comments</Link>
                    <Link to="/camps/id" className="commentItemBtn">Particinat discussion</Link>
                </div> */}
            </div>
        </div>
    )
}
