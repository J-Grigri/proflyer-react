import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";
import '../cardStyle.css'

export default function Coaches(props) {

    let [user, setUser] = useState({ ...props.user });

    console.log("here props.user.coach", props.user.coach)
    console.log("here props.user", props.user)

    return (
        <div className="coachCardBase" style={{ width: "18rem" }}>
            <img src="https://a.calameoassets.com/1651941/picture.jpg?_u=120908181623" className="card-img-top" alt="..." />
            <div className="coachCard">
                <div className="titleBc">
                    <h5 className="coachName">{props.user.name}</h5>
                </div>
            </div>
            <div>
                {/* <p className="card-text">{props.user.coach.bio}</p> */}
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.</p>
            </div>
            <div className="list-group list-group-flush">
                <div className="coachDisc">{props.user.coach.disciplines}</div>
                <div className="coachRating">Coach rating:</div>
            </div>
            <div className="card-link">
                <span href="#">Full profile</span>
            </div>
        </div>
    )
}
