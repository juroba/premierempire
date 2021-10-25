/* eslint-disable import/no-anonymous-default-export */
const path = 'http://localhost:8000/'

export default {
    login: () => `${path}login`,
    logout: () => `${path}logout`,
    user: {
        getUser: (login) => `${path}user/${login}`,
    },
    unit: {
        getUnit: (unitId) => `${path}units/${unitId}`,
    },
    view: {
        visibleUnits: (unitId) => `${path}units/visible/${unitId}`,
    },
    actions: {
        move: (unitId, direction) => `${path}actions/move/${unitId}/${direction}`,
        fire: (unitId, targetId) => `${path}actions/fire/${unitId}/${targetId}`,
    },
    map: {
        getMapCases: () => `${path}map/cases`,
    },
}
