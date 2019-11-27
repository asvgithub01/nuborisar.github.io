var Animation = function(firstElementTop, firstElementLeft, firstElementHeight) {
    this.SHOW_ANIMATION="show";
    this.UP_ANIMATION="up";
    this.HIDE_ANIMATION="hide";
    this.FADEIN_ANIMATION="fadein";
    this.FADETOGGLE_ANIMATION="fadetoggle";
    this.screen;
    this.velocity = 400;
    this.firstElementTop = firstElementTop;
    this.firstElementLeft = firstElementLeft;
    this.firstElementHeight = firstElementHeight;
    this.footer = $("#footer-calculator");
    this.currentAnim = 0;
    this.startedAnimation=false;
    this.checkPassScreen = function(screen) {
        if (this.screen === screen)
            return false;
        return true;
    };
    this.clear=function(){
        this.screen="";
    }
    this.startAnimation = function(data) {
        var obj = this;
        var end = false;
        var screen = data["screen"];       
        if (this.currentAnim === 0 && !this.checkPassScreen(screen))return;
        if(this.screen !== screen && this.startedAnimation)return;
        this.startedAnimation=true;
        this.screen=screen;       
        if (this.currentAnim === 0) {
            if("before" in data){
                var before=data["before"];
                before();
            }
                
        }      
        if (this.currentAnim === (data["animation"].length - 1)) {
            end = true;
        }
        var object = data["animation"][this.currentAnim]["type"];
        var callback = data["callback"];
        var elements = data["animation"][this.currentAnim]["elements"];
        if (object === obj.SHOW_ANIMATION) {
            if ("afterStart" in data["animation"][this.currentAnim]) {
                data["animation"][this.currentAnim]["afterStart"];
            }
            this.showElements(elements, callback, end, function() {
                obj.startAnimation(data);
            });
        }
        if (object === obj.UP_ANIMATION) {
            if ("afterStart" in data["animation"][this.currentAnim]) {
                data["animation"][this.currentAnim]["afterStart"];
            }
            this.upElements(elements, callback, end, function() {
                obj.startAnimation(data);
            });
        }
        if (object === obj.HIDE_ANIMATION) {
            if ("afterStart" in data["animation"][this.currentAnim]) {
                data["animation"][this.currentAnim]["afterStart"];
            }
            var inHide;
            if ("inHide" in data["animation"][this.currentAnim]) {
                inHide=data["animation"][this.currentAnim]["inHide"];
            }
            this.hideElements(elements, callback, end, function() {
                obj.startAnimation(data);
            },inHide);
        }
        if (object === obj.FADEIN_ANIMATION){
            var afterShow;
            if ("afterShow" in data["animation"][this.currentAnim]) {
                afterShow=data["animation"][this.currentAnim]["afterShow"];
            }
            this.fadeInElements(elements, callback, end, function() {
                if(afterShow !== undefined)afterShow();
                obj.startAnimation(data);
            });
        }
        if (object === obj.FADETOGGLE_ANIMATION){
            var inHide;
            if ("inHide" in data["animation"][this.currentAnim]) {
                inHide=data["animation"][this.currentAnim]["inHide"];
            }
            this.fadeToggleElements(elements, callback, end, function() {
                if(inHide !== undefined)inHide();                
                obj.startAnimation(data);
            });
        }
    };

    this.endAnimation = function() {
        this.currentAnim = 0;
        this.startedAnimation=false;
    };
    
    this.showElements = function(menuShow, afterAnim, endanimation, other) {
        var info = [];
        var obj = this;
        this.currentAnim++;
        for (var x = 0; x < menuShow.length; x++) {
            $(menuShow[x]).show();
            var top = $(menuShow[x]).offset().top;
            var left = $(menuShow[x]).offset().left;
            var width = $(menuShow[x]).width();
            info[x] = {"name": menuShow[x], "width": width, "left": left, "top": top};
        }
        for (var x = 0; x < info.length; x++) {
            var anim = info[x]["name"];
            var top2 = info[x]["top"];
            var left2 = info[x]["left"];
            var width2 = info[x]["width"];
            $(anim).attr("style", "position:absolute;left:-" + width2 + "px;top:" + top2 + "px;width:" + width2 + "px;");
            if (endanimation) {
                if (x === (info.length - 1)) {
                    $(anim).animate({"left": "+=" + (left2 + width2) + "px"}, (x + 1) * this.velocity, 'swing', function() {
                        $(this).attr("style", "");
                        afterAnim();
                        obj.endAnimation();
                    });
                } else {
                    $(anim).animate({"left": "+=" + (left2 + width2) + "px"}, (x + 1) * this.velocity, 'swing', function() {
                        var temp_top = ($("#calculator-one-screen-result").height()+5);
                        if(anim == "#calculator-one-screen-result" &&
                          parseInt($("#footer-calculator").css("margin-top").replace("px","")) > 10){
                          $("#footer-calculator").css("margin-top",(temp_top+5)+"px");
                        }
                        $(this).attr("style", "");
                    });
                }
            } else {
                if (x === (info.length - 1)) {
                    $(anim).animate({"left": "+=" + (left2 + width2) + "px"}, (x + 1) * this.velocity, 'swing', function() {
                        $(this).attr("style", "");
                        other();
                    });
                } else {
                    $(anim).animate({"left": "+=" + (left2 + width2) + "px"}, (x + 1) * this.velocity, 'swing', function() {
                        $(this).attr("style", "");
                    });
                }
            }
        }
    };
    this.hideElements = function(animationHide, afterAnim, endanimation, other,inHide) {
        var info = [];
        var obj = this;
        this.currentAnim++;
        for (var x = 0; x < animationHide.length; x++) {
            $(animationHide[x]).show();
            var top = $(animationHide[x]).offset().top;
            var left = $(animationHide[x]).offset().left;
            var width = $(animationHide[x]).width();
            info[x] = {"name": animationHide[x], "width": width, "left": left, "top": top};
        }

        for (var x = 0; x < info.length; x++) {
            var anim = info[x]["name"];
            var top = info[x]["top"];
            var left = info[x]["left"];
            var width = info[x]["width"];
            
            $(anim).attr("style", "z-index:"+(x+1)+";position:absolute;left:" + left + "px;top:" + top + "px;width:" + width + "px;");
            if (endanimation) {
                if (x === (info.length - 1)) {
                    $(anim).animate({"left": "+=" + (left + width) + "px"}, (x + 1) * this.velocity, 'swing', function() {
                        $(this).attr("style", "");
                        $(this).hide();
                        if(inHide!==undefined){
                            inHide();
                        }
                        afterAnim();
                        obj.endAnimation();
                    });
                } else {
                    $(anim).animate({"left": "+=" + (left + width) + "px"}, (x + 1) * this.velocity, 'swing', function() {
                        $(this).attr("style", "");
                        $(this).hide();
                        if(inHide!==undefined){
                            inHide();
                        }
                    });
                }
            } else {
                if (x === (info.length - 1)) {
                    $(anim).animate({"left": "+=" + (left + width) + "px"}, (x + 1) * this.velocity, 'swing', function() {
                        $(this).attr("style", "");
                        $(this).hide();
                        if(inHide!==undefined){
                            inHide();
                        }
                        other();
                    });
                } else {
                    $(anim).animate({"left": "+=" + (left + width) + "px"}, (x + 1) * this.velocity, 'swing', function() {
                        $(this).attr("style", "");
                        $(this).hide();
                        if(inHide!==undefined){
                            inHide();
                        }
                    });
                }
            }
        }
    };
    this.upElements = function(elements, callback, end, other) {
        this.currentAnim++;
        var obj=this;
        var elementTop=$(elements).offset().top;
        $(elements).animate({"top": "-=" + (elementTop-this.firstElementTop ) + "px"},
            this.velocity, 'swing', function() {
                if (end) {
                   $(this).attr("style", "");
                   callback();
                   obj.endAnimation();
                } else {
                    $(this).attr("style", "");
                   other();
                }
        });
    };
    this.downElements = function(elements, callback, end, other) {
        this.currentAnim++;
        var obj=this;
        var width=$(elements).width();
        var left=$(elements).offset().left;
        var top=-$(elements).height();
        $(elements).attr("style", "z-index:"+(x+1)+";position:absolute;left:" + left + "px;top:" + top + "px;width:" + width + "px;");
        $(elements).animate({"top": "+=" + (elementTop) + "px"},
            this.velocity, 'swing', function() {
                if (end) {
                    $(this).attr("style", "");
                    callback();
                    obj.endAnimation();
                } else {
                    $(this).attr("style", "");
                    other();
                }
        });      
    };
    this.fadeInElements = function(elements, callback, end, other){
        this.currentAnim++; 
        var obj=this;
        for (var x = 0; x < elements.length; x++) {
            $( elements[x] ).fadeIn( "fast", function() {
                if (end) {
                    callback();
                    obj.endAnimation();
                } else {
                    other();
                }
            });
        }
    };
    this.fadeToggleElements = function(elements, callback, end, other){
        this.currentAnim++;
        var obj=this;
        for (var x = 0; x < elements.length; x++) {
            $( elements[x] ).fadeToggle( "fast", function() {
                if (end) {
                    callback();
                    obj.endAnimation();
                } else {
                    other();
                }
            });
        }
    };
};