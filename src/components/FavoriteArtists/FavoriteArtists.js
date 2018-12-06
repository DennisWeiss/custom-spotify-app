import React from "react";
import {AuthTokenContext} from "../../context/context";
import FavoriteArtistsTable from "./FavoriteArtistsTable";
import {getQueryString} from "../../helper/helperfunctions";

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
            offset: 0
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
            <div>
                <FavoriteArtistsTable artists={this.state.artists} authToken={this.props.authToken}/>
            </div>
        )
    }
}

export default FavoriteArtists