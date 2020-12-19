import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import HomeAction from '../actions/home/HomeAction'

class App extends Component {
    componentDidMount() {
        if (window.location.href.split('#')[1] === '/') {
            this.props.push('/home')
        }
    }

    componentDidUpdate() {
        if (window.location.href.split('#')[1] === '/') {
            this.props.push('/home')
        }
    }

    render() {
        return <div />
    }
}

const mapDispatchToProps = {
    push,
}

export default connect(null, mapDispatchToProps)(App)
