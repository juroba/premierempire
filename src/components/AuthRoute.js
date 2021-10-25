import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import HomeAction from '../actions/home/HomeAction'
import { getPayload } from '../utils/ActionUtils'

const checkAuth = (logout) => {
    // const payload = getPayload()
    // if (!payload) {
    //     logout()
    //     return false
    // }
    return true
}

const AuthRoute = (props) => {
    return checkAuth(props.logout) ? <props.component {...props} /> : <Redirect to="/test" />
}

const mapDispatchToProps = {
    logout: HomeAction.logout,
}

AuthRoute.propTypes = {
    path: PropTypes.string,
    logout: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(AuthRoute)
