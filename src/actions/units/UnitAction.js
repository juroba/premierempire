import fetch from 'isomorphic-fetch'
import ApplicationConf from '../../conf/ApplicationConf'
import { getJson } from '../../utils/ActionUtils'
import { RECEIVE_UNIT, RECEIVE_VISIBLE_UNITS } from './UnitConstants'

const UnitAction = {
    receiveVisibleUnits(visibleUnits) {
        return { type: RECEIVE_VISIBLE_UNITS, visibleUnits }
    },

    getVisibleUnits(unitId) {
        return (dispatch) => {
            return fetch(ApplicationConf.view.visibleUnits(unitId), {
                method: 'GET',
            })
                .then(getJson)
                .then((json) => {
                    dispatch(UnitAction.receiveVisibleUnits(json))
                })
                .catch((err) => {
                    console.error('Error : ' + err)
                })
        }
    },

    receiveUnit(unit) {
        return { type: RECEIVE_UNIT, unit }
    },

    getUnit(unitId) {
        return (dispatch) => {
            return fetch(ApplicationConf.unit.getUnit(unitId), {
                method: 'GET',
            })
                .then(getJson)
                .then((json) => {
                    dispatch(UnitAction.receiveUnit(json))
                })
                .catch((err) => {
                    console.error('Error : ' + err)
                })
        }
    },

    moveUnit(unitId, direction) {
        return (dispatch) => {
            return fetch(ApplicationConf.actions.move(unitId, direction), {
                method: 'PUT',
            })
                .then(getJson)
                .then((json) => {
                    console.log(json)
                    dispatch(UnitAction.receiveUnit(json.unit))
                    dispatch(UnitAction.receiveVisibleUnits(json.units))
                })
                .catch((err) => {
                    console.error('Error : ' + err)
                })
        }
    },

    fire(unitId, targetId) {
        return (dispatch) => {
            return fetch(ApplicationConf.actions.fire(unitId, targetId), {
                method: 'PUT',
            })
                .then(getJson)
                .then((json) => {
                    console.log(json)
                    dispatch(UnitAction.receiveUnit(json.unit))
                    dispatch(UnitAction.receiveVisibleUnits(json.units))
                })
                .catch((err) => {
                    console.error('Error : ' + err)
                })
        }
    },
}

export default UnitAction
