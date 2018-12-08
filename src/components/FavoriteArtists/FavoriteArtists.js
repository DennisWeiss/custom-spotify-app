import React from "react";
import {AuthTokenContext} from "../../context/context";
import FavoriteArtistsTable from "./FavoriteArtistsTable";
import {getQueryString} from "../../helper/helperfunctions";
import './FavoriteArtists.css'

class FavoriteArtists extends React.Component {

    state = {
        artists: []
    }

    componentDidMount() {
        this.fetchArtists()
    }

    fetchArtists() {
        fetch(getQueryString('https://api.spotify.com/v1/me/top/artists', {
            limit: 50,
            offset: 0,
            time_range: 'long_term'
        }), {
            headers: {
                'Authorization': 'Bearer ' + this.props.authToken
            }
        })
            .then(res => res.json())
            .then(artists => this.setState((prevState, props) => ({
                artists: artists.items
            })))
    }

    render() {
        return (
            <div className="top-artist-page">
                <div className='top-artists-table'>
                    <FavoriteArtistsTable artists={this.state.artists} authToken={this.props.authToken}/>
                </div>
            </div>
        )
    }
}

export default FavoriteArtists