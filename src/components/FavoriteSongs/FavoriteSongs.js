import React from 'react'
import FavoriteSongsTable from "./FavoriteSongsTable";
import {getQueryString} from "../../helper/helperfunctions";
import './FavoriteSongs.css'


const mapSong = songData => ({
    id: songData.id,
    name: songData.name,
    artists: songData.artists,
    duration_ms: songData.duration_ms,
    explicit: songData.explicit,
    track_url: songData.external_urls.spotify,
    preview_url: songData.preview_url,
    uri: songData.uri,
    images: songData.album.images,
    album: songData.album.name,
    release_date: songData.album.release_date
})

class FavoriteSongs extends React.Component {

    state = {
        songs: []
    }

    componentDidMount() {
        this.fetchFavoriteSongs()
    }

    fetchFavoriteSongs() {
        fetch(getQueryString('https://api.spotify.com/v1/me/top/tracks', {
            limit: 50,
            offset: 0,
            time_range: 'long_term'
        }), {
            headers: {
                'Authorization': 'Bearer ' + this.props.authToken
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.items != null) {
                    this.setState((prevState, props) => ({
                        songs: data.items.map(mapSong)
                    }))
                }
            })
    }

    render() {
        return <div className='top-songs-table'>
            <FavoriteSongsTable
                songs={this.state.songs}
                handleSorting={() => null}
                sortingColumn={() => null}
                sortingDirection={() => null}/>
        </div>
    }
}

export default FavoriteSongs