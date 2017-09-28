(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./app.js');

},{"./app.js":2}],2:[function(require,module,exports){

/*! Stellar.js v0.6.2 | Copyright 2013, Mark Dalgleish | http://markdalgleish.com/projects/stellar.js | http://markdalgleish.mit-license.org */
(function(e,t,n,r){function d(t,n){this.element=t,this.options=e.extend({},s,n),this._defaults=s,this._name=i,this.init()}var i="stellar",s={scrollProperty:"scroll",positionProperty:"position",horizontalScrolling:!0,verticalScrolling:!0,horizontalOffset:0,verticalOffset:0,responsive:!1,parallaxBackgrounds:!0,parallaxElements:!0,hideDistantElements:!0,hideElement:function(e){e.hide()},showElement:function(e){e.show()}},o={scroll:{getLeft:function(e){return e.scrollLeft()},setLeft:function(e,t){e.scrollLeft(t)},getTop:function(e){return e.scrollTop()},setTop:function(e,t){e.scrollTop(t)}},position:{getLeft:function(e){return parseInt(e.css("left"),10)*-1},getTop:function(e){return parseInt(e.css("top"),10)*-1}},margin:{getLeft:function(e){return parseInt(e.css("margin-left"),10)*-1},getTop:function(e){return parseInt(e.css("margin-top"),10)*-1}},transform:{getLeft:function(e){var t=getComputedStyle(e[0])[f];return t!=="none"?parseInt(t.match(/(-?[0-9]+)/g)[4],10)*-1:0},getTop:function(e){var t=getComputedStyle(e[0])[f];return t!=="none"?parseInt(t.match(/(-?[0-9]+)/g)[5],10)*-1:0}}},u={position:{setLeft:function(e,t){e.css("left",t)},setTop:function(e,t){e.css("top",t)}},transform:{setPosition:function(e,t,n,r,i){e[0].style[f]="translate3d("+(t-n)+"px, "+(r-i)+"px, 0)"}}},a=function(){var t=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,n=e("script")[0].style,r="",i;for(i in n)if(t.test(i)){r=i.match(t)[0];break}return"WebkitOpacity"in n&&(r="Webkit"),"KhtmlOpacity"in n&&(r="Khtml"),function(e){return r+(r.length>0?e.charAt(0).toUpperCase()+e.slice(1):e)}}(),f=a("transform"),l=e("<div />",{style:"background:#fff"}).css("background-position-x")!==r,c=l?function(e,t,n){e.css({"background-position-x":t,"background-position-y":n})}:function(e,t,n){e.css("background-position",t+" "+n)},h=l?function(e){return[e.css("background-position-x"),e.css("background-position-y")]}:function(e){return e.css("background-position").split(" ")},p=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,1e3/60)};d.prototype={init:function(){this.options.name=i+"_"+Math.floor(Math.random()*1e9),this._defineElements(),this._defineGetters(),this._defineSetters(),this._handleWindowLoadAndResize(),this._detectViewport(),this.refresh({firstLoad:!0}),this.options.scrollProperty==="scroll"?this._handleScrollEvent():this._startAnimationLoop()},_defineElements:function(){this.element===n.body&&(this.element=t),this.$scrollElement=e(this.element),this.$element=this.element===t?e("body"):this.$scrollElement,this.$viewportElement=this.options.viewportElement!==r?e(this.options.viewportElement):this.$scrollElement[0]===t||this.options.scrollProperty==="scroll"?this.$scrollElement:this.$scrollElement.parent()},_defineGetters:function(){var e=this,t=o[e.options.scrollProperty];this._getScrollLeft=function(){return t.getLeft(e.$scrollElement)},this._getScrollTop=function(){return t.getTop(e.$scrollElement)}},_defineSetters:function(){var t=this,n=o[t.options.scrollProperty],r=u[t.options.positionProperty],i=n.setLeft,s=n.setTop;this._setScrollLeft=typeof i=="function"?function(e){i(t.$scrollElement,e)}:e.noop,this._setScrollTop=typeof s=="function"?function(e){s(t.$scrollElement,e)}:e.noop,this._setPosition=r.setPosition||function(e,n,i,s,o){t.options.horizontalScrolling&&r.setLeft(e,n,i),t.options.verticalScrolling&&r.setTop(e,s,o)}},_handleWindowLoadAndResize:function(){var n=this,r=e(t);n.options.responsive&&r.bind("load."+this.name,function(){n.refresh()}),r.bind("resize."+this.name,function(){n._detectViewport(),n.options.responsive&&n.refresh()})},refresh:function(n){var r=this,i=r._getScrollLeft(),s=r._getScrollTop();(!n||!n.firstLoad)&&this._reset(),this._setScrollLeft(0),this._setScrollTop(0),this._setOffsets(),this._findParticles(),this._findBackgrounds(),n&&n.firstLoad&&/WebKit/.test(navigator.userAgent)&&e(t).load(function(){var e=r._getScrollLeft(),t=r._getScrollTop();r._setScrollLeft(e+1),r._setScrollTop(t+1),r._setScrollLeft(e),r._setScrollTop(t)}),this._setScrollLeft(i),this._setScrollTop(s)},_detectViewport:function(){var e=this.$viewportElement.offset(),t=e!==null&&e!==r;this.viewportWidth=this.$viewportElement.width(),this.viewportHeight=this.$viewportElement.height(),this.viewportOffsetTop=t?e.top:0,this.viewportOffsetLeft=t?e.left:0},_findParticles:function(){var t=this,n=this._getScrollLeft(),i=this._getScrollTop();if(this.particles!==r)for(var s=this.particles.length-1;s>=0;s--)this.particles[s].$element.data("stellar-elementIsActive",r);this.particles=[];if(!this.options.parallaxElements)return;this.$element.find("[data-stellar-ratio]").each(function(n){var i=e(this),s,o,u,a,f,l,c,h,p,d=0,v=0,m=0,g=0;if(!i.data("stellar-elementIsActive"))i.data("stellar-elementIsActive",this);else if(i.data("stellar-elementIsActive")!==this)return;t.options.showElement(i),i.data("stellar-startingLeft")?(i.css("left",i.data("stellar-startingLeft")),i.css("top",i.data("stellar-startingTop"))):(i.data("stellar-startingLeft",i.css("left")),i.data("stellar-startingTop",i.css("top"))),u=i.position().left,a=i.position().top,f=i.css("margin-left")==="auto"?0:parseInt(i.css("margin-left"),10),l=i.css("margin-top")==="auto"?0:parseInt(i.css("margin-top"),10),h=i.offset().left-f,p=i.offset().top-l,i.parents().each(function(){var t=e(this);if(t.data("stellar-offset-parent")===!0)return d=m,v=g,c=t,!1;m+=t.position().left,g+=t.position().top}),s=i.data("stellar-horizontal-offset")!==r?i.data("stellar-horizontal-offset"):c!==r&&c.data("stellar-horizontal-offset")!==r?c.data("stellar-horizontal-offset"):t.horizontalOffset,o=i.data("stellar-vertical-offset")!==r?i.data("stellar-vertical-offset"):c!==r&&c.data("stellar-vertical-offset")!==r?c.data("stellar-vertical-offset"):t.verticalOffset,t.particles.push({$element:i,$offsetParent:c,isFixed:i.css("position")==="fixed",horizontalOffset:s,verticalOffset:o,startingPositionLeft:u,startingPositionTop:a,startingOffsetLeft:h,startingOffsetTop:p,parentOffsetLeft:d,parentOffsetTop:v,stellarRatio:i.data("stellar-ratio")!==r?i.data("stellar-ratio"):1,width:i.outerWidth(!0),height:i.outerHeight(!0),isHidden:!1})})},_findBackgrounds:function(){var t=this,n=this._getScrollLeft(),i=this._getScrollTop(),s;this.backgrounds=[];if(!this.options.parallaxBackgrounds)return;s=this.$element.find("[data-stellar-background-ratio]"),this.$element.data("stellar-background-ratio")&&(s=s.add(this.$element)),s.each(function(){var s=e(this),o=h(s),u,a,f,l,p,d,v,m,g,y=0,b=0,w=0,E=0;if(!s.data("stellar-backgroundIsActive"))s.data("stellar-backgroundIsActive",this);else if(s.data("stellar-backgroundIsActive")!==this)return;s.data("stellar-backgroundStartingLeft")?c(s,s.data("stellar-backgroundStartingLeft"),s.data("stellar-backgroundStartingTop")):(s.data("stellar-backgroundStartingLeft",o[0]),s.data("stellar-backgroundStartingTop",o[1])),p=s.css("margin-left")==="auto"?0:parseInt(s.css("margin-left"),10),d=s.css("margin-top")==="auto"?0:parseInt(s.css("margin-top"),10),v=s.offset().left-p-n,m=s.offset().top-d-i,s.parents().each(function(){var t=e(this);if(t.data("stellar-offset-parent")===!0)return y=w,b=E,g=t,!1;w+=t.position().left,E+=t.position().top}),u=s.data("stellar-horizontal-offset")!==r?s.data("stellar-horizontal-offset"):g!==r&&g.data("stellar-horizontal-offset")!==r?g.data("stellar-horizontal-offset"):t.horizontalOffset,a=s.data("stellar-vertical-offset")!==r?s.data("stellar-vertical-offset"):g!==r&&g.data("stellar-vertical-offset")!==r?g.data("stellar-vertical-offset"):t.verticalOffset,t.backgrounds.push({$element:s,$offsetParent:g,isFixed:s.css("background-attachment")==="fixed",horizontalOffset:u,verticalOffset:a,startingValueLeft:o[0],startingValueTop:o[1],startingBackgroundPositionLeft:isNaN(parseInt(o[0],10))?0:parseInt(o[0],10),startingBackgroundPositionTop:isNaN(parseInt(o[1],10))?0:parseInt(o[1],10),startingPositionLeft:s.position().left,startingPositionTop:s.position().top,startingOffsetLeft:v,startingOffsetTop:m,parentOffsetLeft:y,parentOffsetTop:b,stellarRatio:s.data("stellar-background-ratio")===r?1:s.data("stellar-background-ratio")})})},_reset:function(){var e,t,n,r,i;for(i=this.particles.length-1;i>=0;i--)e=this.particles[i],t=e.$element.data("stellar-startingLeft"),n=e.$element.data("stellar-startingTop"),this._setPosition(e.$element,t,t,n,n),this.options.showElement(e.$element),e.$element.data("stellar-startingLeft",null).data("stellar-elementIsActive",null).data("stellar-backgroundIsActive",null);for(i=this.backgrounds.length-1;i>=0;i--)r=this.backgrounds[i],r.$element.data("stellar-backgroundStartingLeft",null).data("stellar-backgroundStartingTop",null),c(r.$element,r.startingValueLeft,r.startingValueTop)},destroy:function(){this._reset(),this.$scrollElement.unbind("resize."+this.name).unbind("scroll."+this.name),this._animationLoop=e.noop,e(t).unbind("load."+this.name).unbind("resize."+this.name)},_setOffsets:function(){var n=this,r=e(t);r.unbind("resize.horizontal-"+this.name).unbind("resize.vertical-"+this.name),typeof this.options.horizontalOffset=="function"?(this.horizontalOffset=this.options.horizontalOffset(),r.bind("resize.horizontal-"+this.name,function(){n.horizontalOffset=n.options.horizontalOffset()})):this.horizontalOffset=this.options.horizontalOffset,typeof this.options.verticalOffset=="function"?(this.verticalOffset=this.options.verticalOffset(),r.bind("resize.vertical-"+this.name,function(){n.verticalOffset=n.options.verticalOffset()})):this.verticalOffset=this.options.verticalOffset},_repositionElements:function(){var e=this._getScrollLeft(),t=this._getScrollTop(),n,r,i,s,o,u,a,f=!0,l=!0,h,p,d,v,m;if(this.currentScrollLeft===e&&this.currentScrollTop===t&&this.currentWidth===this.viewportWidth&&this.currentHeight===this.viewportHeight)return;this.currentScrollLeft=e,this.currentScrollTop=t,this.currentWidth=this.viewportWidth,this.currentHeight=this.viewportHeight;for(m=this.particles.length-1;m>=0;m--)i=this.particles[m],s=i.isFixed?1:0,this.options.horizontalScrolling?(h=(e+i.horizontalOffset+this.viewportOffsetLeft+i.startingPositionLeft-i.startingOffsetLeft+i.parentOffsetLeft)*-(i.stellarRatio+s-1)+i.startingPositionLeft,d=h-i.startingPositionLeft+i.startingOffsetLeft):(h=i.startingPositionLeft,d=i.startingOffsetLeft),this.options.verticalScrolling?(p=(t+i.verticalOffset+this.viewportOffsetTop+i.startingPositionTop-i.startingOffsetTop+i.parentOffsetTop)*-(i.stellarRatio+s-1)+i.startingPositionTop,v=p-i.startingPositionTop+i.startingOffsetTop):(p=i.startingPositionTop,v=i.startingOffsetTop),this.options.hideDistantElements&&(l=!this.options.horizontalScrolling||d+i.width>(i.isFixed?0:e)&&d<(i.isFixed?0:e)+this.viewportWidth+this.viewportOffsetLeft,f=!this.options.verticalScrolling||v+i.height>(i.isFixed?0:t)&&v<(i.isFixed?0:t)+this.viewportHeight+this.viewportOffsetTop),l&&f?(i.isHidden&&(this.options.showElement(i.$element),i.isHidden=!1),this._setPosition(i.$element,h,i.startingPositionLeft,p,i.startingPositionTop)):i.isHidden||(this.options.hideElement(i.$element),i.isHidden=!0);for(m=this.backgrounds.length-1;m>=0;m--)o=this.backgrounds[m],s=o.isFixed?0:1,u=this.options.horizontalScrolling?(e+o.horizontalOffset-this.viewportOffsetLeft-o.startingOffsetLeft+o.parentOffsetLeft-o.startingBackgroundPositionLeft)*(s-o.stellarRatio)+"px":o.startingValueLeft,a=this.options.verticalScrolling?(t+o.verticalOffset-this.viewportOffsetTop-o.startingOffsetTop+o.parentOffsetTop-o.startingBackgroundPositionTop)*(s-o.stellarRatio)+"px":o.startingValueTop,c(o.$element,u,a)},_handleScrollEvent:function(){var e=this,t=!1,n=function(){e._repositionElements(),t=!1},r=function(){t||(p(n),t=!0)};this.$scrollElement.bind("scroll."+this.name,r),r()},_startAnimationLoop:function(){var e=this;this._animationLoop=function(){p(e._animationLoop),e._repositionElements()},this._animationLoop()}},e.fn[i]=function(t){var n=arguments;if(t===r||typeof t=="object")return this.each(function(){e.data(this,"plugin_"+i)||e.data(this,"plugin_"+i,new d(this,t))});if(typeof t=="string"&&t[0]!=="_"&&t!=="init")return this.each(function(){var r=e.data(this,"plugin_"+i);r instanceof d&&typeof r[t]=="function"&&r[t].apply(r,Array.prototype.slice.call(n,1)),t==="destroy"&&e.data(this,"plugin_"+i,null)})},e[i]=function(n){var r=e(t);return r.stellar.apply(r,Array.prototype.slice.call(arguments,0))},e[i].scrollProperty=o,e[i].positionProperty=u,t.Stellar=d})(jQuery,this,document);
/*
* ----------------------------------------------------------------------------------------
Author       : Mannat Themes
Template Name: Ultra - Responsive Resume & CV Template
Version      : 1.0
* ----------------------------------------------------------------------------------------
*/
/**
 * Main Application Js 
 */ 
 
