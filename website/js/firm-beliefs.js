// JavaScript Document
(function ($, window) {

    var firmBeliefs = {};

    firmBeliefs.properties = {
        windowWidth: '',
        isMobile: false,
        isDesktop: false
    };

    firmBeliefs.utils = {

    };

    firmBeliefs.environment = {
        resize: function () {

        },

        init: function () {
            var self = firmBeliefs;

            // window size
            self.properties.windowWidth = $(window).width();
        }
    };

    firmBeliefs.init = function () {

        // all init
        firmBeliefs.environment.init();

        // resize triggers
        $(window).on('resize', function () {

            var newWidth = $(window).width(),
                    oldWidth = firmBeliefs.properties.windowWidth;

            if (oldWidth != newWidth) {
                firmBeliefs.properties.windowWidth = newWidth;
                firmBeliefs.resize();
            }
        });

        firmBeliefs.resize();
        $(window).trigger('resize');
    };

    // main resize
    firmBeliefs.resize = function () {
        firmBeliefs.environment.resize();
    };

    // main init
    $(document).ready(function () {
        firmBeliefs.init();
    });

}(jQuery, window));