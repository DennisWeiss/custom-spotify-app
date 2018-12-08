import moment from 'moment'


const getAuthToken = () => {
    return 'BQCsy1j0dOeAUMmkE7X9wuXduIErjIa2FL_hCiFANI0IB5l53APGrwohrQuzZSqYgmPwlY_MU3pfu5pREYerWA-i7OGdNgFngZ0fE21rzMjZdniHtJuiNkSaX5m3FZZPZNRBJCEPZDyqb4EBLDE7yo3Vl8jFbsiH-vbbpxtI_-93JwMRxY8_HxlVLRuddrXRE5iWJuS27eiugdA1Aduh9r526W_x1HyKkhvID-KWCn2SA7PhrcOB-KQ5sTjM1QV08JIhBOKg-ZGW8GJaev2h'
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