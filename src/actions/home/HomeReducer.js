import DtoUser from './DtoUser'
import { RECEIVE_USER, FULL_RESET } from './HomeConstants'

export const store = {
    user: {},
}

export function HomeReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return {
                ...state,
                user: new DtoUser(action.user),
            }
        case FULL_RESET:
            return {
                ...store,
            }
        default:
            return state
    }
}
