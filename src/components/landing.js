import React from 'react'
import { Link } from 'react-router-dom'

export const landing = (props) => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">

                    <div> {!props.user ?
                        <>
                            <h1 className="x-large">Pro Flyer</h1>
                            <p className="lead">
                                Network of skydive and wind tunnel pro flyers
                    </p>
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                            <Link to="/login" className="btn btn-primary">Login</Link>
                        </>
                        :
                        <>
                            <h3 className="x-large">Welcome, {props.user.name}</h3>
                            <p className="lead">
                                Pro Flyer is a network of pro flyers worldwide. Browse to find coaches and camps in the best dropzones and wind tunnels worldwide.
                    </p>
                            {/* <Link to="/register" className="btn btn-primary">Sign Up</Link>
                            <Link to="/login" className="btn btn-primary">Login</Link> */}
                        </>
                    }
                    </div>
                </div>
            </div>
        </section>
    )
}
export default landing