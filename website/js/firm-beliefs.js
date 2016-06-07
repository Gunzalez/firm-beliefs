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

            this.$mainNavTrigger.on('click', function(evt){
                evt.preventDefault();
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
        topLevelNavAutoScroll: true,
        topLevelNavAutoDelay: 7000,
        topLevelNavPaused: false,

        autoScroll: function(){
            var self = this;
            var navTimer = setInterval(function(){
                if(self.topLevelNavAutoScroll){
                    if(!self.topLevelNavPaused){
                        var curActive = self.$topLevelContainers.index($('.active')),
                            total = self.$topLevelContainers.length;
                        curActive++;
                        if(curActive == total){
                            curActive = 0
                        }
                        $('li', self.$topLevelNavHtml).removeClass('active');
                        $('li', self.$topLevelNavHtml).eq(curActive).addClass('active');
                        self.$topLevelContainers.removeClass('active');
                        self.$topLevelContainers.eq(curActive).addClass('active');
                    }
                } else {
                    clearInterval(navTimer);
                }
            }, this.topLevelNavAutoDelay);
        },

        init: function(){
            var self = this;

            // attach show/hide actions to triggers
            this.$triggers.on('click', function(){
                self.topLevelNavAutoScroll = false;

                // highlight this element
                var $listEl = $(this).parents('li');
                $('li', self.$topLevelNavHtml).removeClass('active');
                $listEl.addClass('active');

                // change corresponding image
                self.$topLevelContainers.removeClass('active');
                var index = $('li', self.$topLevelNavHtml).index($listEl);
                self.$topLevelContainers.eq(index).addClass('active');
            });

            // starts auto scroll is set to true
            if(this.topLevelNavAutoScroll){
                this.autoScroll();
            }

            // stop image swapping while user might be reading
            self.$topLevelContainers.parents('.hero').on('mouseenter', function(){
                self.topLevelNavPaused = true;
            }).on('mouseleave', function(){
                self.topLevelNavPaused = false;
            })
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