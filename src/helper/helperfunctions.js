import moment from 'moment'


const getAuthToken = () => {
    const token_updated = localStorage.getItem('token_updated')
    if (token_updated && moment().subtract(60, 'minutes').isBefore(moment(token_updated))) {
        return localStorage.getItem('auth_token')
    }
}

const setAuthToken = token => {
    localStorage.setItem('auth_token', token)
    localStorage.setItem('token_updated', moment().toISOString())
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