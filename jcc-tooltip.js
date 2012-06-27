/**
 *  Project: jcc tooltip
 *  Description: Generate an text, image or ajax tooltip
 *  Author: Martin von Loh 
 *  Version: 1.3
 *  Dual MIT/BSD license
 */
;(function($, window, document, undefined) {
    var pluginName = 'jcctooltip',
    defaults = {
        id: "tooltip",
        hintergrund: "#ffffff",
        schriftfarbe: "#444444",
        rand: "2px #ABABAB solid",
        eckenradius: 4,
        zeit: 300,
        imagewidth: 160,
        tooltipid: 'tooltip',
        tooltippadding : '7px 10px',
        tooltipfontsize: '12px',
        tooltipfontfamily:"Tahoma, Helvetica, sans-serif",
        inhalt: $(this).attr('rel'),
        dataType: 'GET',
        ajaxType: 'html'
        
    };
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        defaults = this.options;
        this.init();
    }
    var zeigeTooltip = function(evt, zeit, inhalt) {
        $("<div>", {
            id: defaults.tooltipid,
            css: {
                position: "absolute",
                left: evt.pageX + 20,
                top: evt.pageY + 20,
                padding: defaults.tooltippadding,
                background: defaults.hintergrund,
                color: defaults.schriftfarbe,
                fontFamily: defaults.tooltipfontfamily,
                fontSize: defaults.tooltipfontsize,
                border: defaults.rand,
                display: "none",
                "-moz-border-radius": defaults.eckenradius,
                "-webkit-border-radius": defaults.eckenradius,
                "-webkit-box-shadow": "0px 0px 4px 0px rgba(0, 0, 0, 0.3)",
                "-moz-box-shadow": "0px 0px 4px 0px rgba(0, 0, 0, 0.3)",
                "box-shadow": "0px 0px 4px 0px rgba(0, 0, 0, 0.3)"
            },
            html: inhalt
        })
        .appendTo("body")
        .fadeIn(zeit);
    }
    var checkinhalt = function(inhalt, callback) {
        if(inhalt.substr(0, 4)== 'http'){
            $.ajax({
                type: defaults.dataType,
                url: inhalt,
                dataType: defaults.ajaxType,
                success: function(data) {
                    inhalt = data;
                    callback(inhalt);
                }
            });
        }
        else{
            var extension = inhalt.substr((inhalt.lastIndexOf('.') + 1));
            switch (extension) {
            case 'JPG':
            case 'jpg':
            case 'JPEG':
            case 'jpeg':
            case 'PNG':
            case 'png':
            case 'GIF':
            case 'gif':
                callback( '<img src="' + inhalt + '" width="' + defaults.imagewidth + '" />');
                break;
            default:
                callback(inhalt);
            } 
        }
        
    };
    Plugin.prototype.init = function() {
        };
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                $(this).bind({
                    mouseenter: function(evt) {
                        if ($("#tooltip").css("opacity") != 0) {
                            $("#tooltip").stop().remove();
                        }
                        checkinhalt($(this).attr('rel'), function(value){
                            zeigeTooltip(evt, defaults.zeit, value, options);
                        });
                    },
                    mouseleave: function() {
                        $("#tooltip").fadeOut(
                        defaults.zeit,
                        function() {
                            $(this).remove();
                        }
                        );
                    },
                    mousemove: function(evt) {
                        $("#tooltip").css({
                            left: evt.pageX + 20,
                            top: evt.pageY + 20
                        });
                    }
                });
            }
        });
    }
})(jQuery, window, document);