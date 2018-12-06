import React, {Component} from 'react';
import './App.css';
import {IntlProvider} from 'react-intl';
import translations from './helper/translations';
import MainMenu from './components/Menu/MainMenu';
import SearchSongsByArtistPage from './components/SearchSongsByArtistPage/SearchSongsByArtistPage';
import {getAuthToken, setAuthToken} from './helper/helperfunctions';
import SpotifyLogin from './components/SpotifyLogin/SpotifyLogin';
import queryString from './helper/query-string';
import {AuthTokenContext} from './context/context';
import FavoriteArtists from "./components/FavoriteArtists/FavoriteArtists";


class App extends Component {

    constructor(props) {
        super(props);
        const {access_token, expires_in} = queryString.parse(window.location.hash);
        const existing_auth_token = getAuthToken()

        if (access_token != null && existing_auth_token == null) {
            setAuthToken(access_token, expires_in);
        }

        this.state = {
            authToken: existing_auth_token == null ? access_token : null,
            locale: 'en',
            activeMenuIndex: 0
        };
    }

    componentDidMount() {
        const authToken = getAuthToken();
        if (this.state.authToken == null) {
            this.setState({authToken});
        }
    }

    onMainMenuItemClick = (event, data) => this.setState({activeMenuIndex: data.index});

    render() {
        return (
            <IntlProvider locale={this.state.locale} messages={translations[this.state.locale]}>
                <AuthTokenContext.Provider value={this.state.authToken}>
                    <div className='app-wrapper'>
                        <div className="App">
                            <MainMenu activeIndex={this.state.activeMenuIndex}
                                      onMenuItemClick={this.onMainMenuItemClick}/>
                        </div>
                        {
                            !this.state.authToken &&
                            <SpotifyLogin/>
                        }
                        {
                            this.state.authToken && this.state.activeMenuIndex === 0 &&
                            <SearchSongsByArtistPage/>
                        }
                        {
                            this.state.authToken && this.state.activeMenuIndex === 1 &&
                            <FavoriteArtists authToken={this.state.authToken}/>
                        }
                    </div>
                </AuthTokenContext.Provider>
            </IntlProvider>
        );
    }
}

export default App;
