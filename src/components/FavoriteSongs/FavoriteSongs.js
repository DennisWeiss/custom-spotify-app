import React from 'react'
import FavoriteSongsTable from './FavoriteSongsTable'
import {getQueryString} from '../../helper/helperfunctions'
import './FavoriteSongs.css'
import {Button, Modal} from 'semantic-ui-react'


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
        songs: [],
        playlistCreatedModalOpen: false
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
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(data => {
                if (data.items != null) {
                    this.setState((prevState, props) => ({
                        songs: data.items.map(mapSong)
                    }))
                }
            })
    }

    createPlaylist() {
        fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': 'Bearer ' + this.props.authToken
            }
        })
            .then(res => res.json())
            .then(user => {
                fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + this.props.authToken
                    },
                    body: JSON.stringify({name: 'My favorite songs'})
                })
                    .then(res => res.json())
                    .then(playlist => {
                        fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
                            method: 'post',
                            headers: {
                                'Authorization': 'Bearer ' + this.props.authToken
                            },
                            body: JSON.stringify({uris: this.state.songs.map(song => song.uri)})
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                this.setState({
                                    playlistCreatedModalOpen: true
                                })
                            })
                    })
            })

    }

    render() {
        return <div className='top-songs-table'>
            <div className='create-playlist'>
                <Button title='Create Playlist' onClick={this.createPlaylist.bind(this)}/>
            </div>
            <FavoriteSongsTable
                songs={this.state.songs}
                handleSorting={() => null}
                sortingColumn={() => null}
                sortingDirection={() => null}/>
            <Modal open={this.state.playlistCreatedModalOpen}>
                <Modal.Content>
                    Playlist created successfully.
                </Modal.Content>
            </Modal>
        </div>
    }
}

export default FavoriteSongs