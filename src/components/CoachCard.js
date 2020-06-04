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
            <div className="coachCardBase col-sm-3 col-xl-2" >
                <img src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" className="card-img-top" alt="..." />
                <div className="coachCard">
                    <div className="titleBc">
                        <h5 className="coachName">{coach.name}</h5>
                    </div>
                </div>
                <div>
                    {/* <p className="card-text">{props.user.coach.bio}</p> */}
                    <p className="card-text">{coach.coach.bio}</p>
                </div>
                <div className="list-group list-group-flush">
                    <div className="coachDisc">
                        <p>Disciplines</p>
                        <p>{coach.coach.disciplines}</p>
                    </div>
                    <div className="coachRating">
                        Coach rating: 4.5
                    </div>
                </div>
                <div className="card-link">
                    <Link to={'/coaches/profile/' + coach._id} className="campCardBtn" >Full profile</Link>
                </div>
            </div>
        )
    })


    return (
        <div className="row" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
            {coachesList}
        </div>
    )
}
