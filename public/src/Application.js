
import React from 'react';
import ReactDOM from 'react-dom';
import FlickrAPI from './Components/FlickrAPI';


class Application extends React.Component {

    render() {
        return (
            <div className="ui container">
                <PhotoStream/>
            </div>
        )
    }
}


class PhotoStream extends React .Component {

    constructor(props) {
        super(props);
        this.state = {photos: {items: []}};
    }

    componentWillMount() {
        this.fetch(this.props);
    }

    componentWillReceiveProps(props) {
        this.fetch(props);
    }

    fetch(props) {
        FlickrAPI.getPhotos().then((photos) => {
            console.log(photos);
            this.setState({
                photos
            });
        });
    }

    renderPhoto(photo, i) {
        return (
            <div className="photo" key={i}>
                <div className="box">
                    <img src={photo.media.m} />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="photo-stream">
                <h1>Flickr Photo Stream</h1>
                <div className="photos">
                    {this.state.photos.items.map(this.renderPhoto)}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Application/>, document.getElementById('react-mount-point'))