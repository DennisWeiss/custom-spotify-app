import React from "react";
import {AuthTokenContext} from "../../context/context";
import FavoriteArtistsTable from "./FavoriteArtistsTable";

const FavoriteArtists = props => {
    return <AuthTokenContext.Consumer>
        {
            authToken =>
                <div>
                    <FavoriteArtistsTable/>
                </div>
        }
    </AuthTokenContext.Consumer>
}

export default FavoriteArtists