const getAuthToken = () => localStorage.getItem('auth_token')

const setAuthToken = token => localStorage.setItem('auth_token', token)

const getQueryString = (url, params) => {
    if (Object.keys(params).length === 0) {
        return url
    }
    return url + '?' + Object.keys(params)
        .map(key => key + '=' + encodeURIComponent(params[key]))
        .join('&')
}


export {getAuthToken, setAuthToken, getQueryString}