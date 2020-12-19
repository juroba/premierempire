import DtoUnit from './DtoUnit'
import { RECEIVE_UNIT, RECEIVE_VISIBLE_UNITS } from './UnitConstants'
import { FULL_RESET } from '../home/HomeConstants'

export const store = {
    unit: {},
    visibleUnits: [],
}

export function UnitReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_UNIT:
            return {
                ...state,
                unit: new DtoUnit(action.unit),
            }
        case RECEIVE_VISIBLE_UNITS:
            return {
                ...state,
                visibleUnits: action.visibleUnits.map((u) => new DtoUnit(u)),
            }
        case FULL_RESET:
            return {
                ...store,
            }
        default:
            return state
    }
}
