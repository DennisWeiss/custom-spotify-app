import React from 'react'
import {Table} from 'semantic-ui-react'
import {FormattedMessage} from 'react-intl'
import moment from 'moment'
import './SongsTable.css'


const ensureHasLeadingZeros = (number, decimalPlaces) => {
    let numberAsString = number.toString();
    return numberAsString.length < decimalPlaces ? Array.from(new Array(decimalPlaces - numberAsString.length), _ => 0).join('') + numberAsString : numberAsString
}

const formatDuration = duration => `${Math.floor(duration / 60000)}:${ensureHasLeadingZeros(Math.floor(duration / 1000) % 60, 2)}`

const SongsTable = ({songs}) => {

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
                        <FormattedMessage id='ALBUM'/>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <FormattedMessage id='RELEASE_DATE'/>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <FormattedMessage id='PREVIEW'/>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <FormattedMessage id='DURATION'/>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {songs.map(song =>
                    <Table.Row key={song.id}>
                        <Table.Cell>
                            {song.images.length > 0 &&
                                <img src={song.images[song.images.length - 1].url} width={48} height={48}/>
                            }
                        </Table.Cell>
                        <Table.Cell><a href={song.track_url} target="_blank">{song.name}</a></Table.Cell>
                        <Table.Cell>{song.artists.map(artist => artist.name).join(', ')}</Table.Cell>
                        <Table.Cell>{song.album}</Table.Cell>
                        <Table.Cell><div className='no-wrap'>{moment(song.release_date).format('ll')}</div></Table.Cell>
                        <Table.Cell>
                            <audio controls>
                                <source src={song.preview_url}/>
                            </audio>
                        </Table.Cell>
                        <Table.Cell>{formatDuration(song.duration_ms)}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}

export default SongsTable