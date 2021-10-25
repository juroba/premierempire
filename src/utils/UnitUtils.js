const getNationFlag = (idNation) => {
    return `${process.env.PUBLIC_URL}/nations/${idNation}.png`
}

const getNationIcon = (idNation) => {
    return `${process.env.PUBLIC_URL}/nations/p${idNation}.png`
}

const getUnitIcon = (nation, type) => {
    const nationFormatted = nation >= 10 ? nation : `0${nation}`
    const typeFormatted = type >= 10 ? type : `0${type}`
    return `${process.env.PUBLIC_URL}/units/${nationFormatted}${typeFormatted}.png`
}

const getUnitFormation = (type) => {
    return `${process.env.PUBLIC_URL}/formations/${type}.png`
}

const getProfession = (id) => {
    return `${process.env.PUBLIC_URL}/professions/${id}.png`
}

const getAttackIcon = (type) => {
    return `${process.env.PUBLIC_URL}/professions/1.png`
}

const getMoralColor = (moral) => {
    if (moral >= 80) {
        return 'darkgreen'
    } else if (moral >= 50) {
        return 'yellow'
    } else if (moral >= 20) {
        return 'darkorange'
    }
    return 'darkred'
}

const coaIds = [2]
const gaIds = [1]

const isAlly = (firstNation, secondNation) => {
    const isCoa = coaIds.includes(firstNation)
    if (isCoa) {
        return coaIds.includes(secondNation)
    }
    return gaIds.includes(secondNation)
}

export {
    getNationFlag,
    getNationIcon,
    getUnitIcon,
    getUnitFormation,
    getProfession,
    getAttackIcon,
    getMoralColor,
    isAlly,
}
