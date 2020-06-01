import React from 'react'
import '../footer.css'

export default function Footer() {
    return (
        <div className="kfooter">
            <section id="footer" >
                <div className="container">

                    <div className="row text-center text-xs-center text-sm-left text-md-left">
                        <div className="col-xs-12 col-sm-4 col-md-4">
                            <h5>About Us</h5>
                            <ul className="list-unstyled quick-links">
                                <li><a href="#"><i className="fa fa-angle-double-right"></i>Company</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right"></i>Mission</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right"></i>Contact</a></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-4">
                            <h5>Camps</h5>
                            <ul className="list-unstyled quick-links">
                                <li><a href="#"><i className="fa fa-angle-double-right"></i>FAQ</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right"></i>Safety</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right"></i>Camps</a></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-4">
                            <h5>Quick links</h5>
                            <ul className="list-unstyled quick-links">
                                <li><a href="#"><i className="fa fa-angle-double-right"></i>Wind tunnel events</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right"></i>Skydive events</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right"></i>Find tunnel finder</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right"></i>Dropzone finder</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="footerIcons">

                            <ul className="list-unstyled list-inline social text-center" >
                                <li className="list-inline-item"><a href="#"><i className="fa fa-facebook"></i></a></li>
                                <li className="list-inline-item"><a href="#"><i className="fa fa-instagram"></i></a></li>
                                <li className="list-inline-item"><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                <li className="list-inline-item"><a href="#" target="_blank">
                                    <i className="fa fa-envelope"></i>
                                </a>
                                </li>
                            </ul>
                        </div>
                        <hr />
                    </div>

                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center cc">
                    <p className="h6"> Copyright 2020 © <a className="text-green ml-2" target="_blank">ProFlyer</a></p>
                </div>
            </section>
        </div>

    )
}
