import DtoUser from './DtoUser'
import { RECEIVE_USER, FULL_RESET, RECEIVE_MAP_CASES } from './HomeConstants'

export const store = {
    user: {},
    mapCases: [],
}

export function HomeReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return {
                ...state,
                user: new DtoUser(action.user),
            }
        case RECEIVE_MAP_CASES:
            return {
                ...state,
                mapCases: action.mapCases,
            }
        case FULL_RESET:
            return {
                ...store,
            }
        default:
            return state
    }
}
