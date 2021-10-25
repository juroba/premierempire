import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class App extends Component {
    componentDidMount() {
        if (window.location.href.split('#')[1] === '/') {
            this.props.push('/login')
        }
    }

    componentDidUpdate() {
        if (window.location.href.split('#')[1] === '/') {
            this.props.push('/login')
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
