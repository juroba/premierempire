import { Component } from 'react'
import { Grid, styled } from '@material-ui/core'
import grass from '../static/media/grass.PNG'
import offPrusse from '../static/media/offPrusse.png'

const SubTitleCard = styled(({ ...other }) => <Grid {...other} />)({
    height: '20px',
    width: '100%',
    backgroundColor: 'burlywood',
    marginBottom: (props) => (props.noMargin ? '0' : '20px'),
    border: '1px solid black',
})

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view: 4,
            x: 5,
            y: 5,
            unit: {
                id: 1,
                name: 'Cendrov',
                type: 1,
                idUser: 1,
                pa: 20,
                view: 7,
                eff: 50,
                moral: 100,
                xp: 0,
                formation: 1,
                x: 10,
                y: 10,
            },
            movement: false,
        }
    }

    getStyle = (iUnit, i) => {
        return {
            backgroundColor: iUnit === i ? 'darkred' : i % 2 !== 0 ? 'grey' : 'lightgray',
            textAlign: 'center',
            width: '35px',
            height: '20px',
            fontWeight: iUnit === i ? 'bold' : 'normal',
            color: iUnit === i ? 'white' : 'black',
        }
    }

    getRow = (xStart, y, unit, size) => {
        const rows = []
        for (let i = xStart; i <= xStart + size; i++) {
            if (i >= 0) {
                if (y === unit.y && i === unit.x) {
                    rows.push(
                        <td
                            style={{
                                backgroundImage: `url(${grass})`,
                                backgroundSize: 'cover',
                                width: '45px',
                                height: '45px',
                            }}
                        >
                            <img
                                src={offPrusse}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                }}
                                alt="unitImg"
                            />
                        </td>,
                    )
                } else {
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
            }
        }
        return rows
    }

    getView = () => {
        const { unit } = this.state
        const xStart = unit.x - unit.view
        const yStart = unit.y - unit.view
        const size = unit.view * 2
        const firstRow = []
        firstRow.push(<td style={this.getStyle(unit.x, xStart + 1)} />)
        for (let i = xStart; i <= xStart + size; i++) {
            if (i >= 0) firstRow.push(<td style={this.getStyle(unit.x, i)}>{i}</td>)
        }
        const table = []
        table.push(firstRow)
        for (let i = yStart; i <= yStart + size; i++) {
            if (i >= 0) {
                table.push(
                    <tr>
                        <td style={this.getStyle(unit.y, i)}>{i}</td>
                        {this.getRow(xStart, i, unit, size)}
                    </tr>,
                )
            }
        }
        return (
            <table className="movement no-spacing">
                <tbody>{table}</tbody>
            </table>
        )
    }

    setMovement = (movement) => {
        this.setState({ movement: parseInt(movement) })
    }

    moveUnit = () => {
        const { unit, movement } = this.state
        let moveX = 0
        let moveY = 0
        switch (movement) {
            case 1:
                moveX = -1
                moveY = -1
                break
            case 2:
                moveX = 0
                moveY = -1
                break
            case 3:
                moveX = 1
                moveY = -1
                break
            case 4:
                moveX = -1
                moveY = 0
                break
            case 5:
                moveX = 1
                moveY = 0
                break
            case 6:
                moveX = -1
                moveY = 1
                break
            case 7:
                moveX = 0
                moveY = 1
                break
            case 8:
                moveX = 1
                moveY = 1
                break
            default:
                break
        }
        if (movement) {
            this.setState({
                unit: {
                    ...unit,
                    x: unit.x + moveX,
                    y: unit.y + moveY,
                },
                movement: false,
            })
        }
    }

    render() {
        const { unit, movement } = this.state

        return (
            <>
                <SubTitleCard item />
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    style={{ width: '100vw' }}
                    spacing={3}
                >
                    <Grid
                        item
                        xs={3}
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <SubTitleCard item noMargin>
                            <span
                                style={{
                                    padding: '8px',
                                }}
                            >
                                Infos du bataillon
                            </span>
                        </SubTitleCard>
                        <Grid
                            item
                            container
                            direction="row"
                            style={{ padding: '10px' }}
                            spacing={1}
                        >
                            <Grid item xs={3}>
                                Officier
                            </Grid>
                            <Grid item xs={9}>
                                <select style={{ width: '100%' }}>
                                    <option>Cendrov - EM</option>
                                    <option>Centir - Gre.</option>
                                    <option>Centor - Fus.</option>
                                </select>
                            </Grid>
                            <Grid item xs={3}>
                                Matricule
                            </Grid>
                            <Grid item xs={9}>
                                {unit.id}
                            </Grid>
                            <Grid item xs={3}>
                                Type
                            </Grid>
                            <Grid item xs={9}>
                                {unit.type}
                            </Grid>
                            <Grid item xs={3}>
                                XP
                            </Grid>
                            <Grid item xs={3}>
                                {unit.xp}
                            </Grid>
                            <Grid item xs={3}>
                                Effectif
                            </Grid>
                            <Grid item xs={3}>
                                {unit.eff}
                            </Grid>
                            <Grid item xs={3}>
                                PA
                            </Grid>
                            <Grid item xs={3}>
                                {unit.pa}
                            </Grid>
                            <Grid item xs={3}>
                                Moral
                            </Grid>
                            <Grid item xs={3}>
                                {unit.moral}%
                            </Grid>
                        </Grid>
                        <SubTitleCard item noMargin>
                            <span
                                style={{
                                    padding: '8px',
                                }}
                            >
                                Déplacement
                            </span>
                        </SubTitleCard>
                        <Grid item>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                type="radio"
                                                name="move"
                                                checked={movement === 1}
                                                onChange={(e) => this.setMovement(e.target.value)}
                                                value={1}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="move"
                                                checked={movement === 2}
                                                onChange={(e) => this.setMovement(e.target.value)}
                                                value={2}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="move"
                                                checked={movement === 3}
                                                onChange={(e) => this.setMovement(e.target.value)}
                                                value={3}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input
                                                type="radio"
                                                name="move"
                                                checked={movement === 4}
                                                onChange={(e) => this.setMovement(e.target.value)}
                                                value={4}
                                            />
                                        </td>
                                        <td />
                                        <td>
                                            <input
                                                type="radio"
                                                name="move"
                                                checked={movement === 5}
                                                onChange={(e) => this.setMovement(e.target.value)}
                                                value={5}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input
                                                type="radio"
                                                name="move"
                                                checked={movement === 6}
                                                onChange={(e) => this.setMovement(e.target.value)}
                                                value={6}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="move"
                                                checked={movement === 7}
                                                onChange={(e) => this.setMovement(e.target.value)}
                                                value={7}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="move"
                                                checked={movement === 8}
                                                onChange={(e) => this.setMovement(e.target.value)}
                                                value={8}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                        <Grid item>
                            <button type="button" onClick={this.moveUnit}>
                                Déplacer le bataillon
                            </button>
                        </Grid>
                        <input
                            title="Vue"
                            type="number"
                            value={unit.view}
                            onChange={(e) =>
                                this.setState({ unit: { ...unit, view: parseInt(e.target.value) } })
                            }
                        />
                        <SubTitleCard item noMargin>
                            <span
                                style={{
                                    padding: '8px',
                                }}
                            >
                                Courrier du régiment
                            </span>
                        </SubTitleCard>
                        <SubTitleCard item noMargin>
                            <span
                                style={{
                                    padding: '8px',
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
                                    padding: '8px',
                                }}
                            >
                                Front
                            </span>
                        </SubTitleCard>
                        <Grid item>{this.getView()}</Grid>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default Dashboard
