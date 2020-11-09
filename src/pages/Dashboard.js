import { Component } from 'react'
import { Grid, styled } from '@material-ui/core'
import grass from '../static/media/grass.PNG'

const SubTitleCard = styled(({ ...other }) => <Grid {...other} />)({
    height: '20px',
    width: '100%',
    backgroundColor: 'burlywood',
    marginBottom: '20px',
    border: '1px solid black',
})

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view: 4,
        }
    }

    getStyle = (size, i) => {
        return {
            backgroundColor: i * 2 === size + 1 ? 'darkred' : i % 2 !== 0 ? 'grey' : 'lightgray',
            textAlign: 'center',
            width: '35px',
            height: '20px',
            color: i * 2 === size + 1 ? 'white' : 'black',
            fontWeight: i * 2 === size + 1 ? 'bold' : 'auto',
        }
    }

    getView = () => {
        const { view } = this.state
        const size = view * 2 + 1
        const rows = []
        console.log(size)
        for (let i = 1; i <= size; i++) {
            rows.push(
                <td
                    style={{
                        backgroundImage: `url(${grass})`,
                        backgroundSize: 'cover',
                        width: '45px',
                        height: '45px',
                    }}
                />,
            )
        }
        const firstRow = []
        firstRow.push(<td style={this.getStyle(size, 0)} />)
        for (let i = 1; i <= size; i++) {
            firstRow.push(<td style={this.getStyle(size, i)}>{i}</td>)
        }
        const table = []
        table.push(firstRow)
        for (let i = 1; i <= size; i++) {
            table.push(
                <tr>
                    <td style={this.getStyle(size, i)}>{i}</td>
                    {rows}
                </tr>,
            )
        }
        return (
            <table className="no-spacing">
                <tbody>{table}</tbody>
            </table>
        )
    }

    render() {
        const { view } = this.state

        return (
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                style={{ width: '100vw' }}
                spacing={3}
            >
                <Grid item xs={3} container direction="column">
                    <SubTitleCard item>
                        <span
                            style={{
                                padding: '5px',
                            }}
                        >
                            Infos du bataillon
                        </span>
                    </SubTitleCard>
                    <SubTitleCard item>
                        <span
                            style={{
                                padding: '5px',
                            }}
                        >
                            Déplacement
                        </span>
                    </SubTitleCard>
                    <input
                        title="Vue"
                        type="number"
                        value={view}
                        onChange={(e) => this.setState({ view: e.target.value })}
                    />
                    <SubTitleCard item>
                        <span
                            style={{
                                padding: '5px',
                            }}
                        >
                            Courrier du régiment
                        </span>
                    </SubTitleCard>
                    <SubTitleCard item>
                        <span
                            style={{
                                padding: '5px',
                            }}
                        >
                            Mes derniers évenements
                        </span>
                    </SubTitleCard>
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{ width: 'max-content' }}
                >
                    <SubTitleCard>
                        <span
                            style={{
                                padding: '5px',
                            }}
                        >
                            Front
                        </span>
                    </SubTitleCard>
                    <Grid item>{this.getView()}</Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Dashboard
