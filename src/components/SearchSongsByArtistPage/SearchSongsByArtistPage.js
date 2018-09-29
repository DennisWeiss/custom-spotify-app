import React from 'react'
import {Search} from 'semantic-ui-react'
import './SearchSongsByArtist.css'


class SearchSongsByArtistPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoadingSearch: false
        }
    }

    selectSearchResult = (e, {result}) => this.setState({artist: result.id})

    handleSearchChange = (e, {value}) => {
        this.setState({isLoading: true})


    }

    render() {
        return (
            <div className='search-songs-by-artist'>
                <Search className='search'
                        loading={this.state.isLoadingSearch}
                        onResultSelect={this.selectSearchResult}
                        onSearchChange={this.handleSearchChange}/>
            </div>
        )
    }
}

export default SearchSongsByArtistPage