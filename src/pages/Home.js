import { Component } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import homeImg from '../static/media/default.png'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import HomeAction from '../actions/home/HomeAction'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: null,
            pwd: null,
        }
    }

    onChange = (key, value) => {
        this.setState({ [key]: value })
    }

    onSubmit = () => {
        const { login, pwd } = this.state
        if (login && pwd) {
            this.props.login(login, pwd).then(() => {
                this.props.push('/dashboard')
            })
        }
    }

    keyPress = (e) => {
        if (e.key === 'Enter') {
            this.onSubmit()
        }
    }

    render() {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ padding: '20px 15%' }}
            >
                <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ backgroundImage: "url('../media/default.png')", marginBottom: '20px' }}
                >
                    <img src={homeImg} alt="home" />
                </Grid>
                <Grid item container direction="row" justify="center" alignItems="center" xs={4}>
                    <TextField
                        label="Identifiant"
                        variant="outlined"
                        onChange={(e) => this.onChange('login', e.target.value)}
                        onKeyPress={this.keyPress}
                    />
                </Grid>
                <Grid item container direction="row" justify="center" alignItems="center" xs={4}>
                    <TextField
                        label="Mot de passe"
                        variant="outlined"
                        type="password"
                        onChange={(e) => this.onChange('pwd', e.target.value)}
                        onKeyPress={this.keyPress}
                    />
                </Grid>
                <Grid item container direction="row" justify="center" alignItems="center" xs={4}>
                    <Button variant="contained" onClick={this.onSubmit}>
                        Se connecter
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

const mapDispatchToProps = {
    login: HomeAction.login,
    push,
}

export default connect(null, mapDispatchToProps)(Home)
