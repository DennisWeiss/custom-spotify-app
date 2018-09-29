import React from 'react'
import {Table} from 'semantic-ui-react'
import {FormattedMessage} from 'react-intl'
import moment from 'moment'


const SongsTable = ({albums}) => {

    return (
        <Table sortable celled fixed>
            <Table.Header>
                <Table.Row>
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
                        <Table.Cell>{album.name}</Table.Cell>
                        <Table.Cell>{album.artists.map(artist => artist.name).join(', ')}</Table.Cell>
                        <Table.Cell>{moment(album.release_date).format('L')}</Table.Cell>
                        <Table.Cell>{album.uri}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}

export default SongsTable