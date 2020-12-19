import { PE_TOKEN } from '../actions/home/HomeConstants'

const removeToken = () => {
    localStorage.removeItem(PE_TOKEN)
}

const getJson = function (response) {
    if (response) {
        return response.json()
    }
    console.error('Erreur lors de la récupération')
    return {}
}

const checkAuth = (response) => {
    switch (response.status) {
        case 200:
            return response.json()
        case 401:
            throw new Error("Vous n'êtes pas autorisé à vous connecter")
        case 403:
            throw new Error('Une autre session a été ouverte avec votre compte')
        case 404:
            return null
        case 500:
            return new Error()
        default:
            throw new Error("Vous n'êtes pas autorisé à vous connecter")
    }
}

const getAuthorization = () => ({
    Authorization: 'Bearer ' + localStorage.getItem(PE_TOKEN),
})

const getPayload = () => {
    const token = localStorage.getItem(PE_TOKEN)
    if (token && token !== 'undefined') {
        return token
    }
    return ''
}

export { removeToken, checkAuth, getJson, getAuthorization, getPayload }
