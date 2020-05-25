import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function MainPage(props) {
    console.log("===", props.user)
    const history = useHistory()

    useEffect(() => {
        if (props.loaded && !props.user) history.push("/login");
    }, [props.loaded]);

    return (
        <div>
            Hello WTF {props.user && props.user.name}
        </div>
    )
}
