import { push } from 'react-router-redux'
import fetch from 'isomorphic-fetch'
import { PE_LOGIN, PE_TOKEN, RECEIVE_USER, FULL_RESET, RECEIVE_MAP_CASES } from './HomeConstants'
import ApplicationConf from '../../conf/ApplicationConf'
import { checkAuth, getAuthorization, getJson, removeToken } from '../../utils/ActionUtils'

const HomeAction = {
    receiveUser(user) {
        return { type: RECEIVE_USER, user }
    },

    getUser(login) {
        return (dispatch) => {
            return fetch(ApplicationConf.user.getUser(login), {
                method: 'GET',
            })
                .then(getJson)
                .then((json) => {
                    dispatch(HomeAction.receiveUser(json))
                })
                .catch((err) => {
                    console.error('Error : ' + err)
                })
        }
    },

    receiveMapCases(mapCases) {
        return { type: RECEIVE_MAP_CASES, mapCases }
    },

    getMapCases() {
        return (dispatch) => {
            return fetch(ApplicationConf.map.getMapCases(), {
                method: 'GET',
            })
                .then(getJson)
                .then((json) => {
                    dispatch(HomeAction.receiveMapCases(json.cases))
                })
                .catch((err) => {
                    console.error('Error : ' + err)
                })
        }
    },

    login(login, password) {
        const basicAuth = btoa(login + ':' + password)
        return () => {
            return fetch(ApplicationConf.login(), {
                method: 'POST',
                headers: {
                    Authorization: 'Basic ' + basicAuth,
                },
                body: JSON.stringify({
                    module: 'WEB',
                }),
            })
                .then(checkAuth)
                .then((json) => {
                    localStorage.setItem(PE_LOGIN, login)
                    localStorage.setItem(PE_TOKEN, json.token)
                })
                .catch((err) => {
                    console.error('unauthorizedLogin : ' + err)
                })
        }
    },

    logout() {
        if (window.navigator.onLine) {
            return (dispatch) => {
                return fetch(ApplicationConf.logout(), {
                    method: 'POST',
                    headers: getAuthorization(),
                }).then((response) => {
                    removeToken()
                    dispatch(push('/login'))
                    dispatch(HomeAction.fullReset())
                    if (response.status !== 200) {
                        throw response.statusText
                    }
                })
            }
        }
        return (dispatch) => {
            removeToken()
            dispatch(push('/login'))
            dispatch(HomeAction.fullReset())
        }
    },

    fullReset() {
        localStorage.removeItem(PE_LOGIN)
        localStorage.removeItem(PE_TOKEN)
        return (dispatch) => {
            dispatch({ type: FULL_RESET })
        }
    },
}

export default HomeAction
