import React, { Component } from 'react';
import "./SearchDescription.scss";

class SearchDescription extends Component {
    render() {
        return (
            <div className="search-description">
                <div className="search-description-title">Will it rain, snow or shine?</div>
                <div className="search-description-subtitle">Enter the date of your planned trip to Brno, to see the most probable weather.</div>
            </div>
        );
    }
}

export default SearchDescription;