import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../campCardFull.css'
import { findByLabelText } from '@testing-library/react'

export default function CampCard() {

    const [camps, setCamps] = useState([]);
    console.log("===", camps);

    useEffect(() => {
        fetchCamps();
    }, [])

    const fetchCamps = async () => {
        const response = await fetch("https://localhost:5000/camps/", {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });

        if (response.status === 200) {
            const body = await response.json();
            setCamps(body.data)
        } else {
            alert("No camps to show")
        }
    }
    //response
    let campsList = camps.map((camp) => {

        return (
            <div className="campSmallOutline col-xl-4">
                <div className="campSmallTitle">
                    <h5>{camp.title}</h5>
                </div>
                <div className="campSmallVenue">
                    <h5>{camp.venue}</h5>
                </div>
                <div className="campSmallDetails">
                    <div className="detailItem">
                        <p><i class="far fa-calendar-plus"></i> Dates</p>
                        <p>From: {camp.startDate}</p>
                        <p>To: {camp.endDate}</p>
                    </div>
                    <div className="detailItem">
                        <p><i class="far fa-money-bill-alt"></i>Price</p>
                        <p>€ {camp.price}</p>
                    </div>
                    <div className="detailItem">
                        <p><i class="far fa-check-circle"></i>Availability</p>
                        <p>7/9</p>
                    </div>
                </div>

                <div className="campSmallOrg">
                    <p><i class="fas fa-user-check"></i>
                        {camp.organizer}</p>
                </div>
                <div class="campSmallLinks" role="group" aria-label="Basic example">
                    <Link to='/camps/${camp._id}' className="campCardBtn" >See camp</Link>
                    <Link to="/camps/id" className="campCardBtn" >Coach profile</Link>
                </div>
            </div>
        )
    })

    return (
        <div >
            {campsList}
        </div>
    )
}
