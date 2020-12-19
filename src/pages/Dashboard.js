import { Component } from 'react'
import { Grid, Icon, LinearProgress, styled } from '@material-ui/core'
import grass from '../static/media/grass.PNG'
//import offPrusse from '../static/media/offPrusse.png'
import { connect } from 'react-redux'
import UnitAction from '../actions/units/UnitAction'
import HomeAction from '../actions/home/HomeAction'
import { PE_LOGIN } from '../actions/home/HomeConstants'

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
            dataLoaded: false,
            unitId: null,
            unit: {},
            movement: false,
        }
    }

    componentDidMount() {
        const { unitId } = this.state
        this.getInfos(unitId)
        const login = localStorage.getItem(PE_LOGIN)
        if (login) {
            this.props.getUser(login).then(() => {
                const { user } = this.props
                this.getInfos(user.id)
            })
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
        const { visibleUnits } = this.props
        const rows = []
        for (let i = xStart; i <= xStart + size; i++) {
            if (i > 0) {
                const visibleUnit = visibleUnits.find((u) => u.x === i && u.y === y)
                if ((y === unit.y && i === unit.x) || visibleUnit) {
                    const unitToShow = visibleUnit || unit
                    rows.push(
                        <td
                            style={{
                                backgroundColor: unitToShow.nation === 1 ? 'blue' : 'orange',
                                backgroundSize: 'cover',
                                width: '45px',
                                height: '45px',
                            }}
                        >
                            {unitToShow.id}
                            {/* <img
                                src={offPrusse}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                }}
                                alt="unitImg"
                            /> */}
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
            if (i > 0) firstRow.push(<td style={this.getStyle(unit.x, i)}>{i}</td>)
        }
        const table = []
        table.push(<tr>{firstRow}</tr>)
        for (let i = yStart; i <= yStart + size; i++) {
            if (i > 0) {
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
        if (movement) {
            this.props.moveUnit(unit.id, movement).then(() => {
                this.setState({ unit: this.props.unit, movement: false })
            })
        }
    }

    getInfos = (unitId) => {
        this.setState({ dataLoaded: false, unitId })
        this.props.getUnit(unitId).then(() => {
            const { unit } = this.props
            this.props.getVisibleUnits(unitId).then(() => {
                this.setState({ unit, dataLoaded: true })
            })
        })
    }

    changeUnit = (unitId) => {
        this.setState({ unitId })
        this.getInfos(unitId)
    }

    render() {
        const { dataLoaded, unit, unitId, movement } = this.state
        const { user } = this.props

        if (dataLoaded) {
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
                            <Grid
                                item
                                container
                                direction="row"
                                style={{ padding: '10px' }}
                                spacing={1}
                            >
                                <Icon onClick={this.props.logout}>power_settings_new</Icon>
                                <Icon onClick={() => this.getInfos(unitId)}>refresh</Icon>
                            </Grid>
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
                                    <select
                                        value={unitId}
                                        style={{ width: '100%' }}
                                        onChange={(e) => this.changeUnit(e.target.value)}
                                    >
                                        {user.units.map((u) => {
                                            return (
                                                <option
                                                    value={u.id}
                                                >{`${u.name} (${u.id})`}</option>
                                            )
                                        })}
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
                                    {unit.pv}
                                </Grid>
                                <Grid item xs={3}>
                                    PA
                                </Grid>
                                <Grid item xs={3}>
                                    {unit.actionPoints}
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
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
                                                    value={1}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name="move"
                                                    checked={movement === 2}
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
                                                    value={2}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name="move"
                                                    checked={movement === 3}
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
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
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
                                                    value={4}
                                                />
                                            </td>
                                            <td />
                                            <td>
                                                <input
                                                    type="radio"
                                                    name="move"
                                                    checked={movement === 5}
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
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
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
                                                    value={6}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name="move"
                                                    checked={movement === 7}
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
                                                    value={7}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name="move"
                                                    checked={movement === 8}
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
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
                            {/* <input
                                title="Vue"
                                type="number"
                                value={unit.view}
                                onChange={(e) =>
                                    this.setState({
                                        unit: { ...unit, view: parseInt(e.target.value) },
                                    })
                                }
                            /> */}
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
        return <LinearProgress />
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.HomeReducer.user,
        unit: store.UnitReducer.unit,
        visibleUnits: store.UnitReducer.visibleUnits,
    }
}

const mapDispatchToProps = {
    getUser: HomeAction.getUser,
    logout: HomeAction.logout,
    getUnit: UnitAction.getUnit,
    getVisibleUnits: UnitAction.getVisibleUnits,
    moveUnit: UnitAction.moveUnit,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
