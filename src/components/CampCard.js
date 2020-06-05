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
        const response = await fetch(process.env.REACT_APP_SERVER + "/camps/", {
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
            <div>
                <div className="campSmallOutline">
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                        <div>
                            <div className="campSmallTitle">
                                <h3>{camp.title}</h3>
                            </div>
                            <div className="campSmallVenue">
                                <h5>{camp.venue}</h5>
                            </div>
                        </div>

                        <div className="campSmallOrg">
                            <p className="btt"><i class="fas fa-user-check"></i>Organizer</p>
                            <p>{camp.organizer.name}</p>
                        </div>
                    </div>


                    <div className="campSmallDetails">
                        <div className="detailItem">
                            <p className="btt"><i class="far fa-calendar-plus"></i> Calendar</p>
                            <p >From: {camp.startDate}</p>
                            <p >To: {camp.endDate}</p>
                        </div>
                        <div className="detailItem">
                            <p className="btt"><i class="far fa-money-bill-alt"></i>Price</p>
                            <p>€ {camp.price}</p>
                        </div>
                        <div className="detailItem">
                            <p className="btt"><i class="far fa-check-circle"></i>Availability</p>
                            <p>7/9</p>
                        </div>
                    </div>


                    <div class="campSmallLinks" role="group" aria-label="Basic example">
                        <Link to={'/camps/' + camp._id} className="campCardBtnYellow" >More</Link>
                        <Link className="campCardBtnYellow" >Book</Link>
                        <Link to={'/coaches/profile/' + camp.organizer._id} className="campCardBtnYellow" >Coach profile</Link>
                    </div>
                </div>
            </div>


        )
    })

    return (
        <div className="row" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
            {campsList}
        </div>
    )
}

// <div className="campSmallN col-md-3">
//                 <div className="campSmallrow">
//                     <div className="campSmallcol col-xl-8">
//                         <h3 className="campSmalltitle">Title</h3>
//                         <p>{camp.title}</p>
//                     </div>
//                     <div className="campSmallcol col-xl-4">
//                         <h3 className="campSmalltitle">Details</h3>
//                         <p>{camp.title}</p>
//                     </div>
//                 </div>

//             </div>