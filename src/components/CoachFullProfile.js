import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../coachFullProfile.css'
import {
    CircleLoader
} from 'react-spinners'

export default function CoachFullProfile(props) {

    const [coach, setCoach] = useState(null)
    console.log("Coach info", coach)
    // get id from params
    const { coachId } = useParams()

    useEffect(() => {
        fetchSingleCoach()
    }, [])

    const fetchSingleCoach = async () => {
        const res = await fetch(process.env.REACT_APP_SERVER + "/users/coaches/" + coachId, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        if (res.status === 200) {
            const body = await res.json()
            console.log("coach body", body)
            setCoach(body.data)
        } else {
            alert("No coaches to show")
        }
    }

    // if (!coach) return <h1>Loading...</h1>
    if (!coach) {
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
    console.log("mmmm", coach)

    return (
        <div className="campExtended col-md-5">
            <div className="campInfoElem col-xl-12">
                <div className="col-md-8">
                    <h3 className="campSubSec">Coach profile</h3>
                    <div className="campSecTitle">
                        <h4 className="campDetailItem">Name:</h4>
                        <p>{coach.name}</p>
                    </div>
                    <div className="campSecTitle ">
                        <h4 className="campDetailItem">Intro:</h4>
                        <p>{coach.coach.bio}</p>
                    </div>
                    <div className="coachSocMedia">
                        <i height="100" class="fab fa-instagram fa-2x"></i>
                        <i class="fab fa-facebook-square fa-2x"></i>
                        <i class="fab fa-youtube fa-2x"></i>
                        <i class="fab fa-twitter-square fa-2x"></i>
                    </div>
                </div>
                <div className="col-md-4">
                    <img src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="..." />
                </div>
            </div>
            <div className="campInfoElem col-xl-12">
                <div className="organizerExtended col-xl-6 ">
                    <h3 className="campSubSec">Details</h3>
                    <div className="campSecTitle">
                        <h4 className="campDetailItem">Coaching:</h4>
                        <p>Skydive</p>
                    </div>
                    <div className="campSecTitle">
                        <h4 className="campDetailItem">Disciplines:</h4>
                        <p>{coach.profile.disciplines}</p>
                    </div>
                    <div className="campSecTitle">
                        <h4 className="campDetailItem"> Based in:</h4>
                        <p>{coach.profile.location}</p>
                    </div>
                </div>
                <div className="organizerExtended col-xl-6">
                    <h3 className="campSubSec">Experience</h3>
                    <div className="campSecTitle">
                        <h4 className="campDetailItem">Skydive licence:</h4>
                        <p>{coach.profile.skydiveLicence}</p>
                    </div>
                    <div className="campSecTitle">
                        <h4 className="campDetailItem">Wind tunnel:</h4>
                        <p>{coach.profile.tunnelHours}</p>
                    </div>
                    <div className="campSecTitle">
                        <h4 className="campDetailItem">Flying since:</h4>
                        <p>{coach.profile.inSportSince}</p>
                    </div>
                </div>
            </div>
            <div className="organizerExtended col-xl-12">
                <h3 className="campSubSec">Extras</h3>
                <div className="campSecTitle">
                    <h4 className="campDetailItem">Coaching experience:</h4>
                    <p>{coach.coach.experience}</p>
                </div>
                <div className="campSecTitle">
                    <h4 className="campDetailItem">Certifications:</h4>
                    <p>{coach.coach.certifications} </p>
                </div>
                <div className="campSecTitle">
                    <h4 className="campDetailItem">Awards:</h4>
                    <p>{coach.coach.awards}</p>
                </div>
            </div>
            <div className="row">
                <Link to={'/camps/'} className="campCardBtnYellow">Check out {coach.name} camps</Link>

            </div>
        </div>
    )
}
