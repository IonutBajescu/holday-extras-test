'use strict';

export default class Common {
    static strLimit(string, limit) {
        if (string.length > limit) {
            string = string.substr(0, limit) + '...';
        }

        return string;
    }
}