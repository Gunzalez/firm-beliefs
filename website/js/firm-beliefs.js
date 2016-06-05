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

    firmBeliefs.homePage = {
        $topLevelContainers: $('.top-level-container'),
        $topLevelNavHtml: $('.top-level-nav'),
        $triggers: $('.trigger', this.$topLevelNavHtml),
        init: function(){
            var self = this;
            this.$triggers.on('click', function(){

                // highlight this row
                var $listEl = $(this).parents('li');
                $('li', self.$topLevelNavHtml).removeClass('active');
                $listEl.addClass('active');
                self.$topLevelContainers.removeClass('active');

                // change corresponding image
                var index = $('li', self.$topLevelNavHtml).index($listEl);
                self.$topLevelContainers.eq(index).addClass('active');
            });
        }
    };

    firmBeliefs.init = function () {

        // all init
        firmBeliefs.environment.init();
        firmBeliefs.homePage.init();

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