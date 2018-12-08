import React from 'react'
import {Table} from "semantic-ui-react";
import {FormattedMessage} from "react-intl";
import moment from "moment";


const ensureHasLeadingZeros = (number, decimalPlaces) => {
    let numberAsString = number.toString();
    return numberAsString.length < decimalPlaces ? Array.from(new Array(decimalPlaces - numberAsString.length), _ => 0).join('') + numberAsString : numberAsString
}

const formatDuration = duration => `${Math.floor(duration / 60000)}:${ensureHasLeadingZeros(Math.floor(duration / 1000) % 60, 2)}`

const FavoriteSongsTable = ({songs, sortingColumn, sortingDirection, handleSorting}) => {

    return (
        <Table sortable celled padded>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                        <FormattedMessage id='RANK'/>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={sortingColumn === 'SONG_TITLE' ? sortingDirection : null}
                        onClick={handleSorting('SONG_TITLE')}>
                        <FormattedMessage id='SONG_TITLE'/>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <FormattedMessage id='ARTISTS'/>
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={sortingColumn === 'ALBUM' ? sortingDirection : null}
                        onClick={handleSorting('ALBUM')}>
                        <FormattedMessage id='ALBUM'/>
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={sortingColumn === 'RELEASE_DATE' ? sortingDirection : null}
                        onClick={handleSorting('RELEASE_DATE')}>
                        <FormattedMessage id='RELEASE_DATE'/>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <FormattedMessage id='PREVIEW'/>
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={sortingColumn === 'DURATION' ? sortingDirection : null}
                        onClick={handleSorting('DURATION')}>
                        <FormattedMessage id='DURATION'/>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {songs.map((song, index) =>
                    <Table.Row key={song.id}>
                        <Table.Cell width={1}>
                            {index + 1}
                        </Table.Cell>
                        <Table.Cell width={1}>
                            {song.images.length > 0 &&
                            <img src={song.images[song.images.length - 1].url} width={48} height={48}/>
                            }
                        </Table.Cell>
                        <Table.Cell width={5}>
                            <a href={song.track_url} target="_blank">{song.name}</a>
                        </Table.Cell>
                        <Table.Cell width={5}>{song.artists.map(artist => artist.name).join(', ')}</Table.Cell>
                        <Table.Cell width={5}>{song.album}</Table.Cell>
                        <Table.Cell width={3}><div className='no-wrap'>{moment(song.release_date).format('ll')}</div></Table.Cell>
                        <Table.Cell width={3}>
                            <audio controls>
                                <source src={song.preview_url}/>
                            </audio>
                        </Table.Cell>
                        <Table.Cell width={2}>{formatDuration(song.duration_ms)}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}
export default FavoriteSongsTable