import React from 'react'
import {Search} from 'semantic-ui-react'
import './SearchSongsByArtist.css'
import {getQueryString} from '../../helper/helperfunctions'
import {AuthTokenContext} from '../../context/context'
import SongsTable from './SongsTable'
import {FormattedMessage, FormattedNumber} from 'react-intl'
import moment from 'moment'


const mapArtist = artist => ({
    followers: artist.followers.total,
    genres: artist.genres,
    id: artist.id,
    images: artist.images,
    name: artist.name,
    popularity: artist.popularity,
    uri: artist.uri
})

const mapTrack = (trackData, albumData) => ({
    id: trackData.id,
    name: trackData.name,
    artists: trackData.artists,
    duration_ms: trackData.duration_ms,
    explicit: trackData.explicit,
    track_url: trackData.external_urls.spotify,
    preview_url: trackData.preview_url,
    uri: trackData.uri,
    images: albumData.images,
    album: albumData.name,
    release_date: albumData.release_date
})

const columnComparator = clickedColumn => {
    switch (clickedColumn) {
        case 'SONG_TITLE':
            return (a, b) => {
                if (a.name < b.name) {
                    return -1
                }
                if (a.name > b.name) {
                    return 1
                }
                return 0
            }
        case 'ALBUM':
            return (a, b) => {
                if (a.album < b.album) {
                    return -1
                }
                if (a.album > b.album) {
                    return 1
                }
                return 0
            }
        case 'DURATION':
            return (a, b) => a.duration_ms - b.duration_ms
        case 'RELEASE_DATE':
            return (a, b) => a.release_date && b.release_date ? moment(a.release_date).unix() - moment(b.release_date).unix() : 0
        default:
            return (a, b) => 0
    }
}

class SearchSongsByArtistPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoadingSearch: false,
            searchValue: '',
            searchResults: [],
            songs: [],
            sortingColumn: 'RELEASE_DATE',
            sortingDirection: 'descending'
        }
    }

    selectSearchResult = (result, authToken) => {
        this.setState({
            searchValue: result.name,
            artist: result.id,
            songs: []
        }, () => {
            fetch(getQueryString(`https://api.spotify.com/v1/artists/${result.id}/albums`, {
                limit: 50,
                offset: 0
            }), {
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
            })
                .then(res => res.json())
                .then(data => {
                    const promises = []

                    data.items.forEach(album => {
                        promises.push(fetch(`${album.href}/tracks`, {
                            headers: {
                                'Authorization': 'Bearer ' + authToken
                            }
                        })
                            .then(res => res.json())
                            .then(data => data.items.map(trackData => mapTrack(trackData, album)))
                            .then(tracks => new Promise(resolve => resolve(tracks.filter(track =>
                                track.artists.find(artist => artist.id === result.id) != null
                            )))))
                    })

                    Promise.all(promises)
                        .then(trackData => {
                            this.setState({
                                songs: trackData
                                    .reduce((accSongs, trackData) => accSongs.concat(trackData))
                                    .sort((a, b) => a.release_date && b.release_date ? moment(b.release_date).unix() - moment(a.release_date).unix() : 0)
                            })
                        })
                })
        })


    }

    handleSearchChange = (value, authToken) => {
        this.setState({
            isLoading: true,
            searchValue: value
        })
        fetch(getQueryString('https://api.spotify.com/v1/search', {
            q: value,
            type: 'artist',
            limit: 10,
            offset: 0
        }), {
            headers: {
                'Authorization': 'Bearer ' + authToken
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.artists != null) {
                    this.setState({
                        searchResults: data.artists.items.map(mapArtist)
                    })
                }
            })

    }

    handleSorting = clickedColumn => () => {
        if (this.state.sortingColumn !== clickedColumn) {
            this.setState({
                sortingColumn: clickedColumn,
                songs: this.state.songs.sort(columnComparator(clickedColumn)),
                sortingDirection: 'ascending',
            })
        } else if (this.state.sortingDirection === 'ascending') {
            this.setState({
                songs: this.state.songs.reverse(),
                sortingDirection: this.state.sortingDirection === 'ascending' ? 'descending' : 'ascending',
            })
        } else if (this.state.sortingDirection === 'descending') {
            this.setState({
                sortingColumn: null,
                sortingDirection: null
            })
        }
    }

    searchResultRenderer = item =>
        <div className='instant-search-cell'>
            {item.images.length > 0 &&
            <div className='instant-search-cell-content'><img src={item.images[item.images.length - 1].url} width={32}
                                                              height={32}/></div>
            }
            <div className='instant-search-cell-content'>
                <div>{item.name}</div>
                <div><FormattedNumber value={item.followers}/></div>
            </div>
        </div>

    render() {
        return (
            <AuthTokenContext.Consumer>
                {
                    authToken =>
                        <div className='search-songs-by-artist'>
                            <Search className='search'
                                    loading={this.state.isLoadingSearch}
                                    value={this.state.searchValue}
                                    onResultSelect={(e, {result}) => this.selectSearchResult(result, authToken)}
                                    onSearchChange={(e, {value}) => this.handleSearchChange(value, authToken)}
                                    results={this.state.searchResults}
                                    resultRenderer={this.searchResultRenderer}/>
                            <div className='results-table'>
                                <SongsTable songs={this.state.songs}
                                            sortingColumn={this.state.sortingColumn}
                                            sortingDirection={this.state.sortingDirection}
                                            handleSorting={this.handleSorting}/>
                            </div>
                        </div>
                }

            </AuthTokenContext.Consumer>
        )
    }
}

export default SearchSongsByArtistPage