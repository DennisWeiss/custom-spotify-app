import moment from 'moment'


const getAuthToken = () => {
    return 'BQDxnPD24LIaUT_xm4Z37kB0nFvOIKWYlAMbSisJoXbfSOvYbGwOhfiJU-lvpeRuRy3C2xoYzKpndLSbKU3VRfR2_K9lXyBncO1OVyeZNfY7mUfOVmpC_ZvFNlTGqyffhSMx4sHJoqZT5pFOQ3-ukO5FsTbmfuyqyfi1wxLjwSDfAo5bY0d5HKXzpk32OlRWBJfhZ5Z_yKzmeEt6mBMV7lCa4Gq1TOtFp9DkwVncx1cIFRWb0WhwDRusXNIHlBMyNwNrqtsk65M5zczP4tzY'
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