// JavaScript Document
(function ($, window) {

    var firmBeliefs = {};

    firmBeliefs.properties = {
        windowWidth: '',
        isMobile: false
    };

    firmBeliefs.utils = {
        mobileCheck: function() {
            var rtnVal = false;
            if($('html').hasClass('mobile')){
                rtnVal = true;
            }
            return rtnVal;
        }
    };

    firmBeliefs.navigation = {
        // main navigation
        $mainNavContainer: $('.main-nav-container'),
        $mainNavTriggerOpen: $('.main-nav-trigger-open a'),
        $mainNavTriggerClose: $('.main-nav-trigger-close a', this.$mainNavContainer),

        mainNavShow: function(){
            this.$mainNavContainer.addClass('animated open');
        },

        mainNavHide: function(){
            this.$mainNavContainer.removeClass('open');
        },

        mainNavResize: function(){
            this.$mainNavContainer.removeClass('animated').height($('.page').height());
            this.mainNavHide();
        },

        resize: function () {
            this.mainNavResize();
        },

        init: function(){
            var self = this;

            self.$mainNavTriggerOpen.on('click', function(evt){
                evt.preventDefault();
                self.mainNavShow();
            });

            self.$mainNavTriggerClose.on('click', function(evt){
                evt.preventDefault();
                self.mainNavHide();
            });

            self.$mainNavContainer.on('mouseleave', function(){
                self.mainNavHide();
            });

            self.$mainNavContainer.on('click', function(){
                self.mainNavHide();
            });
        }
    };

    firmBeliefs.environment = {

        resize: function(){

        },

        init: function (){

            // check for mobile
            if (firmBeliefs.utils.mobileCheck()){
                firmBeliefs.properties.isMobile = true;
            }

            // helper for stopping propagation
            $('body').on('click', '.stop-propagation', function(evt){
                evt.stopPropagation();
            });

            // check is scrolled past threshold
            var threshold  = 200;
            $(window).scroll(function(){
                if ($(this).scrollTop() > threshold) {
                    $('.back-to-top').addClass('opaque');
                } else {
                    $('.back-to-top').removeClass('opaque');
                }
            });

            // click event to scroll to top
            $('.back-to-top a').click(function(){
                $('html, body').animate({scrollTop : 0},800);
                return false;
            });

        }
    };

    firmBeliefs.team = {
        $html: $('.our-team'),
        $controls: $('.nav-controls a', this.$html),
        $memberImages: $('.member-image', this.$html),
        $memberDetails: $('.member-detail', this.$html),

        displayMember: function(memberIndex){
            this.$memberImages.removeClass('active');
            this.$memberImages.eq(memberIndex).addClass('active');
            this.$memberDetails.removeClass('active');
            this.$memberDetails.eq(memberIndex).addClass('active');
        },

        init: function(){
            var self = this;
            if(self.$html.length > 0){
                self.$controls.on('click', function (evt) {
                    evt.preventDefault();
                    if(!$(this).hasClass('active')){
                        // make only this link active
                        var index = self.$controls.index($(this));
                        self.displayMember(index);
                        self.$controls.removeClass('active');
                        self.$controls.eq(index).addClass('active');
                    }
                });
            }
        }
    };

    firmBeliefs.news = {
        $proxyHTML: $('#news-filter-by-proxy'),
        $newsFilter: $('#news-filter'),
        init: function(){
            var news = this;
            if(this.$newsFilter.length > 0){
                this.$newsFilter.on('change', function(){
                    var url = $(news.$newsFilter).parent('form').attr('action');
                        url += '?category=' + $(news.$newsFilter).val();
                        location.replace(url);
                });
            }
            if(this.$proxyHTML.length > 0){
                $(this.$proxyHTML).on('click', 'a', function(evt){
                    evt.preventDefault();
                    var selectedCat = $(this).attr('data-value');
                    $(news.$newsFilter).val(selectedCat).change();
                });
            }
        }
    };

    firmBeliefs.homePage = {
        $topLevelContainers: $('.top-level-container'),
        $topLevelNavHtml: $('.top-level-nav'),
        $triggers: $('.trigger', this.$topLevelNavHtml),
        topLevelNavAutoScrollFlag: true,
        topLevelNavAutoDelay: 7000,
        topLevelNavPaused: false,
        topLevelNavAutoScroll: function(){
            var self = this;
            var navTimer = setInterval(function(){
                if(self.topLevelNavAutoScrollFlag){
                    if(!self.topLevelNavPaused){
                        var curActive = self.$topLevelContainers.index($('.active')),
                            total = self.$topLevelContainers.length;
                        curActive++;
                        if(curActive == total){
                            curActive = 0;
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
                self.topLevelNavAutoScrollFlag = false;

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
            if(this.topLevelNavAutoScrollFlag){
                this.topLevelNavAutoScroll();
            }

            // stop image swapping while user might be reading
            self.$topLevelContainers.parents('.hero').on('mouseenter', function(){
                self.topLevelNavPaused = true;
            }).on('mouseleave', function(){
                self.topLevelNavPaused = false;
            });
        }
    };

    firmBeliefs.init = function () {

        var $calendar = $('#calendar');
        if($calendar.length > 0){
            $calendar.dcalendar();
        }
        // all init
        firmBeliefs.environment.init();
        firmBeliefs.navigation.init();
        firmBeliefs.homePage.init();
        firmBeliefs.news.init();
        firmBeliefs.team.init();

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
        firmBeliefs.navigation.resize();
    };

    // main init
    $(document).ready(function () {
        firmBeliefs.init();
    });

}(jQuery, window));