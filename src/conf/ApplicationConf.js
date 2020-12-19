/* eslint-disable import/no-anonymous-default-export */
const path = 'http://localhost:8000/'

export default {
    unit: {
        getUnit(unitId) {
            return path + `units/${unitId}`
        },
    },
    view: {
        visibleUnits(unitId) {
            return path + `units/visible/${unitId}`
        },
    },
    movement: {
        move(unitId, direction) {
            return path + `move/${unitId}/${direction}`
        },
    },
}
