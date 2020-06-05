import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
    CircleLoader
} from 'react-spinners'

const ar = [{ id: 1, cat: "Jerry" }, { id: 2, cat: "Tom" }, { id: 3, cat: "Bull" }]
export default function MainPage(props) {
    const history = useHistory()

    useEffect(() => {
        if (props.loaded && !props.user) history.push("/login");
    }, [props.loaded]);


    return (
        <div className="container col">
            <div className="">
                Welcome to profyler <h3>{props.user && props.user.name}</h3>
            </div>
            <div className="row">
                <Link to='/camps/' className="campCardBtnMain">See camps</Link>
                <Link to='/coaches/' className="campCardBtnMain">See coaches</Link>
                <Link to='/profile/' className="campCardBtnMain">Edit profile</Link>
            </div>
            <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </div>
        </div>
    )
}
