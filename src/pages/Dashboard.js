import { Component } from 'react'
import { Grid, Icon, LinearProgress, styled } from '@material-ui/core'
import refresh from '../static/actions/refresh.png'
//import offPrusse from '../static/media/offPrusse.png'
import { connect } from 'react-redux'
import UnitAction from '../actions/units/UnitAction'
import HomeAction from '../actions/home/HomeAction'
import { PE_LOGIN } from '../actions/home/HomeConstants'
import {
    getAttackIcon,
    getMoralColor,
    getNationFlag,
    getNationIcon,
    getProfession,
    getUnitFormation,
    getUnitIcon,
    isAlly,
} from '../utils/UnitUtils'
import { getMapPaysage, getMapRelief } from '../utils/MapUtils'

const SubTitleCard = styled(({ ...other }) => <Grid {...other} />)({
    height: (props) => props.height || '25px',
    width: (props) => props.width || '100%',
    backgroundColor: (props) => props.color || '#CF9C69',
    marginBottom: (props) => (props.nomargin ? '0' : '20px'),
    border: '1px solid black',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 4,
})

const UnitCard = styled(({ ...other }) => <Grid {...other} />)({
    width: 300,
    backgroundColor: '#CF9C69',
    border: '1px solid black',
})

const TOP_LEFT = 1
const TOP = 2
const TOP_RIGHT = 3
const LEFT = 4
const RIGHT = 5
const BOTTOM_LEFT = 6
const BOTTOM = 7
const BOTTOM_RIGHT = 8

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataLoaded: false,
            unitId: null,
            unit: {},
            unitSelected: null,
            movement: false,
        }
    }

    randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    componentDidMount() {
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
            height: '18px',
            fontWeight: 'bold',
            color: iUnit === i ? 'white' : 'black',
            fontSize: 12,
        }
    }

    onClickUnit = (unitSelected) => {
        this.setState({ unitSelected })
    }

    getRow = (xStart, y, unit, size) => {
        const { visibleUnits, mapCases } = this.props
        const rows = []
        for (let i = xStart; i <= xStart + size; i++) {
            if (i > 0) {
                const visibleUnit = visibleUnits.find((u) => u.x === i && u.y === y)
                const caseUnit = mapCases.find((c) => c.x === i && c.y === y)
                console.log(caseUnit)
                if ((y === unit.y && i === unit.x) || visibleUnit) {
                    const unitToShow = visibleUnit || unit
                    rows.push(
                        <td
                            className="clickable tooltipped"
                            onClick={() => this.onClickUnit(unitToShow)}
                            style={{
                                backgroundImage: `
                                    url(${getUnitIcon(unitToShow.nation, unitToShow.type)}),
                                    url(${getUnitFormation(unitToShow.formation)}),
                                    url(${getMapPaysage(caseUnit.paysage)}),
                                    url(${getMapRelief(caseUnit.relief)})
                                `,
                                backgroundSize: '35px, cover, cover, cover',
                                backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat',
                                backgroundPosition: 'top',
                                width: 40,
                                height: 40,
                                fontWeight: 'bold',
                                color: 'white',
                                verticalAlign: 'bottom',
                                textAlign: 'center',
                                fontSize: 12,
                            }}
                        >
                            {unitToShow.id}
                            <UnitCard
                                className="tooltipUnit"
                                item
                                container
                                direction="column"
                                alignItems="flex-start"
                            >
                                <Grid item style={{ padding: 8 }}>
                                    <b style={{ padding: 8 }}>{unitToShow.name}</b>
                                </Grid>
                                <Grid item style={{ padding: 8 }}>
                                    PV : <b style={{ padding: 8 }}>{unitToShow.pv}</b>
                                </Grid>
                                <Grid item style={{ padding: 8 }}>
                                    Type : <b style={{ padding: 8 }}>{unitToShow.type}</b>
                                </Grid>
                                <Grid item style={{ padding: 8 }}>
                                    Nation : <b style={{ padding: 8 }}>{unitToShow.nation}</b>
                                </Grid>
                            </UnitCard>
                        </td>,
                    )
                } else {
                    // const forests = [forest, forest2, forest3, forest4]
                    rows.push(
                        <td
                            style={{
                                backgroundImage: `
                                    url(${getMapPaysage(caseUnit.paysage)}),
                                    url(${getMapRelief(caseUnit.relief)})
                                `,
                                backgroundSize: 'cover, cover, cover',
                                backgroundRepeat: 'no-repeat, no-repeat',
                                width: 40,
                                height: 40,
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
                this.setState({ unit: this.props.unit })
            })
        }
    }

    getInfos = (unitId) => {
        this.setState({ dataLoaded: false, unitId })
        this.props.getMapCases().then(() => {
            this.props.getUnit(unitId).then(() => {
                const { unit } = this.props
                this.props.getVisibleUnits(unitId).then(() => {
                    this.setState({ unit, dataLoaded: true })
                })
            })
        })
    }

    changeUnit = (unitId) => {
        this.setState({ unitId })
        this.getInfos(unitId)
    }

    onFire = (unitId, targetId) => {
        this.props.fire(unitId, targetId).then(() => {
            const { unit } = this.props
            this.setState({ unit, unitSelected: null })
        })
    }

    getPanelUnitSelected = () => {
        const { unit, unitSelected } = this.state
        if (unitSelected) {
            console.log(unitSelected)
            return (
                <UnitCard item container direction="column" style={{ marginTop: 4 }}>
                    <Grid
                        item
                        container
                        alignContent="center"
                        justify="space-between"
                        className="bold"
                        style={{ padding: 8, borderBottom: '1px solid black' }}
                    >
                        <img
                            src={getNationIcon(unitSelected.nation)}
                            alt="flag"
                            height="20px"
                            style={{ marginRight: 4 }}
                        />
                        {unitSelected.name}
                        <Icon
                            className="clickable"
                            style={{ color: 'darkred' }}
                            onClick={() => this.setState({ unitSelected: null })}
                        >
                            close
                        </Icon>
                    </Grid>
                    <Grid item style={{ padding: 8 }}>
                        PV : <b style={{ padding: 8 }}>{unitSelected.pv}</b>
                    </Grid>
                    <Grid item style={{ padding: 8 }}>
                        Type : <b style={{ padding: 8 }}>{unitSelected.type}</b>
                    </Grid>
                    <Grid item style={{ padding: 8 }}>
                        Nation : <b style={{ padding: 8 }}>{unitSelected.nation}</b>
                    </Grid>
                    <Grid item style={{ padding: 8 }}>
                        {!isAlly(unit.nation, unitSelected.nation) && (
                            <button
                                type="button"
                                className="clickable"
                                onClick={() => this.onFire(unit.id, unitSelected.id)}
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                Feu à volonté !
                                <img
                                    alt="fire"
                                    src={getAttackIcon(unitSelected.type)}
                                    style={{ marginLeft: 4 }}
                                />
                            </button>
                        )}
                    </Grid>
                </UnitCard>
            )
        }
        return null
    }

    render() {
        const { dataLoaded, unit, unitId, movement } = this.state
        const { user } = this.props

        return (
            <>
                <SubTitleCard item>
                    <Icon className="clickable" onClick={this.props.logout}>
                        power_settings_new
                    </Icon>
                </SubTitleCard>
                {dataLoaded ? (
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        style={{ width: '95vw' }}
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
                            <SubTitleCard
                                item
                                container
                                nomargin="true"
                                color="#BB8855"
                                height="fit-content"
                                style={{ padding: 8 }}
                                justify="center"
                            >
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <img
                                            src={getNationFlag(unit.nation)}
                                            alt="flag"
                                            height="55px"
                                            style={{ border: '1px solid black' }}
                                        />
                                    </Grid>
                                    <span className="bold" style={{ fontFamily: 'arial' }}>
                                        Mon régiment
                                    </span>
                                    <Grid item>
                                        <img
                                            src={getNationFlag(unit.nation)}
                                            alt="flag"
                                            height="55px"
                                            style={{ border: '1px solid black' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <img src={getProfession('g1')} alt="flag" height="35px" />
                                </Grid>
                            </SubTitleCard>
                            <Grid
                                item
                                container
                                direction="row"
                                style={{ padding: '10px' }}
                                spacing={1}
                            >
                                <img
                                    alt="refresh"
                                    src={refresh}
                                    className="clickable"
                                    onClick={() => this.getInfos(unitId)}
                                />
                            </Grid>
                            <SubTitleCard item nomargin="true">
                                Infos du bataillon
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
                                        className="clickable"
                                        value={unitId}
                                        style={{ width: '100%' }}
                                        onChange={(e) => this.changeUnit(e.target.value)}
                                    >
                                        {user.units.map((u) => {
                                            return (
                                                <option
                                                    id={u.id}
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
                                <Grid item xs={3} className="bold">
                                    {unit.xp}
                                </Grid>
                                <Grid item xs={3}>
                                    Effectif
                                </Grid>
                                <Grid item xs={3} className="bold">
                                    {unit.pv}
                                </Grid>
                                <Grid item xs={3}>
                                    PA
                                </Grid>
                                <Grid item xs={3} className="bold">
                                    {unit.actionPoints}
                                </Grid>
                                <Grid item xs={3}>
                                    Moral
                                </Grid>
                                <Grid item xs={3}>
                                    <span
                                        className="bold"
                                        style={{
                                            color: getMoralColor(unit.moral),
                                        }}
                                    >
                                        {unit.moral}%
                                    </span>
                                </Grid>
                            </Grid>
                            <SubTitleCard item nomargin="true">
                                Déplacement
                            </SubTitleCard>
                            <Grid item>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input
                                                    className="clickable"
                                                    type="radio"
                                                    name="move"
                                                    checked={movement === TOP_LEFT}
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
                                                    value={TOP_LEFT}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="clickable"
                                                    type="radio"
                                                    name="move"
                                                    checked={movement === TOP}
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
                                                    value={TOP}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="clickable"
                                                    type="radio"
                                                    name="move"
                                                    checked={movement === TOP_RIGHT}
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
                                                    value={TOP_RIGHT}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input
                                                    className="clickable"
                                                    type="radio"
                                                    name="move"
                                                    checked={movement === LEFT}
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
                                                    value={LEFT}
                                                />
                                            </td>
                                            <td />
                                            <td>
                                                <input
                                                    className="clickable"
                                                    type="radio"
                                                    name="move"
                                                    checked={movement === RIGHT}
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
                                                    value={RIGHT}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input
                                                    className="clickable"
                                                    type="radio"
                                                    name="move"
                                                    checked={movement === BOTTOM_LEFT}
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
                                                    value={BOTTOM_LEFT}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="clickable"
                                                    type="radio"
                                                    name="move"
                                                    checked={movement === BOTTOM}
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
                                                    value={BOTTOM}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="clickable"
                                                    type="radio"
                                                    name="move"
                                                    checked={movement === BOTTOM_RIGHT}
                                                    onChange={(e) =>
                                                        this.setMovement(e.target.value)
                                                    }
                                                    value={BOTTOM_RIGHT}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Grid>
                            <Grid item style={{ padding: 8 }}>
                                <button type="button" className="clickable" onClick={this.moveUnit}>
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
                            <SubTitleCard item>Courrier du régiment</SubTitleCard>
                            <SubTitleCard item nomargin="true">
                                Mes derniers évenements
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
                            <SubTitleCard>Front</SubTitleCard>
                            <Grid item>{this.getView()}</Grid>
                            <Grid item>{this.getPanelUnitSelected()}</Grid>
                        </Grid>
                    </Grid>
                ) : (
                    <LinearProgress />
                )}
            </>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        mapCases: store.HomeReducer.mapCases,
        user: store.HomeReducer.user,
        unit: store.UnitReducer.unit,
        visibleUnits: store.UnitReducer.visibleUnits,
    }
}

const mapDispatchToProps = {
    getMapCases: HomeAction.getMapCases,
    getUser: HomeAction.getUser,
    logout: HomeAction.logout,
    getUnit: UnitAction.getUnit,
    getVisibleUnits: UnitAction.getVisibleUnits,
    moveUnit: UnitAction.moveUnit,
    fire: UnitAction.fire,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
