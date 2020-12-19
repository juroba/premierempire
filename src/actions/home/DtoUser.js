import DtoUnit from '../units/DtoUnit'

export default class DtoUser {
    constructor(object) {
        this.id = object.id
        this.login = object.login
        this.camp = object.camp
        this.nation = object.nation
        this.division = object.division
        this.token = object.token
        this.units = object.units.map((u) => new DtoUnit(u))
    }
}
