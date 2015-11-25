
import $ from 'jquery';
import q from 'q';
import _ from 'underscore';

/**
 * Flickr API Consumer
 */
export default class FlickrAPI {

    static call(resource, params) {

        var deferred = q.defer();

        var callback_name = _.uniqueId('flickrCallback');
        global[callback_name] = deferred.resolve;

        params = _.isUndefined(params) ? {} : params;
        $.ajax({
            url: 'https://api.flickr.com/services/' + resource,
            jsonp: false,
            dataType: "jsonp",
            data: _.defaults(params, {
                jsoncallback: callback_name,
                format: 'json'
            }),
            error: deferred.reject
        });

        return deferred.promise;
    }

    static getPhotos() {
        return this.call('feeds/photos_public.gne');
    }
}