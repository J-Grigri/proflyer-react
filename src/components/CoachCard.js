import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";
import { useHistory } from 'react-router-dom'
import '../cardStyle.css'

export default function Coaches(props) {
    const history = useHistory()

    let [coaches, setCoaches] = useState([]);
    console.log("List", coaches)

    useEffect(() => {
        fetchCoaches()
    }, [])

    const fetchCoaches = async () => {
        const res = await fetch(process.env.REACT_APP_SERVER + "/users/coaches", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.status === 200) {
            const body = await res.json()
            setCoaches(body.data)
        } else {
            alert("No coaches to show")
        }
    }

    let coachesList = coaches.map((coach) => {

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
                    <div className="coachDisc">Disciplines</div>
                    <div className="coachRating">Coach rating:</div>
                </div>
                <div className="card-link">
                    <span href="#">Full profile</span>
                </div>
            </div>
        )
    })


    return (
        <div>
            {coachesList}
        </div>
    )
}
