'use strict';

import React from 'react';
import FlickrAPI from './Components/FlickrAPI';
import ReactDOM from 'react-dom';
import PhotoStream from './PhotoStream';

// enable react dev-tools
if (typeof window !== 'undefined') {
    window.React = React;
}
class Application extends React.Component {

    render() {
        return (
            <div className="ui container">
                <PhotoStream/>
            </div>
        )
    }
}

ReactDOM.render(<Application/>, document.getElementById('react-mount-point'));