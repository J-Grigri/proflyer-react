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

    return (
        <div className="col-xl-6 col-sm-8 campExtended">
            <h5 className="campCategoryBox">Coach Full profile</h5>
            <div className="verticalExtended col-xl-8 " >
                <div className="coachProfileTop">
                    <div className="card-img-top col-xl-5">
                        <img src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="..." />
                    </div>
                    <div className="coachProfileTopR col-xl-7">
                        <h5 className="coachName">{coach.name}</h5>
                        <p className="coachBio">{coach.coach.bio}.</p>
                        <div className="coachSocMedia">
                            <i height="100" class="fab fa-instagram fa-2x"></i>
                            <i class="fab fa-facebook-square fa-2x"></i>
                            <i class="fab fa-youtube fa-2x"></i>
                            <i class="fab fa-twitter-square fa-2x"></i>
                        </div>
                    </div>
                </div>
                <div className="profileSec col-xl-12">
                    <div className="profSecTitle">
                        <h3 style={{ margin: "0", color: "#17a2b8" }}>Details</h3>
                    </div>
                    <div className="coachProfileDetails">
                        <div className="coachProfileDetailItem" >
                            <p className="profileDetailItem">Coaching</p>
                            skydive
                            wind tunnel
                        </div>
                        <div className="coachProfileDetailItem">
                            <p className="profileDetailItem">Based in</p>
                            <p>{coach.profile.location}</p>
                        </div>
                        <div className="coachProfileDetailItem">
                            <p className="profileDetailItem">Disciplines</p>
                            <p>{coach.profile.disciplines}</p>
                        </div>
                        <div className="coachProfileDetailItem">
                            <p className="profileDetailItem">Experience</p>
                            <p>Skydive licence: {coach.profile.skydiveLicence}</p>
                            <p>Tunnel hours: {coach.profile.tunnelHours}</p>

                        </div>
                        <div className="coachProfileDetailItem">
                            <p className="profileDetailItem">In sport since</p>
                            <p>{coach.profile.inSportSince}</p>
                        </div>
                    </div>
                </div>
                <div className="profileSec col-xl-12">
                    <div className="profSecTitle">
                        <h3 style={{ margin: "0", color: "#17a2b8" }}>Coaching experience</h3>
                    </div>
                    <div className="">
                        <p style={{ color: "#ffff", padding: "0.5rem", }}>{coach.coach.experience} </p>
                    </div>
                </div>
                <div className=" certAwardSec col-xl-10">
                    <div className=" col-xl-6">
                        <h3 style={{ margin: "0", color: "#17a2b8" }}>Certifications</h3>
                        <p style={{ color: "#ffff", padding: "0.5rem", textAlign: "justify" }}>{coach.coach.certifications} </p>
                    </div>
                    <div className=" col-xl-6">
                        <h3 style={{ margin: "0", color: "#17a2b8" }}>Awards</h3>
                        <p style={{ color: "#ffff", padding: "0.5rem", textAlign: "justify" }}>{coach.coach.awards} </p>
                    </div>
                </div>
            </div>
            <div class="campCommentMenu" role="group" aria-label="Basic example">
                <Link className="commentItemBtn">Coach reviews</Link>
            </div>
        </div>
    )
}
