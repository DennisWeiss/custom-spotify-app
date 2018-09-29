import React from 'react'
import {Menu, Container} from 'semantic-ui-react'
import {FormattedMessage} from 'react-intl'
import './MainMenu.css'


const MainMenu = ({activeIndex, onMenuItemClick}) => {
    return (
        <Menu inverted
              fixed='top'
              activeIndex={activeIndex}>
            <Container>
                <Menu.Item header>
                    <i className='spotify-logo fa fa-spotify fa-3x'/>
                    <span className='title'>Custom App for Spotify</span>
                </Menu.Item>
                <Menu.Item index={0} onClick={onMenuItemClick}>
                    <FormattedMessage id='SEARCH_SONGS_BY_ARTIST'/>
                </Menu.Item>
            </Container>
        </Menu>
    )

}

export default MainMenu