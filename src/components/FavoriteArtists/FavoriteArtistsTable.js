import React from "react";
import {Progress, Table} from "semantic-ui-react";
import {FormattedMessage, FormattedNumber} from "react-intl";
import './FavoriteArtistsTable.css'



const FavoriteArtistsTable = ({artists}) => {
    return <Table celled padded>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>
                    <FormattedMessage id='RANK'/>
                </Table.HeaderCell>
                <Table.HeaderCell/>
                <Table.HeaderCell>
                    <FormattedMessage id='ARTIST'/>
                </Table.HeaderCell>
                <Table.HeaderCell>
                    <FormattedMessage id='FOLLOWERS'/>
                </Table.HeaderCell>
                <Table.HeaderCell>
                    <FormattedMessage id='POPULARITY'/>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {artists.map((artist, index) =>
                <Table.Row key={artist.id}>
                    <Table.Cell width={1}>{index + 1}</Table.Cell>
                    <Table.Cell width={1}>
                        {
                            artist.images.length > 0 &&
                            <img src={artist.images[artist.images.length - 1].url} width={48} height={48}/>
                        }
                    </Table.Cell>
                    <Table.Cell width={10}><a href={artist.external_urls.spotify} target='_blank'>{artist.name}</a></Table.Cell>
                    <Table.Cell width={6}>
                        <FormattedNumber style='decimal' value={artist.followers.total}/>
                    </Table.Cell>
                    <Table.Cell width={3}>
                        <div className='popularity-indicator-wrapper'>
                            <Progress className='popularity-indicator' color='green' percent={artist.popularity}/>
                        </div>
                    </Table.Cell>
                </Table.Row>
            )}
        </Table.Body>
    </Table>
}

export default FavoriteArtistsTable