'use strict';

import $ from 'jquery';

export default class InfiniteScroll {

    constructor(selector, callback) {
        this.selector = selector;
        this.callback = callback;
    }

    attach() {
        var scroll = this;
        $(window).on('scroll', function() {
            var bottomView = $(this).scrollTop()+$(window).height();
            var elementPoint = $(scroll.selector).offset().top + $(scroll.selector).innerHeight() * 0.80;
            if (bottomView > elementPoint) {
                scroll.callback();
            }
        })
    }

    detach() {
        // @todo, lazy, too lazy.
    }
}