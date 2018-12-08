import moment from 'moment'


const getAuthToken = () => {
    return 'BQDjx7a5vAT4soHfnbOgRLQSDYn9w74_Fg7bKX63ipOF75Rqy_Ts-_N-4v8QdYxOatAT3Wedpfb6Ct7UkONoYgsuXSY--2E5N-P5vBNNbVVntZJt7EDt3zNm8aA8_GkS9Fld_cd4QHW3nsteKu-I8wnEEHyGXcgB5aov9v6Q_QhcjXqRqZux9yxh4OrzuaOawgnXWq_GjII74uVNYiPWQruGaoVDmez0dgPCH8lI9BdulYw_CauAIm-rAcRrTV9Ns0i0LLjrLY5a250akpdi'
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