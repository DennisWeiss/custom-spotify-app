import React from 'react'
import {FormattedMessage} from 'react-intl'
import './SpotifyLogin.css'
import {getQueryString} from '../../helper/helperfunctions'
import {spotifyClientId, redirectUri} from '../configuration/configuration'

const redirectUserToAuthentication = () => {
    window.location.href = getQueryString('https://accounts.spotify.com/authorize', {
        client_id: spotifyClientId,
        redirect_uri: redirectUri,
        response_type: 'token'
    })
}

const SpotifyLogin = props => {
    return <div className='spotify-login-wrapper'>
            <button className='spotify-login' onClick={redirectUserToAuthentication}>
                <FormattedMessage id='LOGIN_WITH_SPOTIFY'/>
            </button>
    </div>
}

export default SpotifyLogin