import React from 'react';
import {Search} from 'semantic-ui-react';
import './SearchSongsByArtist.css';
import {getQueryString} from '../../helper/helperfunctions';
import {AuthTokenContext} from '../../context/context';
import SongsTable from './SongsTable';
import {FormattedMessage, FormattedNumber} from 'react-intl';


const mapArtist = artist => ({
    followers: artist.followers.total,
    genres: artist.genres,
    id: artist.id,
    images: artist.images,
    name: artist.name,
    popularity: artist.popularity,
    uri: artist.uri
});

class SearchSongsByArtistPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoadingSearch: false,
            searchResults: [],
            albums: []
        };
    }

    selectSearchResult = (result, authToken) => {
        this.setState({artist: result.id});

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
                this.setState({
                    albums: data.items
                });
            });
    };

    handleSearchChange = (value, authToken) => {
        this.setState({isLoading: true});
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
                    });
                }
            });

    };

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
        </div>;

    render() {
        return (
            <AuthTokenContext.Consumer>
                {
                    authToken =>
                        <div className='search-songs-by-artist'>
                            <Search className='search'
                                    loading={this.state.isLoadingSearch}
                                    onResultSelect={(e, {result}) => this.selectSearchResult(result, authToken)}
                                    onSearchChange={(e, {value}) => this.handleSearchChange(value, authToken)}
                                    results={this.state.searchResults}
                                    resultRenderer={this.searchResultRenderer}/>
                            <SongsTable albums={this.state.albums}/>
                        </div>
                }

            </AuthTokenContext.Consumer>
        );
    }
}

export default SearchSongsByArtistPage;