'use strict';

import React from 'react';
import FlickrAPI from './Components/FlickrAPI';
import $ from 'jquery';
import _ from 'underscore';
import common from './Common';
import InfiniteScroll from './Components/InfiniteScroll';

export default class PhotoStream extends React.Component {

    constructor(props) {
        super(props);
        this.state = {photos: [], infiniteScroll: null};
    }

    componentDidMount() {
        var infiniteScroll = new InfiniteScroll('.photo-stream', this.fetch.bind(this));
        infiniteScroll.attach();

        this.setState({
            infiniteScroll
        });
    }

    componentWillMount() {
        this.fetch(this.props);
    }

    componentWillReceiveProps(props) {
        this.fetch(props);
    }

    fetch(props) {
        FlickrAPI.getPhotos().then((photos) => {
            this.setState({
                photos: this.state.photos.concat(photos.items)
            });
        });
    }

    getAuthorName(author) {
        return author.match(/\((.*?)\)$/)[1];
    }

    /**
     *  Format the flickr description so it looks at least a bit made for humans rather than for search engines.
     */
    getDescription(description) {
        return $('<div/>').html(description)
            .text()
            .replace(/^(.*?)posted a photo:/, '')
            .trim();
    }


    renderDescription(description) {
        return (
            <div className="description">
                <span className="label">Description</span>
                {common.strLimit(this.getDescription(description), 100)}
            </div>
        )
    }

    renderTags(tags) {
        return (
            <div className="tags">
                    <span className="label">
                        Tags
                    </span>
                {tags.replace(' ', ', ')}
            </div>
        )
    }

    renderPhoto(photo, i) {
        return (
            <div className="photo" key={i}>
                <img src={photo.media.m} />

                <div className="header">
                    <a href={photo.link} className="title">
                        {common.strLimit(photo.title, 50)}
                    </a>
                    {' by '}
                    <a href={'https://www.flickr.com/people/' + photo.author_id} className="author">
                        {this.getAuthorName(photo.author)}
                    </a>
                </div>

                {this.getDescription(photo.description) ? this.renderDescription(photo.description) : null}

                {photo.tags ? this.renderTags(photo.tags) : null}
            </div>
        )
    }

    render() {
        return (
            <div className="photo-stream">
                <h1>Flickr Photo Stream</h1>
                <div className="photos">
                    {this.state.photos.map(this.renderPhoto.bind(this))}
                </div>
            </div>
        )
    }
}