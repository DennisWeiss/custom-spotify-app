import moment from 'moment'


const getAuthToken = () => {
    // return 'BQDH2SKizWa-D9paj61OzvfOUnlbc8HIZO_A4UCQ7pkKH4-8YSlbnqhmczVILbPM5TwbZGLpC-Jc1ovUivA36keJbpE5d0KirhS_5UYN05YgpK59okMuYb5jTUrDy1yGKbBqKa1pIGJel_2uyGdpBiqSN3MUBB-p_nLma3dzB7ZUKk8ha4jkePjwMJ9wsgX-qDHxOkvHlwgcpcsGJ8MI-BjtaRxogMKIW_CH3Da0ofV_stEj0qNjADTEII5AmZaRZKso3HuHdVZPNfszWwcw'
    const token_updated = localStorage.getItem('token_updated')
    const expires_in = localStorage.getItem('expires_in')
    if (token_updated && moment().subtract(parseInt(expires_in, 10), 'seconds').isBefore(moment(token_updated))) {
        return localStorage.getItem('auth_token')
    }
    ['auth_token', 'token_udpated', 'expires_in'].forEach(key => localStorage.removeItem(key))
}

const setAuthToken = (token, expires_in) => {
    localStorage.setItem('auth_token', token)
    localStorage.setItem('token_updated', moment().toISOString())
    localStorage.setItem('expires_in', expires_in)
}

const getQueryString = (url, params) => {
    if (Object.keys(params).length === 0) {
        return url
    }
    return url + '?' + Object.keys(params)
        .map(key => key + '=' + encodeURIComponent(params[key]))
        .join('&')
}


export {getAuthToken, setAuthToken, getQueryString}