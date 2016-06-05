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
        // main navigation functionality
        $mainNavContainer: $('.main-nav-container'),
        $mainNavTrigger: $('.main-nav-trigger a'),
        mainNavShow: function(){
            this.$mainNavContainer.addClass('animated open');
        },
        mainNavHide: function(){
            this.$mainNavContainer.removeClass('open');
        },
        mainNavResize: function(){
            this.$mainNavContainer.removeClass('animated').height($('.page').height());
        },







        resize: function () {
            this.mainNavResize();
        },

        init: function (){
            var self = this;

            this.$mainNavTrigger.on('click', function(){
                self.mainNavShow();
            });

            this.$mainNavContainer.on('mouseleave', function(){
                self.mainNavHide();
            });

            // window size
            firmBeliefs.properties.windowWidth = $(window).width();
            this.resize();
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