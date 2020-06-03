import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";
import '../cardStyle.css'

export default function Camp(props) {


    return (
        <div className="col-xl-12 campExtended">
            <h5 className="campCategoryBox">Wind tunnel camp</h5>
            <div className="verticalExtended col-xl-12 " >
                <h2 className="campTitle"> Aerodium open tunnel camp</h2>
                <div className="campInfoElem col-xl-12">
                    <div className="organizerExtended col-xl-6">
                        <div className="campSubSec">
                            <h4 style={{ margin: "0" }}>Details</h4>
                        </div>
                        <div className="campSecTitle">
                            <p className="campDetailItem">Location:</p>
                        </div>
                        <div className="campSecTitle">
                            <p className="campDetailItem">Date:</p>
                        </div>
                        <div className="campSecTitle">
                            <p className="campDetailItem"> Price:</p>
                        </div>
                        <div className="campSecTitle">
                            <p className="campDetailItem">Availability:</p>
                        </div>
                    </div>
                    <div className="organizerExtended col-xl-6">
                        <div className="campSubSec">
                            <h4 style={{ margin: "0" }}>Organizer</h4>
                        </div>
                        <div>
                            <h5 className="organizerName">Felix Baumbartner</h5>
                        </div>
                        <div>
                            <p className="organizerBio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.</p>
                        </div>
                        <button className="coachProfileBtn">See coach profile</button>
                    </div>
                </div>
                <div className="campDesc col-xl-12">
                    <div className="descTitle">
                        <h3 style={{ margin: "0", color: "#17a2b8" }}>Description</h3>
                    </div>
                    <div className="descBox">
                        <p style={{ color: "#ffff", padding: "0.5rem", textAlign: "justify" }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
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