(function() {
    // Page module - helps to manage all the pages and navigation
    var Page = (function() {
        
        
        var config = {
                $bookBlock : $( '#bb-bookblock' ),
                $navNext : $( '.bb-nav-next' ),
                $navPrev : $( '.bb-nav-prev' ),
                $skillWidgets: $('.skill-circle'),
        },
        menuConfig = {
            $menuItems: $("#menu li a"),
            $aboutMenuItem: $("#aboutme"),
            $navbarToggleButton : $('.navbar-toggle:visible'),
            $navbarDropdownMenu: $("#nav-top"),
        },
        init = function() {
                 
                config.$bookBlock.bookblock( {
                    speed : 1000,
                    shadowSides : 0.8,
                    shadowFlip : 0.4,
                    onEndFlip : function(old, page, isLimit) {
                        current = page;
                        // Add more animate css classes, if you are using other classes.
                        $("#page-"+page+" .animateFadeInLeft").addClass('animated fadeInLeft').show();
                        $("#page-"+page+" .animateFadeInRight").addClass('animated fadeInRight').show();
                        $("#page-"+page+" .animateFadeInUp").addClass('animated fadeInUp').show();
                        $("#page-"+page+" .animateFadeInDown").addClass('animated fadeInDown').show();
                        $("#page-"+page+" .animateFlipInX").addClass('animated flipInX').show();
                        $("#page-"+page+" .animateFlipInY").addClass('animated flipInY').show();
                        $("#page-"+page+" .animateBounceInLeft").addClass('animated bounceInLeft').show();
                        $("#page-"+page+" .animateBounceInRight").addClass('animated bounceInRight').show();
                        setTimeout(function() {
                            $("#page-"+page+" .animateFadeInLeft").removeClass("animateFadeInLeft").removeClass("animated fadeInLeft");
                            $("#page-"+page+" .animateFadeInRight").removeClass("animateFadeInRight").removeClass("animated fadeInRight");
                            $("#page-"+page+" .animateFadeInUp").removeClass("animateFadeInUp").removeClass("animated fadeInUp");
                            $("#page-"+page+" .animateFadeInDown").removeClass("animateFadeInDown").removeClass("animated fadeInDown");
                            $("#page-"+page+" .animateFlipInX").removeClass("animateFlipInX").removeClass("animated flipInX");
                            $("#page-"+page+" .animateFlipInY").removeClass("animateFlipInY").removeClass("animated flipInY");
                            $("#page-"+page+" .animateBounceInLeft").removeClass("animateBounceInLeft").removeClass("animated bounceInLeft");
                            $("#page-"+page+" .animateBounceInRight").removeClass("animateBounceInRight").removeClass("animated bounceInRight");
                        }, 1000);
                        
                        if ($("#page-2").is(":visible")){
                            // skills
                            config.$skillWidgets.html(""); //removing already generated circle
                            config.$skillWidgets.circliful();
                        }
                    }
                } );
                initEvents();
            },
            initEvents = function() {
                
                var $slides = config.$bookBlock.children();

                // add navigation events
                config.$navNext.on( 'click touchstart', function() {
                    config.$bookBlock.bookblock( 'next' );
                    // Closes the Responsive Menu on Menu Item Click
                    if(menuConfig.$navbarDropdownMenu.hasClass("in"))
                        menuConfig.$navbarToggleButton.trigger('click');

                    return false;
                } );

                config.$navPrev.on( 'click touchstart', function() {
                    config.$bookBlock.bookblock( 'prev' );
                    // Closes the Responsive Menu on Menu Item Click
                    if(menuConfig.$navbarDropdownMenu.hasClass("in"))
                        menuConfig.$navbarToggleButton.trigger('click');
                    
                    return false;
                } );

                
                // add swipe events
                $slides.on( {
                    'swipeleft' : function( event ) {
                        config.$bookBlock.bookblock( 'next' );
                        return false;
                    },
                    'swiperight' : function( event ) {
                        config.$bookBlock.bookblock( 'prev' );
                        return false;
                    }
                } );

                // add keyboard events
                $( document ).keydown( function(e) {
                    var keyCode = e.keyCode || e.which,
                        arrow = {
                            left : 37,
                            up : 38,
                            right : 39,
                            down : 40
                        };

                    switch (keyCode) {
                        case arrow.left:
                            config.$bookBlock.bookblock( 'prev' );
                            break;
                        case arrow.right:
                            config.$bookBlock.bookblock( 'next' );
                            break;
                    }
                } );
            };
            
            //menu item
            current = 0;
            menuConfig.$menuItems.on( 'click', function() {
                var $el = $( this ),
                    idx = $el.attr("data-page"),
                    reachedToPage = false;
                config.$bookBlock.bookblock( 'jump',idx  );
                return false;
                 
            });
            
            //about menu - home
            menuConfig.$aboutMenuItem.on( 'click', function() {
                config.$bookBlock.bookblock( 'next' );
                return false;
            });

            return { init : init };

    })();



    /**
     * Our application module - manages all the elements in all pages
     */
    var UltraApp = (function() {
        var htmlRef = $('html');
        var windowRef = $(window);
        var bodyRef = $('html, body');
        var docRef = $(document);
        var preloaderArea = $('.cover');
        var headerArea = $('.header-top-area');
        var smothScrollEls = $('a.smoth-scroll');
        var workContainer = $('.work-inner');
        var workPopup = $('.work-popup');
        var testimonialList = $(".testimonial-list");
        var navbarToggle = $(".navbar-collapse.in");
        var gridContainers = $('.grid');
        var portfolioFilter = $(".fil-cat");
        var portfolioContainer = $(".lrs-projects");
        var portfolioProject = $(".lrs-project");


        //inits widgets
        var initWidgets = function() {
            //tooltip
            $('[data-toggle="tooltip"]').tooltip();

            //popover
            $('[data-toggle="popover"]').popover({
                'trigger': 'hover',
                'html': true,
                placement: 'top',
                'content': function () {
                    return "<img class='img-responsive' src='" + $(this).data('imageUrl') + "'><span>Popover content, lorem ipsum dolor sit amet, consectetur adipiscing elit</span>";
                }
            });
        };

        //init porfolio
        var initPortfolioGrid = function() {
            //massonary - portfolio
            gridContainers.masonry({
                // set itemSelector so .grid-sizer is not used in layout
                itemSelector: '.grid-item',
                // use element for option
                columnWidth: '.grid-sizer',
                percentPosition: true
            });

            //activate filters
            var selectedClass = "";
            portfolioFilter.on('click', function () {
                portfolioFilter.removeClass('active');
                $(this).addClass('active');
                selectedClass = $(this).attr("data-rel");
                portfolioContainer.fadeTo(100, 0.1);
                portfolioProject.not("." + selectedClass).fadeOut().removeClass('scale-anm');
                setTimeout(function () {
                    $("." + selectedClass).fadeIn().addClass('scale-anm');
                    portfolioContainer.fadeTo(300, 1);
                }, 300);
            });
        }

        //on document ready callback function
        var onDocReady = function(e) {
            //smooth scroll
            smothScrollEls.on("click", function (e) {
                var anchor = $(this);
                bodyRef.stop().animate({
                    scrollTop: $(anchor.attr('href')).offset().top - 50
                }, 1000);
                e.preventDefault();
            });

             //stellar parallax effects
             windowRef.stellar({
                 responsive: true,
                 positionProperty: 'position',
                 horizontalScrolling: false
             });

            //work section
            workContainer.mixItUp();

            //portfolio item popup
            workPopup.magnificPopup(
                {
                    type: 'image',
                    removalDelay: 300,
                    mainClass: 'mfp-with-zoom',
                    gallery: {
                        enabled: true
                    },
                    zoom: {
                        enabled: true, // By default it's false, so don't forget to enable it

                        duration: 300, // duration of the effect, in milliseconds
                        easing: 'ease-in-out', // CSS transition easing function

                        // The "opener" function should return the element from which popup will be zoomed in
                        // and to which popup will be scaled down
                        // By defailt it looks for an image tag:
                        opener: function (openerElement) {
                            // openerElement is the element on which popup was initialized, in this case its <a> tag
                            // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                            return openerElement.is('img') ? openerElement : openerElement.find('img');
                        }
                }
            });

            //testimonials
            testimonialList.owlCarousel({
                items: 1,
                autoPlay: true,
                navigation: false,
                itemsDesktop: [1199, 1],
                itemsDesktopSmall: [980, 1],
                itemsTablet: [768, 1],
                itemsTabletSmall: false,
                itemsMobile: [479, 1],
                pagination: true,
                autoHeight: true,
            });

            //navbar - small device
            navbarToggle.on('click', function (e) {
                if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                    $(this).collapse('hide');
                }
            });

            //activate menu item based on scrolled section
            bodyRef.scrollspy({
                target: '.navbar-collapse',
                offset: 195
            });

            //portfolio
            initPortfolioGrid();

            //widgets
            initWidgets();

        };

        //on window load call back function
        var onWinLoad = function(e) {
            // preloader - handling
            preloaderArea.delay(1000).fadeOut(2000);
        };

        //on window scroll call back function
        var onWinScroll = function(e) {
            //header
            if (windowRef.scrollTop() > 200) {
                headerArea.addClass('menu-bg');
            } else {
                headerArea.removeClass('menu-bg');
            }
        };

        //binds the events to required elements
        var bindEvents = function() {
            docRef.on('ready', onDocReady);
            windowRef.on('load', onWinLoad);
            windowRef.on('scroll', onWinScroll);
        };

        // init - initilizes various widgets, elements, events, etc
        var init = function() {
            bindEvents();
            //init page app
            Page.init();
        };

        return {
            init: init
        };
    }());

    //init app
    UltraApp.init();
})();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2UvYXNzZXRzL2phdmFzY3JpcHRzL2FsbC5qcyIsInNvdXJjZS9hc3NldHMvamF2YXNjcmlwdHMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuL2FwcC5qcycpO1xuIiwiXG4vKiEgU3RlbGxhci5qcyB2MC42LjIgfCBDb3B5cmlnaHQgMjAxMywgTWFyayBEYWxnbGVpc2ggfCBodHRwOi8vbWFya2RhbGdsZWlzaC5jb20vcHJvamVjdHMvc3RlbGxhci5qcyB8IGh0dHA6Ly9tYXJrZGFsZ2xlaXNoLm1pdC1saWNlbnNlLm9yZyAqL1xuKGZ1bmN0aW9uKGUsdCxuLHIpe2Z1bmN0aW9uIGQodCxuKXt0aGlzLmVsZW1lbnQ9dCx0aGlzLm9wdGlvbnM9ZS5leHRlbmQoe30scyxuKSx0aGlzLl9kZWZhdWx0cz1zLHRoaXMuX25hbWU9aSx0aGlzLmluaXQoKX12YXIgaT1cInN0ZWxsYXJcIixzPXtzY3JvbGxQcm9wZXJ0eTpcInNjcm9sbFwiLHBvc2l0aW9uUHJvcGVydHk6XCJwb3NpdGlvblwiLGhvcml6b250YWxTY3JvbGxpbmc6ITAsdmVydGljYWxTY3JvbGxpbmc6ITAsaG9yaXpvbnRhbE9mZnNldDowLHZlcnRpY2FsT2Zmc2V0OjAscmVzcG9uc2l2ZTohMSxwYXJhbGxheEJhY2tncm91bmRzOiEwLHBhcmFsbGF4RWxlbWVudHM6ITAsaGlkZURpc3RhbnRFbGVtZW50czohMCxoaWRlRWxlbWVudDpmdW5jdGlvbihlKXtlLmhpZGUoKX0sc2hvd0VsZW1lbnQ6ZnVuY3Rpb24oZSl7ZS5zaG93KCl9fSxvPXtzY3JvbGw6e2dldExlZnQ6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuc2Nyb2xsTGVmdCgpfSxzZXRMZWZ0OmZ1bmN0aW9uKGUsdCl7ZS5zY3JvbGxMZWZ0KHQpfSxnZXRUb3A6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuc2Nyb2xsVG9wKCl9LHNldFRvcDpmdW5jdGlvbihlLHQpe2Uuc2Nyb2xsVG9wKHQpfX0scG9zaXRpb246e2dldExlZnQ6ZnVuY3Rpb24oZSl7cmV0dXJuIHBhcnNlSW50KGUuY3NzKFwibGVmdFwiKSwxMCkqLTF9LGdldFRvcDpmdW5jdGlvbihlKXtyZXR1cm4gcGFyc2VJbnQoZS5jc3MoXCJ0b3BcIiksMTApKi0xfX0sbWFyZ2luOntnZXRMZWZ0OmZ1bmN0aW9uKGUpe3JldHVybiBwYXJzZUludChlLmNzcyhcIm1hcmdpbi1sZWZ0XCIpLDEwKSotMX0sZ2V0VG9wOmZ1bmN0aW9uKGUpe3JldHVybiBwYXJzZUludChlLmNzcyhcIm1hcmdpbi10b3BcIiksMTApKi0xfX0sdHJhbnNmb3JtOntnZXRMZWZ0OmZ1bmN0aW9uKGUpe3ZhciB0PWdldENvbXB1dGVkU3R5bGUoZVswXSlbZl07cmV0dXJuIHQhPT1cIm5vbmVcIj9wYXJzZUludCh0Lm1hdGNoKC8oLT9bMC05XSspL2cpWzRdLDEwKSotMTowfSxnZXRUb3A6ZnVuY3Rpb24oZSl7dmFyIHQ9Z2V0Q29tcHV0ZWRTdHlsZShlWzBdKVtmXTtyZXR1cm4gdCE9PVwibm9uZVwiP3BhcnNlSW50KHQubWF0Y2goLygtP1swLTldKykvZylbNV0sMTApKi0xOjB9fX0sdT17cG9zaXRpb246e3NldExlZnQ6ZnVuY3Rpb24oZSx0KXtlLmNzcyhcImxlZnRcIix0KX0sc2V0VG9wOmZ1bmN0aW9uKGUsdCl7ZS5jc3MoXCJ0b3BcIix0KX19LHRyYW5zZm9ybTp7c2V0UG9zaXRpb246ZnVuY3Rpb24oZSx0LG4scixpKXtlWzBdLnN0eWxlW2ZdPVwidHJhbnNsYXRlM2QoXCIrKHQtbikrXCJweCwgXCIrKHItaSkrXCJweCwgMClcIn19fSxhPWZ1bmN0aW9uKCl7dmFyIHQ9L14oTW96fFdlYmtpdHxLaHRtbHxPfG1zfEljYWIpKD89W0EtWl0pLyxuPWUoXCJzY3JpcHRcIilbMF0uc3R5bGUscj1cIlwiLGk7Zm9yKGkgaW4gbilpZih0LnRlc3QoaSkpe3I9aS5tYXRjaCh0KVswXTticmVha31yZXR1cm5cIldlYmtpdE9wYWNpdHlcImluIG4mJihyPVwiV2Via2l0XCIpLFwiS2h0bWxPcGFjaXR5XCJpbiBuJiYocj1cIktodG1sXCIpLGZ1bmN0aW9uKGUpe3JldHVybiByKyhyLmxlbmd0aD4wP2UuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrZS5zbGljZSgxKTplKX19KCksZj1hKFwidHJhbnNmb3JtXCIpLGw9ZShcIjxkaXYgLz5cIix7c3R5bGU6XCJiYWNrZ3JvdW5kOiNmZmZcIn0pLmNzcyhcImJhY2tncm91bmQtcG9zaXRpb24teFwiKSE9PXIsYz1sP2Z1bmN0aW9uKGUsdCxuKXtlLmNzcyh7XCJiYWNrZ3JvdW5kLXBvc2l0aW9uLXhcIjp0LFwiYmFja2dyb3VuZC1wb3NpdGlvbi15XCI6bn0pfTpmdW5jdGlvbihlLHQsbil7ZS5jc3MoXCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCIsdCtcIiBcIituKX0saD1sP2Z1bmN0aW9uKGUpe3JldHVybltlLmNzcyhcImJhY2tncm91bmQtcG9zaXRpb24teFwiKSxlLmNzcyhcImJhY2tncm91bmQtcG9zaXRpb24teVwiKV19OmZ1bmN0aW9uKGUpe3JldHVybiBlLmNzcyhcImJhY2tncm91bmQtcG9zaXRpb25cIikuc3BsaXQoXCIgXCIpfSxwPXQucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx0LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZXx8dC5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHQub1JlcXVlc3RBbmltYXRpb25GcmFtZXx8dC5tc1JlcXVlc3RBbmltYXRpb25GcmFtZXx8ZnVuY3Rpb24oZSl7c2V0VGltZW91dChlLDFlMy82MCl9O2QucHJvdG90eXBlPXtpbml0OmZ1bmN0aW9uKCl7dGhpcy5vcHRpb25zLm5hbWU9aStcIl9cIitNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMWU5KSx0aGlzLl9kZWZpbmVFbGVtZW50cygpLHRoaXMuX2RlZmluZUdldHRlcnMoKSx0aGlzLl9kZWZpbmVTZXR0ZXJzKCksdGhpcy5faGFuZGxlV2luZG93TG9hZEFuZFJlc2l6ZSgpLHRoaXMuX2RldGVjdFZpZXdwb3J0KCksdGhpcy5yZWZyZXNoKHtmaXJzdExvYWQ6ITB9KSx0aGlzLm9wdGlvbnMuc2Nyb2xsUHJvcGVydHk9PT1cInNjcm9sbFwiP3RoaXMuX2hhbmRsZVNjcm9sbEV2ZW50KCk6dGhpcy5fc3RhcnRBbmltYXRpb25Mb29wKCl9LF9kZWZpbmVFbGVtZW50czpmdW5jdGlvbigpe3RoaXMuZWxlbWVudD09PW4uYm9keSYmKHRoaXMuZWxlbWVudD10KSx0aGlzLiRzY3JvbGxFbGVtZW50PWUodGhpcy5lbGVtZW50KSx0aGlzLiRlbGVtZW50PXRoaXMuZWxlbWVudD09PXQ/ZShcImJvZHlcIik6dGhpcy4kc2Nyb2xsRWxlbWVudCx0aGlzLiR2aWV3cG9ydEVsZW1lbnQ9dGhpcy5vcHRpb25zLnZpZXdwb3J0RWxlbWVudCE9PXI/ZSh0aGlzLm9wdGlvbnMudmlld3BvcnRFbGVtZW50KTp0aGlzLiRzY3JvbGxFbGVtZW50WzBdPT09dHx8dGhpcy5vcHRpb25zLnNjcm9sbFByb3BlcnR5PT09XCJzY3JvbGxcIj90aGlzLiRzY3JvbGxFbGVtZW50OnRoaXMuJHNjcm9sbEVsZW1lbnQucGFyZW50KCl9LF9kZWZpbmVHZXR0ZXJzOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PW9bZS5vcHRpb25zLnNjcm9sbFByb3BlcnR5XTt0aGlzLl9nZXRTY3JvbGxMZWZ0PWZ1bmN0aW9uKCl7cmV0dXJuIHQuZ2V0TGVmdChlLiRzY3JvbGxFbGVtZW50KX0sdGhpcy5fZ2V0U2Nyb2xsVG9wPWZ1bmN0aW9uKCl7cmV0dXJuIHQuZ2V0VG9wKGUuJHNjcm9sbEVsZW1lbnQpfX0sX2RlZmluZVNldHRlcnM6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLG49b1t0Lm9wdGlvbnMuc2Nyb2xsUHJvcGVydHldLHI9dVt0Lm9wdGlvbnMucG9zaXRpb25Qcm9wZXJ0eV0saT1uLnNldExlZnQscz1uLnNldFRvcDt0aGlzLl9zZXRTY3JvbGxMZWZ0PXR5cGVvZiBpPT1cImZ1bmN0aW9uXCI/ZnVuY3Rpb24oZSl7aSh0LiRzY3JvbGxFbGVtZW50LGUpfTplLm5vb3AsdGhpcy5fc2V0U2Nyb2xsVG9wPXR5cGVvZiBzPT1cImZ1bmN0aW9uXCI/ZnVuY3Rpb24oZSl7cyh0LiRzY3JvbGxFbGVtZW50LGUpfTplLm5vb3AsdGhpcy5fc2V0UG9zaXRpb249ci5zZXRQb3NpdGlvbnx8ZnVuY3Rpb24oZSxuLGkscyxvKXt0Lm9wdGlvbnMuaG9yaXpvbnRhbFNjcm9sbGluZyYmci5zZXRMZWZ0KGUsbixpKSx0Lm9wdGlvbnMudmVydGljYWxTY3JvbGxpbmcmJnIuc2V0VG9wKGUscyxvKX19LF9oYW5kbGVXaW5kb3dMb2FkQW5kUmVzaXplOmZ1bmN0aW9uKCl7dmFyIG49dGhpcyxyPWUodCk7bi5vcHRpb25zLnJlc3BvbnNpdmUmJnIuYmluZChcImxvYWQuXCIrdGhpcy5uYW1lLGZ1bmN0aW9uKCl7bi5yZWZyZXNoKCl9KSxyLmJpbmQoXCJyZXNpemUuXCIrdGhpcy5uYW1lLGZ1bmN0aW9uKCl7bi5fZGV0ZWN0Vmlld3BvcnQoKSxuLm9wdGlvbnMucmVzcG9uc2l2ZSYmbi5yZWZyZXNoKCl9KX0scmVmcmVzaDpmdW5jdGlvbihuKXt2YXIgcj10aGlzLGk9ci5fZ2V0U2Nyb2xsTGVmdCgpLHM9ci5fZ2V0U2Nyb2xsVG9wKCk7KCFufHwhbi5maXJzdExvYWQpJiZ0aGlzLl9yZXNldCgpLHRoaXMuX3NldFNjcm9sbExlZnQoMCksdGhpcy5fc2V0U2Nyb2xsVG9wKDApLHRoaXMuX3NldE9mZnNldHMoKSx0aGlzLl9maW5kUGFydGljbGVzKCksdGhpcy5fZmluZEJhY2tncm91bmRzKCksbiYmbi5maXJzdExvYWQmJi9XZWJLaXQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkmJmUodCkubG9hZChmdW5jdGlvbigpe3ZhciBlPXIuX2dldFNjcm9sbExlZnQoKSx0PXIuX2dldFNjcm9sbFRvcCgpO3IuX3NldFNjcm9sbExlZnQoZSsxKSxyLl9zZXRTY3JvbGxUb3AodCsxKSxyLl9zZXRTY3JvbGxMZWZ0KGUpLHIuX3NldFNjcm9sbFRvcCh0KX0pLHRoaXMuX3NldFNjcm9sbExlZnQoaSksdGhpcy5fc2V0U2Nyb2xsVG9wKHMpfSxfZGV0ZWN0Vmlld3BvcnQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLiR2aWV3cG9ydEVsZW1lbnQub2Zmc2V0KCksdD1lIT09bnVsbCYmZSE9PXI7dGhpcy52aWV3cG9ydFdpZHRoPXRoaXMuJHZpZXdwb3J0RWxlbWVudC53aWR0aCgpLHRoaXMudmlld3BvcnRIZWlnaHQ9dGhpcy4kdmlld3BvcnRFbGVtZW50LmhlaWdodCgpLHRoaXMudmlld3BvcnRPZmZzZXRUb3A9dD9lLnRvcDowLHRoaXMudmlld3BvcnRPZmZzZXRMZWZ0PXQ/ZS5sZWZ0OjB9LF9maW5kUGFydGljbGVzOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxuPXRoaXMuX2dldFNjcm9sbExlZnQoKSxpPXRoaXMuX2dldFNjcm9sbFRvcCgpO2lmKHRoaXMucGFydGljbGVzIT09cilmb3IodmFyIHM9dGhpcy5wYXJ0aWNsZXMubGVuZ3RoLTE7cz49MDtzLS0pdGhpcy5wYXJ0aWNsZXNbc10uJGVsZW1lbnQuZGF0YShcInN0ZWxsYXItZWxlbWVudElzQWN0aXZlXCIscik7dGhpcy5wYXJ0aWNsZXM9W107aWYoIXRoaXMub3B0aW9ucy5wYXJhbGxheEVsZW1lbnRzKXJldHVybjt0aGlzLiRlbGVtZW50LmZpbmQoXCJbZGF0YS1zdGVsbGFyLXJhdGlvXVwiKS5lYWNoKGZ1bmN0aW9uKG4pe3ZhciBpPWUodGhpcykscyxvLHUsYSxmLGwsYyxoLHAsZD0wLHY9MCxtPTAsZz0wO2lmKCFpLmRhdGEoXCJzdGVsbGFyLWVsZW1lbnRJc0FjdGl2ZVwiKSlpLmRhdGEoXCJzdGVsbGFyLWVsZW1lbnRJc0FjdGl2ZVwiLHRoaXMpO2Vsc2UgaWYoaS5kYXRhKFwic3RlbGxhci1lbGVtZW50SXNBY3RpdmVcIikhPT10aGlzKXJldHVybjt0Lm9wdGlvbnMuc2hvd0VsZW1lbnQoaSksaS5kYXRhKFwic3RlbGxhci1zdGFydGluZ0xlZnRcIik/KGkuY3NzKFwibGVmdFwiLGkuZGF0YShcInN0ZWxsYXItc3RhcnRpbmdMZWZ0XCIpKSxpLmNzcyhcInRvcFwiLGkuZGF0YShcInN0ZWxsYXItc3RhcnRpbmdUb3BcIikpKTooaS5kYXRhKFwic3RlbGxhci1zdGFydGluZ0xlZnRcIixpLmNzcyhcImxlZnRcIikpLGkuZGF0YShcInN0ZWxsYXItc3RhcnRpbmdUb3BcIixpLmNzcyhcInRvcFwiKSkpLHU9aS5wb3NpdGlvbigpLmxlZnQsYT1pLnBvc2l0aW9uKCkudG9wLGY9aS5jc3MoXCJtYXJnaW4tbGVmdFwiKT09PVwiYXV0b1wiPzA6cGFyc2VJbnQoaS5jc3MoXCJtYXJnaW4tbGVmdFwiKSwxMCksbD1pLmNzcyhcIm1hcmdpbi10b3BcIik9PT1cImF1dG9cIj8wOnBhcnNlSW50KGkuY3NzKFwibWFyZ2luLXRvcFwiKSwxMCksaD1pLm9mZnNldCgpLmxlZnQtZixwPWkub2Zmc2V0KCkudG9wLWwsaS5wYXJlbnRzKCkuZWFjaChmdW5jdGlvbigpe3ZhciB0PWUodGhpcyk7aWYodC5kYXRhKFwic3RlbGxhci1vZmZzZXQtcGFyZW50XCIpPT09ITApcmV0dXJuIGQ9bSx2PWcsYz10LCExO20rPXQucG9zaXRpb24oKS5sZWZ0LGcrPXQucG9zaXRpb24oKS50b3B9KSxzPWkuZGF0YShcInN0ZWxsYXItaG9yaXpvbnRhbC1vZmZzZXRcIikhPT1yP2kuZGF0YShcInN0ZWxsYXItaG9yaXpvbnRhbC1vZmZzZXRcIik6YyE9PXImJmMuZGF0YShcInN0ZWxsYXItaG9yaXpvbnRhbC1vZmZzZXRcIikhPT1yP2MuZGF0YShcInN0ZWxsYXItaG9yaXpvbnRhbC1vZmZzZXRcIik6dC5ob3Jpem9udGFsT2Zmc2V0LG89aS5kYXRhKFwic3RlbGxhci12ZXJ0aWNhbC1vZmZzZXRcIikhPT1yP2kuZGF0YShcInN0ZWxsYXItdmVydGljYWwtb2Zmc2V0XCIpOmMhPT1yJiZjLmRhdGEoXCJzdGVsbGFyLXZlcnRpY2FsLW9mZnNldFwiKSE9PXI/Yy5kYXRhKFwic3RlbGxhci12ZXJ0aWNhbC1vZmZzZXRcIik6dC52ZXJ0aWNhbE9mZnNldCx0LnBhcnRpY2xlcy5wdXNoKHskZWxlbWVudDppLCRvZmZzZXRQYXJlbnQ6Yyxpc0ZpeGVkOmkuY3NzKFwicG9zaXRpb25cIik9PT1cImZpeGVkXCIsaG9yaXpvbnRhbE9mZnNldDpzLHZlcnRpY2FsT2Zmc2V0Om8sc3RhcnRpbmdQb3NpdGlvbkxlZnQ6dSxzdGFydGluZ1Bvc2l0aW9uVG9wOmEsc3RhcnRpbmdPZmZzZXRMZWZ0Omgsc3RhcnRpbmdPZmZzZXRUb3A6cCxwYXJlbnRPZmZzZXRMZWZ0OmQscGFyZW50T2Zmc2V0VG9wOnYsc3RlbGxhclJhdGlvOmkuZGF0YShcInN0ZWxsYXItcmF0aW9cIikhPT1yP2kuZGF0YShcInN0ZWxsYXItcmF0aW9cIik6MSx3aWR0aDppLm91dGVyV2lkdGgoITApLGhlaWdodDppLm91dGVySGVpZ2h0KCEwKSxpc0hpZGRlbjohMX0pfSl9LF9maW5kQmFja2dyb3VuZHM6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLG49dGhpcy5fZ2V0U2Nyb2xsTGVmdCgpLGk9dGhpcy5fZ2V0U2Nyb2xsVG9wKCksczt0aGlzLmJhY2tncm91bmRzPVtdO2lmKCF0aGlzLm9wdGlvbnMucGFyYWxsYXhCYWNrZ3JvdW5kcylyZXR1cm47cz10aGlzLiRlbGVtZW50LmZpbmQoXCJbZGF0YS1zdGVsbGFyLWJhY2tncm91bmQtcmF0aW9dXCIpLHRoaXMuJGVsZW1lbnQuZGF0YShcInN0ZWxsYXItYmFja2dyb3VuZC1yYXRpb1wiKSYmKHM9cy5hZGQodGhpcy4kZWxlbWVudCkpLHMuZWFjaChmdW5jdGlvbigpe3ZhciBzPWUodGhpcyksbz1oKHMpLHUsYSxmLGwscCxkLHYsbSxnLHk9MCxiPTAsdz0wLEU9MDtpZighcy5kYXRhKFwic3RlbGxhci1iYWNrZ3JvdW5kSXNBY3RpdmVcIikpcy5kYXRhKFwic3RlbGxhci1iYWNrZ3JvdW5kSXNBY3RpdmVcIix0aGlzKTtlbHNlIGlmKHMuZGF0YShcInN0ZWxsYXItYmFja2dyb3VuZElzQWN0aXZlXCIpIT09dGhpcylyZXR1cm47cy5kYXRhKFwic3RlbGxhci1iYWNrZ3JvdW5kU3RhcnRpbmdMZWZ0XCIpP2MocyxzLmRhdGEoXCJzdGVsbGFyLWJhY2tncm91bmRTdGFydGluZ0xlZnRcIikscy5kYXRhKFwic3RlbGxhci1iYWNrZ3JvdW5kU3RhcnRpbmdUb3BcIikpOihzLmRhdGEoXCJzdGVsbGFyLWJhY2tncm91bmRTdGFydGluZ0xlZnRcIixvWzBdKSxzLmRhdGEoXCJzdGVsbGFyLWJhY2tncm91bmRTdGFydGluZ1RvcFwiLG9bMV0pKSxwPXMuY3NzKFwibWFyZ2luLWxlZnRcIik9PT1cImF1dG9cIj8wOnBhcnNlSW50KHMuY3NzKFwibWFyZ2luLWxlZnRcIiksMTApLGQ9cy5jc3MoXCJtYXJnaW4tdG9wXCIpPT09XCJhdXRvXCI/MDpwYXJzZUludChzLmNzcyhcIm1hcmdpbi10b3BcIiksMTApLHY9cy5vZmZzZXQoKS5sZWZ0LXAtbixtPXMub2Zmc2V0KCkudG9wLWQtaSxzLnBhcmVudHMoKS5lYWNoKGZ1bmN0aW9uKCl7dmFyIHQ9ZSh0aGlzKTtpZih0LmRhdGEoXCJzdGVsbGFyLW9mZnNldC1wYXJlbnRcIik9PT0hMClyZXR1cm4geT13LGI9RSxnPXQsITE7dys9dC5wb3NpdGlvbigpLmxlZnQsRSs9dC5wb3NpdGlvbigpLnRvcH0pLHU9cy5kYXRhKFwic3RlbGxhci1ob3Jpem9udGFsLW9mZnNldFwiKSE9PXI/cy5kYXRhKFwic3RlbGxhci1ob3Jpem9udGFsLW9mZnNldFwiKTpnIT09ciYmZy5kYXRhKFwic3RlbGxhci1ob3Jpem9udGFsLW9mZnNldFwiKSE9PXI/Zy5kYXRhKFwic3RlbGxhci1ob3Jpem9udGFsLW9mZnNldFwiKTp0Lmhvcml6b250YWxPZmZzZXQsYT1zLmRhdGEoXCJzdGVsbGFyLXZlcnRpY2FsLW9mZnNldFwiKSE9PXI/cy5kYXRhKFwic3RlbGxhci12ZXJ0aWNhbC1vZmZzZXRcIik6ZyE9PXImJmcuZGF0YShcInN0ZWxsYXItdmVydGljYWwtb2Zmc2V0XCIpIT09cj9nLmRhdGEoXCJzdGVsbGFyLXZlcnRpY2FsLW9mZnNldFwiKTp0LnZlcnRpY2FsT2Zmc2V0LHQuYmFja2dyb3VuZHMucHVzaCh7JGVsZW1lbnQ6cywkb2Zmc2V0UGFyZW50OmcsaXNGaXhlZDpzLmNzcyhcImJhY2tncm91bmQtYXR0YWNobWVudFwiKT09PVwiZml4ZWRcIixob3Jpem9udGFsT2Zmc2V0OnUsdmVydGljYWxPZmZzZXQ6YSxzdGFydGluZ1ZhbHVlTGVmdDpvWzBdLHN0YXJ0aW5nVmFsdWVUb3A6b1sxXSxzdGFydGluZ0JhY2tncm91bmRQb3NpdGlvbkxlZnQ6aXNOYU4ocGFyc2VJbnQob1swXSwxMCkpPzA6cGFyc2VJbnQob1swXSwxMCksc3RhcnRpbmdCYWNrZ3JvdW5kUG9zaXRpb25Ub3A6aXNOYU4ocGFyc2VJbnQob1sxXSwxMCkpPzA6cGFyc2VJbnQob1sxXSwxMCksc3RhcnRpbmdQb3NpdGlvbkxlZnQ6cy5wb3NpdGlvbigpLmxlZnQsc3RhcnRpbmdQb3NpdGlvblRvcDpzLnBvc2l0aW9uKCkudG9wLHN0YXJ0aW5nT2Zmc2V0TGVmdDp2LHN0YXJ0aW5nT2Zmc2V0VG9wOm0scGFyZW50T2Zmc2V0TGVmdDp5LHBhcmVudE9mZnNldFRvcDpiLHN0ZWxsYXJSYXRpbzpzLmRhdGEoXCJzdGVsbGFyLWJhY2tncm91bmQtcmF0aW9cIik9PT1yPzE6cy5kYXRhKFwic3RlbGxhci1iYWNrZ3JvdW5kLXJhdGlvXCIpfSl9KX0sX3Jlc2V0OmZ1bmN0aW9uKCl7dmFyIGUsdCxuLHIsaTtmb3IoaT10aGlzLnBhcnRpY2xlcy5sZW5ndGgtMTtpPj0wO2ktLSllPXRoaXMucGFydGljbGVzW2ldLHQ9ZS4kZWxlbWVudC5kYXRhKFwic3RlbGxhci1zdGFydGluZ0xlZnRcIiksbj1lLiRlbGVtZW50LmRhdGEoXCJzdGVsbGFyLXN0YXJ0aW5nVG9wXCIpLHRoaXMuX3NldFBvc2l0aW9uKGUuJGVsZW1lbnQsdCx0LG4sbiksdGhpcy5vcHRpb25zLnNob3dFbGVtZW50KGUuJGVsZW1lbnQpLGUuJGVsZW1lbnQuZGF0YShcInN0ZWxsYXItc3RhcnRpbmdMZWZ0XCIsbnVsbCkuZGF0YShcInN0ZWxsYXItZWxlbWVudElzQWN0aXZlXCIsbnVsbCkuZGF0YShcInN0ZWxsYXItYmFja2dyb3VuZElzQWN0aXZlXCIsbnVsbCk7Zm9yKGk9dGhpcy5iYWNrZ3JvdW5kcy5sZW5ndGgtMTtpPj0wO2ktLSlyPXRoaXMuYmFja2dyb3VuZHNbaV0sci4kZWxlbWVudC5kYXRhKFwic3RlbGxhci1iYWNrZ3JvdW5kU3RhcnRpbmdMZWZ0XCIsbnVsbCkuZGF0YShcInN0ZWxsYXItYmFja2dyb3VuZFN0YXJ0aW5nVG9wXCIsbnVsbCksYyhyLiRlbGVtZW50LHIuc3RhcnRpbmdWYWx1ZUxlZnQsci5zdGFydGluZ1ZhbHVlVG9wKX0sZGVzdHJveTpmdW5jdGlvbigpe3RoaXMuX3Jlc2V0KCksdGhpcy4kc2Nyb2xsRWxlbWVudC51bmJpbmQoXCJyZXNpemUuXCIrdGhpcy5uYW1lKS51bmJpbmQoXCJzY3JvbGwuXCIrdGhpcy5uYW1lKSx0aGlzLl9hbmltYXRpb25Mb29wPWUubm9vcCxlKHQpLnVuYmluZChcImxvYWQuXCIrdGhpcy5uYW1lKS51bmJpbmQoXCJyZXNpemUuXCIrdGhpcy5uYW1lKX0sX3NldE9mZnNldHM6ZnVuY3Rpb24oKXt2YXIgbj10aGlzLHI9ZSh0KTtyLnVuYmluZChcInJlc2l6ZS5ob3Jpem9udGFsLVwiK3RoaXMubmFtZSkudW5iaW5kKFwicmVzaXplLnZlcnRpY2FsLVwiK3RoaXMubmFtZSksdHlwZW9mIHRoaXMub3B0aW9ucy5ob3Jpem9udGFsT2Zmc2V0PT1cImZ1bmN0aW9uXCI/KHRoaXMuaG9yaXpvbnRhbE9mZnNldD10aGlzLm9wdGlvbnMuaG9yaXpvbnRhbE9mZnNldCgpLHIuYmluZChcInJlc2l6ZS5ob3Jpem9udGFsLVwiK3RoaXMubmFtZSxmdW5jdGlvbigpe24uaG9yaXpvbnRhbE9mZnNldD1uLm9wdGlvbnMuaG9yaXpvbnRhbE9mZnNldCgpfSkpOnRoaXMuaG9yaXpvbnRhbE9mZnNldD10aGlzLm9wdGlvbnMuaG9yaXpvbnRhbE9mZnNldCx0eXBlb2YgdGhpcy5vcHRpb25zLnZlcnRpY2FsT2Zmc2V0PT1cImZ1bmN0aW9uXCI/KHRoaXMudmVydGljYWxPZmZzZXQ9dGhpcy5vcHRpb25zLnZlcnRpY2FsT2Zmc2V0KCksci5iaW5kKFwicmVzaXplLnZlcnRpY2FsLVwiK3RoaXMubmFtZSxmdW5jdGlvbigpe24udmVydGljYWxPZmZzZXQ9bi5vcHRpb25zLnZlcnRpY2FsT2Zmc2V0KCl9KSk6dGhpcy52ZXJ0aWNhbE9mZnNldD10aGlzLm9wdGlvbnMudmVydGljYWxPZmZzZXR9LF9yZXBvc2l0aW9uRWxlbWVudHM6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLl9nZXRTY3JvbGxMZWZ0KCksdD10aGlzLl9nZXRTY3JvbGxUb3AoKSxuLHIsaSxzLG8sdSxhLGY9ITAsbD0hMCxoLHAsZCx2LG07aWYodGhpcy5jdXJyZW50U2Nyb2xsTGVmdD09PWUmJnRoaXMuY3VycmVudFNjcm9sbFRvcD09PXQmJnRoaXMuY3VycmVudFdpZHRoPT09dGhpcy52aWV3cG9ydFdpZHRoJiZ0aGlzLmN1cnJlbnRIZWlnaHQ9PT10aGlzLnZpZXdwb3J0SGVpZ2h0KXJldHVybjt0aGlzLmN1cnJlbnRTY3JvbGxMZWZ0PWUsdGhpcy5jdXJyZW50U2Nyb2xsVG9wPXQsdGhpcy5jdXJyZW50V2lkdGg9dGhpcy52aWV3cG9ydFdpZHRoLHRoaXMuY3VycmVudEhlaWdodD10aGlzLnZpZXdwb3J0SGVpZ2h0O2ZvcihtPXRoaXMucGFydGljbGVzLmxlbmd0aC0xO20+PTA7bS0tKWk9dGhpcy5wYXJ0aWNsZXNbbV0scz1pLmlzRml4ZWQ/MTowLHRoaXMub3B0aW9ucy5ob3Jpem9udGFsU2Nyb2xsaW5nPyhoPShlK2kuaG9yaXpvbnRhbE9mZnNldCt0aGlzLnZpZXdwb3J0T2Zmc2V0TGVmdCtpLnN0YXJ0aW5nUG9zaXRpb25MZWZ0LWkuc3RhcnRpbmdPZmZzZXRMZWZ0K2kucGFyZW50T2Zmc2V0TGVmdCkqLShpLnN0ZWxsYXJSYXRpbytzLTEpK2kuc3RhcnRpbmdQb3NpdGlvbkxlZnQsZD1oLWkuc3RhcnRpbmdQb3NpdGlvbkxlZnQraS5zdGFydGluZ09mZnNldExlZnQpOihoPWkuc3RhcnRpbmdQb3NpdGlvbkxlZnQsZD1pLnN0YXJ0aW5nT2Zmc2V0TGVmdCksdGhpcy5vcHRpb25zLnZlcnRpY2FsU2Nyb2xsaW5nPyhwPSh0K2kudmVydGljYWxPZmZzZXQrdGhpcy52aWV3cG9ydE9mZnNldFRvcCtpLnN0YXJ0aW5nUG9zaXRpb25Ub3AtaS5zdGFydGluZ09mZnNldFRvcCtpLnBhcmVudE9mZnNldFRvcCkqLShpLnN0ZWxsYXJSYXRpbytzLTEpK2kuc3RhcnRpbmdQb3NpdGlvblRvcCx2PXAtaS5zdGFydGluZ1Bvc2l0aW9uVG9wK2kuc3RhcnRpbmdPZmZzZXRUb3ApOihwPWkuc3RhcnRpbmdQb3NpdGlvblRvcCx2PWkuc3RhcnRpbmdPZmZzZXRUb3ApLHRoaXMub3B0aW9ucy5oaWRlRGlzdGFudEVsZW1lbnRzJiYobD0hdGhpcy5vcHRpb25zLmhvcml6b250YWxTY3JvbGxpbmd8fGQraS53aWR0aD4oaS5pc0ZpeGVkPzA6ZSkmJmQ8KGkuaXNGaXhlZD8wOmUpK3RoaXMudmlld3BvcnRXaWR0aCt0aGlzLnZpZXdwb3J0T2Zmc2V0TGVmdCxmPSF0aGlzLm9wdGlvbnMudmVydGljYWxTY3JvbGxpbmd8fHYraS5oZWlnaHQ+KGkuaXNGaXhlZD8wOnQpJiZ2PChpLmlzRml4ZWQ/MDp0KSt0aGlzLnZpZXdwb3J0SGVpZ2h0K3RoaXMudmlld3BvcnRPZmZzZXRUb3ApLGwmJmY/KGkuaXNIaWRkZW4mJih0aGlzLm9wdGlvbnMuc2hvd0VsZW1lbnQoaS4kZWxlbWVudCksaS5pc0hpZGRlbj0hMSksdGhpcy5fc2V0UG9zaXRpb24oaS4kZWxlbWVudCxoLGkuc3RhcnRpbmdQb3NpdGlvbkxlZnQscCxpLnN0YXJ0aW5nUG9zaXRpb25Ub3ApKTppLmlzSGlkZGVufHwodGhpcy5vcHRpb25zLmhpZGVFbGVtZW50KGkuJGVsZW1lbnQpLGkuaXNIaWRkZW49ITApO2ZvcihtPXRoaXMuYmFja2dyb3VuZHMubGVuZ3RoLTE7bT49MDttLS0pbz10aGlzLmJhY2tncm91bmRzW21dLHM9by5pc0ZpeGVkPzA6MSx1PXRoaXMub3B0aW9ucy5ob3Jpem9udGFsU2Nyb2xsaW5nPyhlK28uaG9yaXpvbnRhbE9mZnNldC10aGlzLnZpZXdwb3J0T2Zmc2V0TGVmdC1vLnN0YXJ0aW5nT2Zmc2V0TGVmdCtvLnBhcmVudE9mZnNldExlZnQtby5zdGFydGluZ0JhY2tncm91bmRQb3NpdGlvbkxlZnQpKihzLW8uc3RlbGxhclJhdGlvKStcInB4XCI6by5zdGFydGluZ1ZhbHVlTGVmdCxhPXRoaXMub3B0aW9ucy52ZXJ0aWNhbFNjcm9sbGluZz8odCtvLnZlcnRpY2FsT2Zmc2V0LXRoaXMudmlld3BvcnRPZmZzZXRUb3Atby5zdGFydGluZ09mZnNldFRvcCtvLnBhcmVudE9mZnNldFRvcC1vLnN0YXJ0aW5nQmFja2dyb3VuZFBvc2l0aW9uVG9wKSoocy1vLnN0ZWxsYXJSYXRpbykrXCJweFwiOm8uc3RhcnRpbmdWYWx1ZVRvcCxjKG8uJGVsZW1lbnQsdSxhKX0sX2hhbmRsZVNjcm9sbEV2ZW50OmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PSExLG49ZnVuY3Rpb24oKXtlLl9yZXBvc2l0aW9uRWxlbWVudHMoKSx0PSExfSxyPWZ1bmN0aW9uKCl7dHx8KHAobiksdD0hMCl9O3RoaXMuJHNjcm9sbEVsZW1lbnQuYmluZChcInNjcm9sbC5cIit0aGlzLm5hbWUscikscigpfSxfc3RhcnRBbmltYXRpb25Mb29wOmZ1bmN0aW9uKCl7dmFyIGU9dGhpczt0aGlzLl9hbmltYXRpb25Mb29wPWZ1bmN0aW9uKCl7cChlLl9hbmltYXRpb25Mb29wKSxlLl9yZXBvc2l0aW9uRWxlbWVudHMoKX0sdGhpcy5fYW5pbWF0aW9uTG9vcCgpfX0sZS5mbltpXT1mdW5jdGlvbih0KXt2YXIgbj1hcmd1bWVudHM7aWYodD09PXJ8fHR5cGVvZiB0PT1cIm9iamVjdFwiKXJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtlLmRhdGEodGhpcyxcInBsdWdpbl9cIitpKXx8ZS5kYXRhKHRoaXMsXCJwbHVnaW5fXCIraSxuZXcgZCh0aGlzLHQpKX0pO2lmKHR5cGVvZiB0PT1cInN0cmluZ1wiJiZ0WzBdIT09XCJfXCImJnQhPT1cImluaXRcIilyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIHI9ZS5kYXRhKHRoaXMsXCJwbHVnaW5fXCIraSk7ciBpbnN0YW5jZW9mIGQmJnR5cGVvZiByW3RdPT1cImZ1bmN0aW9uXCImJnJbdF0uYXBwbHkocixBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChuLDEpKSx0PT09XCJkZXN0cm95XCImJmUuZGF0YSh0aGlzLFwicGx1Z2luX1wiK2ksbnVsbCl9KX0sZVtpXT1mdW5jdGlvbihuKXt2YXIgcj1lKHQpO3JldHVybiByLnN0ZWxsYXIuYXBwbHkocixBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMCkpfSxlW2ldLnNjcm9sbFByb3BlcnR5PW8sZVtpXS5wb3NpdGlvblByb3BlcnR5PXUsdC5TdGVsbGFyPWR9KShqUXVlcnksdGhpcyxkb2N1bWVudCk7XG4vKlxuKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5BdXRob3IgICAgICAgOiBNYW5uYXQgVGhlbWVzXG5UZW1wbGF0ZSBOYW1lOiBVbHRyYSAtIFJlc3BvbnNpdmUgUmVzdW1lICYgQ1YgVGVtcGxhdGVcblZlcnNpb24gICAgICA6IDEuMFxuKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qL1xuLyoqXG4gKiBNYWluIEFwcGxpY2F0aW9uIEpzIFxuICovIFxuIFxuKGZ1bmN0aW9uKCkge1xuICAgIC8vIFBhZ2UgbW9kdWxlIC0gaGVscHMgdG8gbWFuYWdlIGFsbCB0aGUgcGFnZXMgYW5kIG5hdmlnYXRpb25cbiAgICB2YXIgUGFnZSA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgICRib29rQmxvY2sgOiAkKCAnI2JiLWJvb2tibG9jaycgKSxcbiAgICAgICAgICAgICAgICAkbmF2TmV4dCA6ICQoICcuYmItbmF2LW5leHQnICksXG4gICAgICAgICAgICAgICAgJG5hdlByZXYgOiAkKCAnLmJiLW5hdi1wcmV2JyApLFxuICAgICAgICAgICAgICAgICRza2lsbFdpZGdldHM6ICQoJy5za2lsbC1jaXJjbGUnKSxcbiAgICAgICAgfSxcbiAgICAgICAgbWVudUNvbmZpZyA9IHtcbiAgICAgICAgICAgICRtZW51SXRlbXM6ICQoXCIjbWVudSBsaSBhXCIpLFxuICAgICAgICAgICAgJGFib3V0TWVudUl0ZW06ICQoXCIjYWJvdXRtZVwiKSxcbiAgICAgICAgICAgICRuYXZiYXJUb2dnbGVCdXR0b24gOiAkKCcubmF2YmFyLXRvZ2dsZTp2aXNpYmxlJyksXG4gICAgICAgICAgICAkbmF2YmFyRHJvcGRvd25NZW51OiAkKFwiI25hdi10b3BcIiksXG4gICAgICAgIH0sXG4gICAgICAgIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uZmlnLiRib29rQmxvY2suYm9va2Jsb2NrKCB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWVkIDogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgc2hhZG93U2lkZXMgOiAwLjgsXG4gICAgICAgICAgICAgICAgICAgIHNoYWRvd0ZsaXAgOiAwLjQsXG4gICAgICAgICAgICAgICAgICAgIG9uRW5kRmxpcCA6IGZ1bmN0aW9uKG9sZCwgcGFnZSwgaXNMaW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IHBhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgbW9yZSBhbmltYXRlIGNzcyBjbGFzc2VzLCBpZiB5b3UgYXJlIHVzaW5nIG90aGVyIGNsYXNzZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI3BhZ2UtXCIrcGFnZStcIiAuYW5pbWF0ZUZhZGVJbkxlZnRcIikuYWRkQ2xhc3MoJ2FuaW1hdGVkIGZhZGVJbkxlZnQnKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI3BhZ2UtXCIrcGFnZStcIiAuYW5pbWF0ZUZhZGVJblJpZ2h0XCIpLmFkZENsYXNzKCdhbmltYXRlZCBmYWRlSW5SaWdodCcpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjcGFnZS1cIitwYWdlK1wiIC5hbmltYXRlRmFkZUluVXBcIikuYWRkQ2xhc3MoJ2FuaW1hdGVkIGZhZGVJblVwJykuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNwYWdlLVwiK3BhZ2UrXCIgLmFuaW1hdGVGYWRlSW5Eb3duXCIpLmFkZENsYXNzKCdhbmltYXRlZCBmYWRlSW5Eb3duJykuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNwYWdlLVwiK3BhZ2UrXCIgLmFuaW1hdGVGbGlwSW5YXCIpLmFkZENsYXNzKCdhbmltYXRlZCBmbGlwSW5YJykuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNwYWdlLVwiK3BhZ2UrXCIgLmFuaW1hdGVGbGlwSW5ZXCIpLmFkZENsYXNzKCdhbmltYXRlZCBmbGlwSW5ZJykuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNwYWdlLVwiK3BhZ2UrXCIgLmFuaW1hdGVCb3VuY2VJbkxlZnRcIikuYWRkQ2xhc3MoJ2FuaW1hdGVkIGJvdW5jZUluTGVmdCcpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjcGFnZS1cIitwYWdlK1wiIC5hbmltYXRlQm91bmNlSW5SaWdodFwiKS5hZGRDbGFzcygnYW5pbWF0ZWQgYm91bmNlSW5SaWdodCcpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNwYWdlLVwiK3BhZ2UrXCIgLmFuaW1hdGVGYWRlSW5MZWZ0XCIpLnJlbW92ZUNsYXNzKFwiYW5pbWF0ZUZhZGVJbkxlZnRcIikucmVtb3ZlQ2xhc3MoXCJhbmltYXRlZCBmYWRlSW5MZWZ0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjcGFnZS1cIitwYWdlK1wiIC5hbmltYXRlRmFkZUluUmlnaHRcIikucmVtb3ZlQ2xhc3MoXCJhbmltYXRlRmFkZUluUmlnaHRcIikucmVtb3ZlQ2xhc3MoXCJhbmltYXRlZCBmYWRlSW5SaWdodFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI3BhZ2UtXCIrcGFnZStcIiAuYW5pbWF0ZUZhZGVJblVwXCIpLnJlbW92ZUNsYXNzKFwiYW5pbWF0ZUZhZGVJblVwXCIpLnJlbW92ZUNsYXNzKFwiYW5pbWF0ZWQgZmFkZUluVXBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNwYWdlLVwiK3BhZ2UrXCIgLmFuaW1hdGVGYWRlSW5Eb3duXCIpLnJlbW92ZUNsYXNzKFwiYW5pbWF0ZUZhZGVJbkRvd25cIikucmVtb3ZlQ2xhc3MoXCJhbmltYXRlZCBmYWRlSW5Eb3duXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjcGFnZS1cIitwYWdlK1wiIC5hbmltYXRlRmxpcEluWFwiKS5yZW1vdmVDbGFzcyhcImFuaW1hdGVGbGlwSW5YXCIpLnJlbW92ZUNsYXNzKFwiYW5pbWF0ZWQgZmxpcEluWFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI3BhZ2UtXCIrcGFnZStcIiAuYW5pbWF0ZUZsaXBJbllcIikucmVtb3ZlQ2xhc3MoXCJhbmltYXRlRmxpcEluWVwiKS5yZW1vdmVDbGFzcyhcImFuaW1hdGVkIGZsaXBJbllcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNwYWdlLVwiK3BhZ2UrXCIgLmFuaW1hdGVCb3VuY2VJbkxlZnRcIikucmVtb3ZlQ2xhc3MoXCJhbmltYXRlQm91bmNlSW5MZWZ0XCIpLnJlbW92ZUNsYXNzKFwiYW5pbWF0ZWQgYm91bmNlSW5MZWZ0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjcGFnZS1cIitwYWdlK1wiIC5hbmltYXRlQm91bmNlSW5SaWdodFwiKS5yZW1vdmVDbGFzcyhcImFuaW1hdGVCb3VuY2VJblJpZ2h0XCIpLnJlbW92ZUNsYXNzKFwiYW5pbWF0ZWQgYm91bmNlSW5SaWdodFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChcIiNwYWdlLTJcIikuaXMoXCI6dmlzaWJsZVwiKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2tpbGxzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLiRza2lsbFdpZGdldHMuaHRtbChcIlwiKTsgLy9yZW1vdmluZyBhbHJlYWR5IGdlbmVyYXRlZCBjaXJjbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuJHNraWxsV2lkZ2V0cy5jaXJjbGlmdWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgICAgICBpbml0RXZlbnRzKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciAkc2xpZGVzID0gY29uZmlnLiRib29rQmxvY2suY2hpbGRyZW4oKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCBuYXZpZ2F0aW9uIGV2ZW50c1xuICAgICAgICAgICAgICAgIGNvbmZpZy4kbmF2TmV4dC5vbiggJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLiRib29rQmxvY2suYm9va2Jsb2NrKCAnbmV4dCcgKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2xvc2VzIHRoZSBSZXNwb25zaXZlIE1lbnUgb24gTWVudSBJdGVtIENsaWNrXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lbnVDb25maWcuJG5hdmJhckRyb3Bkb3duTWVudS5oYXNDbGFzcyhcImluXCIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudUNvbmZpZy4kbmF2YmFyVG9nZ2xlQnV0dG9uLnRyaWdnZXIoJ2NsaWNrJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gKTtcblxuICAgICAgICAgICAgICAgIGNvbmZpZy4kbmF2UHJldi5vbiggJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLiRib29rQmxvY2suYm9va2Jsb2NrKCAncHJldicgKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2xvc2VzIHRoZSBSZXNwb25zaXZlIE1lbnUgb24gTWVudSBJdGVtIENsaWNrXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lbnVDb25maWcuJG5hdmJhckRyb3Bkb3duTWVudS5oYXNDbGFzcyhcImluXCIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudUNvbmZpZy4kbmF2YmFyVG9nZ2xlQnV0dG9uLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSApO1xuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gYWRkIHN3aXBlIGV2ZW50c1xuICAgICAgICAgICAgICAgICRzbGlkZXMub24oIHtcbiAgICAgICAgICAgICAgICAgICAgJ3N3aXBlbGVmdCcgOiBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuJGJvb2tCbG9jay5ib29rYmxvY2soICduZXh0JyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnc3dpcGVyaWdodCcgOiBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuJGJvb2tCbG9jay5ib29rYmxvY2soICdwcmV2JyApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSApO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIGtleWJvYXJkIGV2ZW50c1xuICAgICAgICAgICAgICAgICQoIGRvY3VtZW50ICkua2V5ZG93biggZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3cgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA6IDM3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwIDogMzgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQgOiAzOSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3duIDogNDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGFycm93LmxlZnQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLiRib29rQmxvY2suYm9va2Jsb2NrKCAncHJldicgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgYXJyb3cucmlnaHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLiRib29rQmxvY2suYm9va2Jsb2NrKCAnbmV4dCcgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vbWVudSBpdGVtXG4gICAgICAgICAgICBjdXJyZW50ID0gMDtcbiAgICAgICAgICAgIG1lbnVDb25maWcuJG1lbnVJdGVtcy5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbCA9ICQoIHRoaXMgKSxcbiAgICAgICAgICAgICAgICAgICAgaWR4ID0gJGVsLmF0dHIoXCJkYXRhLXBhZ2VcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlYWNoZWRUb1BhZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25maWcuJGJvb2tCbG9jay5ib29rYmxvY2soICdqdW1wJyxpZHggICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2Fib3V0IG1lbnUgLSBob21lXG4gICAgICAgICAgICBtZW51Q29uZmlnLiRhYm91dE1lbnVJdGVtLm9uKCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuJGJvb2tCbG9jay5ib29rYmxvY2soICduZXh0JyApO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4geyBpbml0IDogaW5pdCB9O1xuXG4gICAgfSkoKTtcblxuXG5cbiAgICAvKipcbiAgICAgKiBPdXIgYXBwbGljYXRpb24gbW9kdWxlIC0gbWFuYWdlcyBhbGwgdGhlIGVsZW1lbnRzIGluIGFsbCBwYWdlc1xuICAgICAqL1xuICAgIHZhciBVbHRyYUFwcCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWxSZWYgPSAkKCdodG1sJyk7XG4gICAgICAgIHZhciB3aW5kb3dSZWYgPSAkKHdpbmRvdyk7XG4gICAgICAgIHZhciBib2R5UmVmID0gJCgnaHRtbCwgYm9keScpO1xuICAgICAgICB2YXIgZG9jUmVmID0gJChkb2N1bWVudCk7XG4gICAgICAgIHZhciBwcmVsb2FkZXJBcmVhID0gJCgnLmNvdmVyJyk7XG4gICAgICAgIHZhciBoZWFkZXJBcmVhID0gJCgnLmhlYWRlci10b3AtYXJlYScpO1xuICAgICAgICB2YXIgc21vdGhTY3JvbGxFbHMgPSAkKCdhLnNtb3RoLXNjcm9sbCcpO1xuICAgICAgICB2YXIgd29ya0NvbnRhaW5lciA9ICQoJy53b3JrLWlubmVyJyk7XG4gICAgICAgIHZhciB3b3JrUG9wdXAgPSAkKCcud29yay1wb3B1cCcpO1xuICAgICAgICB2YXIgdGVzdGltb25pYWxMaXN0ID0gJChcIi50ZXN0aW1vbmlhbC1saXN0XCIpO1xuICAgICAgICB2YXIgbmF2YmFyVG9nZ2xlID0gJChcIi5uYXZiYXItY29sbGFwc2UuaW5cIik7XG4gICAgICAgIHZhciBncmlkQ29udGFpbmVycyA9ICQoJy5ncmlkJyk7XG4gICAgICAgIHZhciBwb3J0Zm9saW9GaWx0ZXIgPSAkKFwiLmZpbC1jYXRcIik7XG4gICAgICAgIHZhciBwb3J0Zm9saW9Db250YWluZXIgPSAkKFwiLmxycy1wcm9qZWN0c1wiKTtcbiAgICAgICAgdmFyIHBvcnRmb2xpb1Byb2plY3QgPSAkKFwiLmxycy1wcm9qZWN0XCIpO1xuXG5cbiAgICAgICAgLy9pbml0cyB3aWRnZXRzXG4gICAgICAgIHZhciBpbml0V2lkZ2V0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy90b29sdGlwXG4gICAgICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xuXG4gICAgICAgICAgICAvL3BvcG92ZXJcbiAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKHtcbiAgICAgICAgICAgICAgICAndHJpZ2dlcic6ICdob3ZlcicsXG4gICAgICAgICAgICAgICAgJ2h0bWwnOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIjxpbWcgY2xhc3M9J2ltZy1yZXNwb25zaXZlJyBzcmM9J1wiICsgJCh0aGlzKS5kYXRhKCdpbWFnZVVybCcpICsgXCInPjxzcGFuPlBvcG92ZXIgY29udGVudCwgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdDwvc3Bhbj5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvL2luaXQgcG9yZm9saW9cbiAgICAgICAgdmFyIGluaXRQb3J0Zm9saW9HcmlkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL21hc3NvbmFyeSAtIHBvcnRmb2xpb1xuICAgICAgICAgICAgZ3JpZENvbnRhaW5lcnMubWFzb25yeSh7XG4gICAgICAgICAgICAgICAgLy8gc2V0IGl0ZW1TZWxlY3RvciBzbyAuZ3JpZC1zaXplciBpcyBub3QgdXNlZCBpbiBsYXlvdXRcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcuZ3JpZC1pdGVtJyxcbiAgICAgICAgICAgICAgICAvLyB1c2UgZWxlbWVudCBmb3Igb3B0aW9uXG4gICAgICAgICAgICAgICAgY29sdW1uV2lkdGg6ICcuZ3JpZC1zaXplcicsXG4gICAgICAgICAgICAgICAgcGVyY2VudFBvc2l0aW9uOiB0cnVlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy9hY3RpdmF0ZSBmaWx0ZXJzXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRDbGFzcyA9IFwiXCI7XG4gICAgICAgICAgICBwb3J0Zm9saW9GaWx0ZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHBvcnRmb2xpb0ZpbHRlci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDbGFzcyA9ICQodGhpcykuYXR0cihcImRhdGEtcmVsXCIpO1xuICAgICAgICAgICAgICAgIHBvcnRmb2xpb0NvbnRhaW5lci5mYWRlVG8oMTAwLCAwLjEpO1xuICAgICAgICAgICAgICAgIHBvcnRmb2xpb1Byb2plY3Qubm90KFwiLlwiICsgc2VsZWN0ZWRDbGFzcykuZmFkZU91dCgpLnJlbW92ZUNsYXNzKCdzY2FsZS1hbm0nKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIi5cIiArIHNlbGVjdGVkQ2xhc3MpLmZhZGVJbigpLmFkZENsYXNzKCdzY2FsZS1hbm0nKTtcbiAgICAgICAgICAgICAgICAgICAgcG9ydGZvbGlvQ29udGFpbmVyLmZhZGVUbygzMDAsIDEpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vb24gZG9jdW1lbnQgcmVhZHkgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdmFyIG9uRG9jUmVhZHkgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvL3Ntb290aCBzY3JvbGxcbiAgICAgICAgICAgIHNtb3RoU2Nyb2xsRWxzLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYW5jaG9yID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICBib2R5UmVmLnN0b3AoKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKGFuY2hvci5hdHRyKCdocmVmJykpLm9mZnNldCgpLnRvcCAtIDUwXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAvL3N0ZWxsYXIgcGFyYWxsYXggZWZmZWN0c1xuICAgICAgICAgICAgIHdpbmRvd1JlZi5zdGVsbGFyKHtcbiAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgcG9zaXRpb25Qcm9wZXJ0eTogJ3Bvc2l0aW9uJyxcbiAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbFNjcm9sbGluZzogZmFsc2VcbiAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy93b3JrIHNlY3Rpb25cbiAgICAgICAgICAgIHdvcmtDb250YWluZXIubWl4SXRVcCgpO1xuXG4gICAgICAgICAgICAvL3BvcnRmb2xpbyBpdGVtIHBvcHVwXG4gICAgICAgICAgICB3b3JrUG9wdXAubWFnbmlmaWNQb3B1cChcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICAgICAgICAgICAgICAgIHJlbW92YWxEZWxheTogMzAwLFxuICAgICAgICAgICAgICAgICAgICBtYWluQ2xhc3M6ICdtZnAtd2l0aC16b29tJyxcbiAgICAgICAgICAgICAgICAgICAgZ2FsbGVyeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB6b29tOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLCAvLyBCeSBkZWZhdWx0IGl0J3MgZmFsc2UsIHNvIGRvbid0IGZvcmdldCB0byBlbmFibGUgaXRcblxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDMwMCwgLy8gZHVyYXRpb24gb2YgdGhlIGVmZmVjdCwgaW4gbWlsbGlzZWNvbmRzXG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNpbmc6ICdlYXNlLWluLW91dCcsIC8vIENTUyB0cmFuc2l0aW9uIGVhc2luZyBmdW5jdGlvblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgXCJvcGVuZXJcIiBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIHRoZSBlbGVtZW50IGZyb20gd2hpY2ggcG9wdXAgd2lsbCBiZSB6b29tZWQgaW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCB0byB3aGljaCBwb3B1cCB3aWxsIGJlIHNjYWxlZCBkb3duXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBCeSBkZWZhaWx0IGl0IGxvb2tzIGZvciBhbiBpbWFnZSB0YWc6XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuZXI6IGZ1bmN0aW9uIChvcGVuZXJFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3BlbmVyRWxlbWVudCBpcyB0aGUgZWxlbWVudCBvbiB3aGljaCBwb3B1cCB3YXMgaW5pdGlhbGl6ZWQsIGluIHRoaXMgY2FzZSBpdHMgPGE+IHRhZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHlvdSBkb24ndCBuZWVkIHRvIGFkZCBcIm9wZW5lclwiIG9wdGlvbiBpZiB0aGlzIGNvZGUgbWF0Y2hlcyB5b3VyIG5lZWRzLCBpdCdzIGRlZmFpbHQgb25lLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcGVuZXJFbGVtZW50LmlzKCdpbWcnKSA/IG9wZW5lckVsZW1lbnQgOiBvcGVuZXJFbGVtZW50LmZpbmQoJ2ltZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL3Rlc3RpbW9uaWFsc1xuICAgICAgICAgICAgdGVzdGltb25pYWxMaXN0Lm93bENhcm91c2VsKHtcbiAgICAgICAgICAgICAgICBpdGVtczogMSxcbiAgICAgICAgICAgICAgICBhdXRvUGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpdGVtc0Rlc2t0b3A6IFsxMTk5LCAxXSxcbiAgICAgICAgICAgICAgICBpdGVtc0Rlc2t0b3BTbWFsbDogWzk4MCwgMV0sXG4gICAgICAgICAgICAgICAgaXRlbXNUYWJsZXQ6IFs3NjgsIDFdLFxuICAgICAgICAgICAgICAgIGl0ZW1zVGFibGV0U21hbGw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGl0ZW1zTW9iaWxlOiBbNDc5LCAxXSxcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy9uYXZiYXIgLSBzbWFsbCBkZXZpY2VcbiAgICAgICAgICAgIG5hdmJhclRvZ2dsZS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5pcygnYScpICYmICQoZS50YXJnZXQpLmF0dHIoJ2NsYXNzJykgIT0gJ2Ryb3Bkb3duLXRvZ2dsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jb2xsYXBzZSgnaGlkZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL2FjdGl2YXRlIG1lbnUgaXRlbSBiYXNlZCBvbiBzY3JvbGxlZCBzZWN0aW9uXG4gICAgICAgICAgICBib2R5UmVmLnNjcm9sbHNweSh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiAnLm5hdmJhci1jb2xsYXBzZScsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAxOTVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL3BvcnRmb2xpb1xuICAgICAgICAgICAgaW5pdFBvcnRmb2xpb0dyaWQoKTtcblxuICAgICAgICAgICAgLy93aWRnZXRzXG4gICAgICAgICAgICBpbml0V2lkZ2V0cygpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy9vbiB3aW5kb3cgbG9hZCBjYWxsIGJhY2sgZnVuY3Rpb25cbiAgICAgICAgdmFyIG9uV2luTG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIC8vIHByZWxvYWRlciAtIGhhbmRsaW5nXG4gICAgICAgICAgICBwcmVsb2FkZXJBcmVhLmRlbGF5KDEwMDApLmZhZGVPdXQoMjAwMCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy9vbiB3aW5kb3cgc2Nyb2xsIGNhbGwgYmFjayBmdW5jdGlvblxuICAgICAgICB2YXIgb25XaW5TY3JvbGwgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvL2hlYWRlclxuICAgICAgICAgICAgaWYgKHdpbmRvd1JlZi5zY3JvbGxUb3AoKSA+IDIwMCkge1xuICAgICAgICAgICAgICAgIGhlYWRlckFyZWEuYWRkQ2xhc3MoJ21lbnUtYmcnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyQXJlYS5yZW1vdmVDbGFzcygnbWVudS1iZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vYmluZHMgdGhlIGV2ZW50cyB0byByZXF1aXJlZCBlbGVtZW50c1xuICAgICAgICB2YXIgYmluZEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jUmVmLm9uKCdyZWFkeScsIG9uRG9jUmVhZHkpO1xuICAgICAgICAgICAgd2luZG93UmVmLm9uKCdsb2FkJywgb25XaW5Mb2FkKTtcbiAgICAgICAgICAgIHdpbmRvd1JlZi5vbignc2Nyb2xsJywgb25XaW5TY3JvbGwpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGluaXQgLSBpbml0aWxpemVzIHZhcmlvdXMgd2lkZ2V0cywgZWxlbWVudHMsIGV2ZW50cywgZXRjXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBiaW5kRXZlbnRzKCk7XG4gICAgICAgICAgICAvL2luaXQgcGFnZSBhcHBcbiAgICAgICAgICAgIFBhZ2UuaW5pdCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbml0OiBpbml0XG4gICAgICAgIH07XG4gICAgfSgpKTtcblxuICAgIC8vaW5pdCBhcHBcbiAgICBVbHRyYUFwcC5pbml0KCk7XG59KSgpOyJdfQ==
