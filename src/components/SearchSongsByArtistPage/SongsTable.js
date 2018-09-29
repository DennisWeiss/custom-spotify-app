import React from 'react'
import {Table} from 'semantic-ui-react'
import {FormattedMessage} from 'react-intl'
import moment from 'moment'


const SongsTable = ({albums}) => {

    return (
        <Table sortable celled padded>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <FormattedMessage id='SONG_TITLE'/>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <FormattedMessage id='ARTISTS'/>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <FormattedMessage id='RELEASE_DATE'/>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <FormattedMessage id='LISTEN'/>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {albums.map(album =>
                    <Table.Row key={album.id}>
                        <Table.Cell>
                            {album.images.length > 0 &&
                                <img src={album.images[album.images.length - 1].url} width={48} height={48}/>
                            }
                        </Table.Cell>
                        <Table.Cell>{album.name}</Table.Cell>
                        <Table.Cell>{album.artists.map(artist => artist.name).join(', ')}</Table.Cell>
                        <Table.Cell>{moment(album.release_date).format('ll')}</Table.Cell>
                        <Table.Cell><a href={album.external_urls.spotify} target="_blank"><FormattedMessage id='OPEN_IN_BROWSER'/></a> <a href={album.uri}><FormattedMessage id='OPEN_IN_SPOTIFY'/></a></Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}

export default SongsTable