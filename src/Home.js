import { Component } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import homeImg from './static/media/default.png'

class Home extends Component {
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
                    style={{ backgroundImage: "url('../media/default.png')", marginBottom: '20px' }}
                >
                    <img src={homeImg} />
                </Grid>
                <Grid item container direction="row" justify="center" alignItems="center" xs={4}>
                    <TextField label="Identifiant" variant="outlined" />
                </Grid>
                <Grid item container direction="row" justify="center" alignItems="center" xs={4}>
                    <TextField label="Mot de passe" variant="outlined" type="password" />
                </Grid>
                <Grid item container direction="row" justify="center" alignItems="center" xs={4}>
                    <Button variant="contained">Se connecter</Button>
                </Grid>
            </Grid>
        )
    }
}

export default Home
