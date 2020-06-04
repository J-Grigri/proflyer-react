import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const ar = [{ id: 1, cat: "Jerry" }, { id: 2, cat: "Tom" }, { id: 3, cat: "Bull" }]
export default function MainPage(props) {
    const history = useHistory()
    const [cats, setCats] = useState(ar)
    const [camp, setCamp] = useState({ id: 1, name: "Hell", cats: [] })

    useEffect(() => {
        if (props.loaded && !props.user) history.push("/login");
    }, [props.loaded]);

    const addToObj = id => {
        let temp = camp.cats.concat(cats.find(e => e.id === id))
        setCamp({ ...camp, cats: temp })
        setCats([...cats.filter(e => e.id !== id)])
    }
    return (
        <div >
            Hello WTF {props.user && props.user.name}
            {cats.map(el => <p onClick={() => addToObj(el.id)}>{el.cat}</p>)}
            Camp is here
            Name: {camp.name}
            Cats : {camp.cats.map(e => e.cat)}
        </div>)
}
