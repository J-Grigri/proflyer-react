import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function Protected({ component: Component, ...props }) {
    console.log('onceeee')
    return props.user
        ? <Route {...props} render={() => <Component {...props} />} />
        : <Redirect to="/login" />
}
