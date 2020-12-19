/* eslint-disable no-process-env */
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { connectRouter } from 'connected-react-router'
import { createHashHistory } from 'history'
import { UnitReducer, store as UnitReducerStore } from '../units/UnitReducer'

export const history = createHashHistory()

const middlewares = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
}

const enhancer = applyMiddleware(...middlewares)

const initialStore = {
    UnitReducer: UnitReducerStore,
}

const appReducers = combineReducers({
    UnitReducer,
    router: connectRouter(history),
})

const rootReducer = (state, action) => {
    if (action.type === 'RESET_ALL_STORE') {
        const { applicationSettings } = state.HomeReducer
        const homeReducer = {
            ...initialStore.HomeReducer,
            applicationSettings,
        }
        return {
            ...state,
            ...initialStore,
            HomeReducer: homeReducer,
        }
    }
    return appReducers(state, action)
}

const AppStore = createStore(rootReducer, initialStore, enhancer)

export default AppStore
