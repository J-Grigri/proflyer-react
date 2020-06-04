import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../coachFullProfile.css'

export default function CoachFullProfile(props) {

    // const [coach, setCoach] = useState(null)
    // console.log(coach)

    // // get id from params
    // const { coachId } = useParams()

    // useEffect(() => {
    //     fetchSingleCoach()
    // }, [])

    // const fetchSingleCoach = async () => {
    //     const res = await fetch(process.env.REACT_APP_SERVER + "/camps/" + coachId, {
    //         method: "GET",
    //         headers: {
    //             Authorization: "Bearer " + localStorage.getItem("token")
    //         }
    //     })
    //     if (res.status === 200) {
    //         const body = await res.json()
    //         console.log("body", body)
    //         setCamp(body.data)
    //     } else {
    //         alert("No coaches to show")
    //     }
    // }

    // if (!coach) return <h1>Loading...</h1>

    return (
        <div className="col-xl-6 campExtended">
            <h5 className="campCategoryBox">Coach Full profile</h5>
            <div className="verticalExtended col-xl-12 " >
                <div className="coachProfileTop">
                    <div className="card-img-top col-xl-5">
                        <img src="https://a.calameoassets.com/1651941/picture.jpg?_u=120908181623" alt="..." />
                        <div className="coachSocMedia">
                            <i height="100" class="fab fa-instagram fa-2x"></i>
                            <i class="fab fa-facebook-square fa-2x"></i>
                            <i class="fab fa-youtube fa-2x"></i>
                            <i class="fab fa-twitter-square fa-2x"></i>
                        </div>
                    </div>
                    <div className="coachProfileTopR col-xl-7">
                        <h5 className="coachName">Coach name</h5>
                        <p className="coachBio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.</p>

                    </div>
                </div>
                <div className="profileSec col-xl-12">
                    <div className="profSecTitle">
                        <h3 style={{ margin: "0", color: "#17a2b8" }}>Details</h3>
                    </div>
                    <div className="coachProfileDetails">
                        <div className="coachProfileDetailItem col-xl-2" >
                            <p className="profileDetailItem">Coaching</p>
                            skydive
                            wind tunnel
                        </div>
                        <div className="coachProfileDetailItem col-xl-2">
                            <p className="profileDetailItem">Based in</p>
                            location
                        </div>
                        <div className="coachProfileDetailItem col-xl-2">
                            <p className="profileDetailItem">Disciplines</p>
                            disciplines
                        </div>
                        <div className="coachProfileDetailItem col-xl-2">
                            <p className="profileDetailItem">Experience</p>
                            skydive licence
                            tunnel hours
                         </div>
                        <div className="coachProfileDetailItem col-xl-2">
                            <p className="profileDetailItem">In sport since</p>
                            2008
                        </div>
                    </div>
                </div>
                <div className="profileSec col-xl-12">
                    <div className="profSecTitle">
                        <h3 style={{ margin: "0", color: "#17a2b8" }}>Coaching experience</h3>
                    </div>
                    <div className="">
                        <p style={{ color: "#ffff", padding: "0.5rem", textAlign: "justify" }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. </p>
                    </div>
                </div>
                <div className=" certAwardSec col-xl-10">
                    <div className=" col-xl-6">
                        <h3 style={{ margin: "0", color: "#17a2b8" }}>Certifications</h3>
                        <p style={{ color: "#ffff", padding: "0.5rem", textAlign: "justify" }}>Certifications will come here </p>
                    </div>
                    <div className=" col-xl-6">
                        <h3 style={{ margin: "0", color: "#17a2b8" }}>Awards</h3>
                        <p style={{ color: "#ffff", padding: "0.5rem", textAlign: "justify" }}>Awards will come here </p>
                    </div>
                </div>
            </div>
            <div class="campCommentMenu" role="group" aria-label="Basic example">
                <Link to="/camps/id" className="commentItemBtn">Coach reviews</Link>
            </div>
        </div>
    )
}
