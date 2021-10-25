const getMapRelief = (type) => {
    return `${process.env.PUBLIC_URL}/terrains/${type}.png`
}

const getMapPaysage = (type) => {
    if (type === 1) {
        return `${process.env.PUBLIC_URL}/paysages/${randomIntFromInterval(1, 4)}.png`
    }
    return ''
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export { getMapRelief, getMapPaysage }
