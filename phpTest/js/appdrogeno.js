var Screen = function() {
    this.MENU_ITEMS = {
        CALCULATOR_3D: "#calculator-3d",
        CALCULATOR_CALCULATORS: "#calculator-calculators",
        CALCULATOR_REPORTS: "#calculator-reports",
        CALCULATOR_CALCULATORS_ONE: "#calculator-one",
        CALCULATOR_CALCULATORS_TWO: "#calculator-two",
        CALCULATOR_CALCULATORS_THREE: "#calculator-three",
        CALCULATOR_CALCULATORS_FOUR: "#calculator-four",
        CALCULATOR_CALCULATORS_FIVE: "#calculator-five-screen",
        CALCULATOR_CALCULATORS_SIX: "#calculator-six-screen",
        CALCULATOR_CALCULATORS_SEVEN: "#calculator-seven-screen"
    };
    this.SUB_ITEMS = {
        ITEM_3D: "#calculator-3d-screen",
        ITEM_REPORTS: "#calculator-reports-screen",
        ITEM_CALCULATORS_ONE_BUTTON: "#calculator-one",
        ITEM_CALCULATORS_TWO_BUTTON: "#calculator-two",
        ITEM_CALCULATORS_THREE_BUTTON: "#calculator-three",
        ITEM_CALCULATORS_ONE: "#calculator-one-screen",
        ITEM_CALCULATORS_TWO: "#calculator-two-screen",
        ITEM_CALCULATORS_THREE: "#calculator-three-screen",
        ITEM_CALCULATORS_FOUR: "#calculator-four-screen",
        ITEM_CALCULATORS_ONE_RESULT: "#calculator-one-screen-result",
        ITEM_CALCULATORS_TWO_RESULT: "#calculator-two-screen-result",
        ITEM_CALCULATORS_THREE_RESULT: "#calculator-three-screen-result",
        ITEM_CALCULATORS_FOUR_RESULT: "#calculator-four-screen-result",
        ITEM_CALCULATORS_FIVE_RESULT: "#calculator-five-screen-result",
        ITEM_CALCULATORS_SIX_RESULT: "#calculator-six-screen-result",
        ITEM_CALCULATORS_SEVEN_RESULT: "#calculator-seven-screen-result"
    };
    this.FOOTER = {
        LOGO: "#footer-logo",
        BUTTONS: "#calculator-button",
        EXPECIALBUTTON:"#calculator-expecial-button"
    };
    $(document).ready(function(){
        $(".onlyNumber").each(function(){
            $(this).keydown(function (e) {
                // Allow: backspace, delete, tab, escape, enter and .
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                     // Allow: Ctrl+A
                    (e.keyCode == 65 && e.ctrlKey === true) ||
                     // Allow: Ctrl+C
                    (e.keyCode == 67 && e.ctrlKey === true) ||
                     // Allow: Ctrl+X
                    (e.keyCode == 88 && e.ctrlKey === true) ||
                     // Allow: home, end, left, right
                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                         // let it happen, don't do anything
                         return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });
        });
    });
};

Screen.prototype.goBack=function(callback){
    animation.screen="";
    callback();
};
Screen.prototype.init = function() {
     
};
Screen.prototype.reset = function() {
    for (var sp in this.MENU_ITEMS) {
        $(this.MENU_ITEMS[sp]).show();
        $(this.MENU_ITEMS[sp]+ " .menu-calculator-item-group").show();
        $(this.MENU_ITEMS.CALCULATOR_3D + " .menu-calculator-item-group").css("cursor","pointer"); 
    }
    for (var sp in this.SUB_ITEMS) {
        $(this.SUB_ITEMS[sp]).hide();
    }
    $(this.FOOTER.BUTTONS).html("");
    $(this.FOOTER.EXPECIALBUTTON).html("");
};
Screen.prototype.hideAll = function() {
    for (var sp in this.MENU_ITEMS) {
        $(this.MENU_ITEMS[sp]).hide();
    }
    for (var sp in this.SUB_ITEMS) {
        $(this.SUB_ITEMS[sp]).hide();
    }
};
Screen.prototype.createButton = function(dom, id, label, classe, attrs) {
    if (attrs === undefined)
        attrs = "";
    if (label.length < 15) {
        $(dom).append("<button " + attrs + " type='button' id='" + id.replace("#", "") + "' class='" + classe + "'>" + label + "</button>");
    } else {
        $(dom).append("<button " + attrs + " type='button' id='" + id.replace("#", "") + "' class='" + classe + " little-font'>" + label + "</button>");
    }
};
Screen.prototype.finish = function(hide){
    var obj=this; 
    animation.startAnimation(
            {"screen": "calculatorCalculatorFinish",
                "callback": function(){
                    obj.reset(); 
                },
                "animation":
                        [   
                            {
                                "type": "hide",
                                "elements": hide
                            },
                            {
                                "type": "show",
                                "elements": [obj.MENU_ITEMS.CALCULATOR_3D, obj.MENU_ITEMS.CALCULATOR_CALCULATORS, obj.MENU_ITEMS.CALCULATOR_REPORTS]
                            }
                        ]
            });
};
Screen.prototype.changeTitle=function(title){
    document.title=lang[title];
    googleAnalytic();
};
var Screen3d = function() {};
Screen3d.prototype = new Screen();
Screen3d.prototype.constructor = Screen3d;
Screen3d.prototype.init = function() {
    var obj = this;
    $(this.MENU_ITEMS.CALCULATOR_3D).click(function() {
        obj.changeTitle('Calculator 3d');
        $(obj.MENU_ITEMS.CALCULATOR_3D + " .menu-calculator-item-group").css("cursor","auto");  
        var callback = function() {
                obj.createButton(obj.FOOTER.BUTTONS, "home-button", "", "home-button");
                $("#home-button").click(function() {
                    obj.changeTitle('AppName');
                    obj.goBack(function(){
                        animation.startAnimation(
                        {"screen": "calculator3dBack",
                            "callback": function(){obj.reset();},
                            "animation":
                                    [{
                                            "type": "hide",
                                            "elements": [obj.SUB_ITEMS.ITEM_3D]
                                        },
                                        {
                                            "type": "show",
                                            "elements": [obj.MENU_ITEMS.CALCULATOR_CALCULATORS, obj.MENU_ITEMS.CALCULATOR_REPORTS]
                                        }
                                    ]
                        });
                    });
                });
                $(obj.SUB_ITEMS.ITEM_3D).show();
            };
            animation.startAnimation(
            {"screen": "calculator3d",
                "callback": callback,
                "animation":
                        [{
                                "type": "hide",
                                "elements": [obj.MENU_ITEMS.CALCULATOR_CALCULATORS, obj.MENU_ITEMS.CALCULATOR_REPORTS]
                            },
                            {
                                "type": "show",
                                "elements": [obj.SUB_ITEMS.ITEM_3D]
                            }
                        ]
            });

        
    });

};


var ScreenCalculators = function() {};
ScreenCalculators.prototype = new Screen();
ScreenCalculators.prototype.constructor = ScreenCalculators;
ScreenCalculators.prototype.init = function() {
    var obj = this;
    $(this.MENU_ITEMS.CALCULATOR_CALCULATORS + " .menu-calculator-item-group").click(function() {
        obj.changeTitle('Calculator Calculators');
        animation.startAnimation(
        {
            "screen": "calculatorCalculators",
            "callback": function() {
                obj.printScreen();
            },
            "animation":
            [
                {
                    "type": "hide",
                    "elements": [obj.MENU_ITEMS.CALCULATOR_3D, obj.MENU_ITEMS.CALCULATOR_CALCULATORS, obj.MENU_ITEMS.CALCULATOR_REPORTS]
                },
                {
                    "type": "show",
                    "elements": [obj.MENU_ITEMS.CALCULATOR_CALCULATORS_ONE, obj.MENU_ITEMS.CALCULATOR_CALCULATORS_TWO, obj.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE]
                }
            ]
        });



    });
};
ScreenCalculators.prototype.printScreen = function() {
    var obj = this;
    obj.hideAll();
    $(obj.MENU_ITEMS.CALCULATOR_CALCULATORS).hide();
    $(obj.MENU_ITEMS.CALCULATOR_CALCULATORS_ONE).show();
    $(obj.MENU_ITEMS.CALCULATOR_CALCULATORS_TWO).show();
    $(obj.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE).show();
    obj.createButton(obj.FOOTER.BUTTONS, "home-button", "", "home-button");
    $("#home-button").click(function() {
        obj.goBack(function(){
            obj.changeTitle('AppName');
            animation.startAnimation(
            {"screen": "calculatorCalculatorBack",
                "callback": function(){obj.reset();},
                "animation":
                        [
                            {
                                "type": "hide",
                                "elements": [obj.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE, obj.MENU_ITEMS.CALCULATOR_CALCULATORS_TWO, obj.MENU_ITEMS.CALCULATOR_CALCULATORS_ONE]
                            },
                            {
                                "type": "show",
                                "elements": [obj.MENU_ITEMS.CALCULATOR_3D, obj.MENU_ITEMS.CALCULATOR_CALCULATORS, obj.MENU_ITEMS.CALCULATOR_REPORTS]
                            }
                        ]
            });
        });
    });
};

var ScreenReports = function() {};
ScreenReports.prototype = new Screen();
ScreenReports.prototype.constructor = ScreenReports;
ScreenReports.prototype.init = function() {
    var obj = this;
    $(this.MENU_ITEMS.CALCULATOR_REPORTS + " .menu-calculator-item-group").click(function() {
            obj.changeTitle('Calculator tratament');
            $(obj.MENU_ITEMS.CALCULATOR_REPORTS + " .menu-calculator-item-group").css("cursor","auto");  
            var elements=obj.MENU_ITEMS.CALCULATOR_REPORTS;
            var left = $(elements).offset().left;
            var width = $(elements).width();
            var top = $(elements).offset().top;
            $(elements).css("position", "absolute");
            $(elements).css("left", left + "px");
            $(elements).css("width", width + "px");
            $(elements).css("top", top + "px");
            animation.startAnimation(
            {
                "screen": "calculatorReports",
                "callback": function() {
                    obj.createButton(obj.FOOTER.BUTTONS, "home-button", "", "home-button");
                    $("#home-button").click(function() {
                        obj.changeTitle('AppName');
                        obj.goBack(function(){
                            animation.startAnimation(
                            {
                                "screen": "calculatorReportsBack",
                                "callback": function() {
                                    obj.reset();
                                },
                                "animation":
                                    [
                                        {
                                            "type": "hide",
                                            "elements": [obj.SUB_ITEMS.ITEM_REPORTS,obj.MENU_ITEMS.CALCULATOR_REPORTS+" .menu-calculator-item-group"]
                                        },
                                        {
                                            "type": "show",
                                            "elements": [obj.MENU_ITEMS.CALCULATOR_3D,obj.MENU_ITEMS.CALCULATOR_CALCULATORS,obj.MENU_ITEMS.CALCULATOR_REPORTS+" .menu-calculator-item-group"]
                                        }
                                    ] 
                            });
                        });
                    });
                },
                "animation":
                    [
                        {
                            "type": "hide",
                            "elements": [obj.MENU_ITEMS.CALCULATOR_CALCULATORS, obj.MENU_ITEMS.CALCULATOR_3D]
                        },
                        {
                            "type": "up",
                            "elements": [obj.MENU_ITEMS.CALCULATOR_REPORTS]
                        },
                        {
                            "type": "show",
                            "elements": [obj.SUB_ITEMS.ITEM_REPORTS]
                        }
                    ]
            });
        
    });
};

var ScreenCalculatorOne = function(screenCalculators,buttonBack,buttonEnd) {
    this.screenCalculators = screenCalculators;
    this.widget;
    this.calculatorready=false;
    this.calculatorOneValues={};
    this.buttonBack=buttonBack;
    this.buttonEnd=buttonEnd;
}; 
ScreenCalculatorOne.prototype = new Screen();
ScreenCalculatorOne.prototype.constructor = ScreenCalculatorOne;
ScreenCalculatorOne.prototype.init = function() {
    var objs = this;
    $(objs.MENU_ITEMS.CALCULATOR_CALCULATORS_ONE + " .menu-calculator-item-group").click(function() {
        objs.changeTitle('Calculator one title');
        $(objs.MENU_ITEMS.CALCULATOR_CALCULATORS_ONE + " .menu-calculator-item-group").css("cursor","auto");  
        animation.startAnimation(
        {
            "screen": "calculatorOne",
            "callback": function(){     
                objs.printScreen(false);
            },
            "animation":
                [
                    {
                        "type": animation.FADETOGGLE_ANIMATION,
                        "elements": ["#footer-calculator"]
                    },
                    {
                        "type": animation.HIDE_ANIMATION,
                        "elements": [objs.MENU_ITEMS.CALCULATOR_CALCULATORS_TWO, objs.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE]
                    },
                    {
                        "type": animation.SHOW_ANIMATION,
                        "elements": [objs.SUB_ITEMS.ITEM_CALCULATORS_ONE]
                    }                  
                ]
        });
    });  
};
ScreenCalculatorOne.prototype.printScreen = function(is_button_created) {
    var obj = this;
    if(obj.widget===undefined){
        obj.widget = new WidgetFieldGroupCalculatorOne(obj);
        obj.widget.printFieldRow();
        obj.widget.printFieldRow();    
    }
    $(this.MENU_ITEMS.CALCULATOR_CALCULATORS_ONE).show();
    $(this.SUB_ITEMS.ITEM_CALCULATORS_ONE).show();
    $(this.MENU_ITEMS.CALCULATOR_CALCULATORS_ONE).show();
    if(this.buttonBack){
        this.createButton(this.FOOTER.BUTTONS, "home-button", "", "home-button");
        $("#home-button").click(function() {
            obj.changeTitle('Calculator Calculators');
            obj.goBack(function(){  
                animation.startAnimation(
                {"screen": "calculatorCalculatorOneBack",
                    "callback": function(){
                        obj.hideAll();
                        obj.screenCalculators.printScreen();
                    },
                    "animation":
                            [
                                {
                                    "type": "hide",
                                    "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_ONE]
                                },
                                {
                                    "type": "show",
                                    "elements": [obj.MENU_ITEMS.CALCULATOR_CALCULATORS_TWO, obj.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE]
                                }
                            ]
                });
            });
        });
    }
    $("#calculator-one-screen-result-table").show();
    $("#calculator-one-screen-result-graphic").hide();
    if(!is_button_created)this.createButton(this.FOOTER.BUTTONS, "clear-button", lang["Clear"], "button-form");
    if(!is_button_created)this.createButton(this.FOOTER.BUTTONS, "calculate-button", lang["Calculate"], "button-form");
    if(!is_button_created)this.createButton(this.FOOTER.EXPECIALBUTTON, "add-button", lang["Add"], "button-form");   
    $("#add-button").click(function(){
         obj.widget.printFieldRow();
    });
    $("#clear-button").click(function(){    
        obj.widget = new WidgetFieldGroupCalculatorOne(obj);
        obj.widget.printFieldRow();
        obj.widget.printFieldRow();    
    });
    $("#calculate-button").click(function(){
        for(var z in obj.calculatorOneValues){
            if(obj.calculatorOneValues[z]["PSA"]<0.1){
                alert(lang["The psa has to be greater than 0.1"]);
                return;
            }
        }
        var calculator=new Calculator();
        var res=calculator.calculator1(obj.calculatorOneValues);
        var psadt_arr=(res["PSADT"]+"").split(".");
        var psadt_ent=psadt_arr[0];
        var psadt_dec=psadt_arr[1];
        var velocity_arr=(res["VPSA"]+"").split(".");
        var velocity_ent=velocity_arr[0];
        var velocity_dec=velocity_arr[1];
        if(parseInt(psadt_dec)<10 )psadt_dec="0"+parseInt(psadt_dec);
        if(psadt_dec === undefined )psadt_dec="00";
        if(parseInt(velocity_dec)<10)velocity_dec="0"+parseInt(velocity_dec);
        if(velocity_dec === undefined)velocity_dec="00";
        $("#table_doubling_time").html(psadt_ent);
        $("#table_velocity_month").html(velocity_ent);
        $("#table_doubling_time_decimal").html(psadt_dec);
        $("#table_velocity_month_decimal").html(velocity_dec);
        animation.startAnimation(
        {
            "screen": "calculatorOneResult",
            "callback": function(){
                obj.printCalculateScreen();
             },
            "animation":
                [         
                    {
                        "type": animation.FADETOGGLE_ANIMATION,
                        "elements": ["#footer-calculator"],
                        "inHide":function(){
                           $(obj.FOOTER.BUTTONS).html("");
                           $(obj.FOOTER.EXPECIALBUTTON).html("");
                           obj.setBackButton([obj.SUB_ITEMS.ITEM_CALCULATORS_ONE]);
                           obj.createButton(obj.FOOTER.EXPECIALBUTTON, "table-button-result", lang["Table"], "button-form");
                           obj.createButton(obj.FOOTER.EXPECIALBUTTON, "graphic-button-result", lang["Graphic"], "button-form");            
                            $("#table-button-result" ).prop( "disabled", true );
                            $("#graphic-button-result" ).prop( "disabled", false );
                        }
                    },
                    {
                        "type": "hide",
                        "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_ONE]
                    },
                    {
                        "type": "show", 
                        "elements": ["#export-button"]
                    },
                    {
                        "type": "show",
                        "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_ONE_RESULT]
                    },
                    {
                        "type": animation.FADEIN_ANIMATION,
                        "elements": ["#footer-calculator"]
                    }
                ]
        });
    });
    $("#calculate-button").attr("disabled",true);
    this.validator();
};
ScreenCalculatorOne.prototype.validator=function(){
    var valuestime={};
    var obj=this;
    $(".calculatoronetime").each(function(){
        if($(this).val()!=="" && $(this).val()!==undefined){
            valuestime[$(this).attr("widgetDropgenoId")]=$(this).val();
        }
    });
    var valuespsa={};
    $(".calculatoronepsa").each(function(){
        if($(this).val()!=="" && $(this).val()!==undefined){
            valuespsa[$(this).attr("widgetDropgenoId")]=$(this).val();
        }
    });  
    var count=0;
    for(var val in valuespsa){
        if(val in valuestime){
            count++;
            this.calculatorOneValues[count]={"date":valuestime[val],'PSA':valuespsa[val],'widgetID':val};
        }
    }    
    if(count>=2){
        if(!this.calculatorready){
            $("#calculate-button").attr("disabled",false);
            this.calculatorready=true;
        }
    }else{
        $("#calculate-button").attr("disabled",true);
        this.calculatorready=false;
    }
};
ScreenCalculatorOne.prototype.setBackButton=function(backShow){
    var obj=this; 
    $(obj.FOOTER.BUTTONS).html("");
    obj.createButton(obj.FOOTER.BUTTONS, "home-button-result", "", "home-button");
    $("#home-button-result").click(function() {
        obj.goBack(function(){    
            animation.startAnimation(
            {"screen": "calculatorCalculatorOneResultBack",
                "callback": function(){
                    obj.hideAll();
                    obj.calculatorready=false;
                    obj.printScreen(true);
                },
                "animation":
                        [
                            
                            {
                                "type": animation.FADETOGGLE_ANIMATION,
                                "elements": ["#footer-calculator"],
                                "inHide":function(){
                                    $(obj.FOOTER.BUTTONS).html("");  
                                    $(obj.FOOTER.EXPECIALBUTTON).html("");
                                      obj.createButton(obj.FOOTER.BUTTONS, "clear-button", lang["Clear"], "button-form");
                                      obj.createButton(obj.FOOTER.BUTTONS, "calculate-button", lang["Calculate"], "button-form");
                                      obj.createButton(obj.FOOTER.EXPECIALBUTTON, "add-button", lang["Add"], "button-form");
                                }
                            },
                            {
                                "type": "hide",
                                "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_ONE_RESULT]
                            },
                            {
                                "type": "hide",
                                "elements": ["#export-button"]
                            },
                            {
                                "type": "show", 
                                "elements": backShow
                            },
                            {
                                "type": animation.FADEIN_ANIMATION,
                                "elements": ["#footer-calculator"]
                            }
                        ]
            });
        });
    }); 
};
ScreenCalculatorOne.prototype.printCalculateScreen = function() {
    var obj = this;
    $(this.MENU_ITEMS.CALCULATOR_CALCULATORS_ONE).show();
    $(this.SUB_ITEMS.ITEM_CALCULATORS_ONE_RESULT).show();   
    $("#table-button-result").click(function() {
         $( "#table-button-result" ).prop( "disabled", true );
         $( "#graphic-button-result" ).prop( "disabled", false );
         var temp_top = ($(obj.SUB_ITEMS.ITEM_CALCULATORS_ONE_RESULT).height()+5);        
         obj.setBackButton([obj.SUB_ITEMS.ITEM_CALCULATORS_ONE]);
         animation.startAnimation(
                {
                "screen": "calculatorOneTable",
                "noDeleteButtons":true,
                "callback": function(){
                    $("#footer-calculator").css("margin-top","5px");
                },
                "animation":
                    [
                        {
                            "type": animation.FADETOGGLE_ANIMATION,
                            "elements": ["#footer-calculator"]
                            
                        },
                        {
                            "type": "hide",
                            "inHide":function(){
                                $("#calculator-one-screen-result-graphic").hide();
                                $("#calculator-one-screen-result-table").show();
                             },
                            "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_ONE_RESULT]
                                                    
                        },
                        {
                            "type": "show",
                            "elements": ["#calculator-one-item-group",obj.SUB_ITEMS.ITEM_CALCULATORS_ONE_RESULT]
                        },
                        {
                            "type": animation.FADEIN_ANIMATION,
                            "elements": ["#footer-calculator"]
                        }
                    ]
            });
    });
    $("#graphic-button-result").click(function() {
        $( "#table-button-result" ).prop( "disabled", false );
        $( "#graphic-button-result" ).prop( "disabled", true );
        
        var temp_top = ($("#calculator-one-item-group").height()+$(obj.SUB_ITEMS.ITEM_CALCULATORS_ONE_RESULT).height()+10);
        
        $("#calculator-one-screen-result-graphic").css("height",(temp_top-15)+"px");
        
        obj.setBackButton(["#calculator-one-item-group",obj.SUB_ITEMS.ITEM_CALCULATORS_ONE]);
        animation.startAnimation(
            {
            "screen": "calculatorOneGraphic",
            "noDeleteButtons":true, 
            "callback": function(){
                   $("#footer-calculator").css("margin-top","5px");
                   obj.printChart();
            },
            "animation":
                [
                     {
                            "type": animation.FADETOGGLE_ANIMATION,
                            "elements": ["#footer-calculator"],
                            
                    },
                    {
                        "type": "hide",
                        "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_ONE_RESULT,"#calculator-one-item-group"],
                        "inHide":function(){
                            $("#calculator-one-screen-result-table").hide();
                            $("#calculator-one-screen-result-graphic").show();
                         }
                    },
                    {
                        "type": "show",
                        "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_ONE_RESULT]
                    },
                     {
                        "type": animation.FADEIN_ANIMATION,
                        "elements": ["#footer-calculator"]
                    }
                    
                ]
        });
    });
    if(this.buttonEnd){
        obj.createButton(obj.FOOTER.BUTTONS, "finish-button", lang["Finish"], "button-form");
        $("#finish-button").click(function(){
            obj.changeTitle('AppName');
            obj.finish([obj.MENU_ITEMS.CALCULATOR_CALCULATORS_ONE + " .menu-calculator-item-group",obj.SUB_ITEMS.ITEM_CALCULATORS_ONE_RESULT]);  
        });
    } 
};

ScreenCalculatorOne.prototype.printChart = function() {
    var line=[];
    var ticks=[];
    var ordered=[];
    var count=0;
    
    for(var point in this.calculatorOneValues){
        var date=this.calculatorOneValues[point]["date"];
        var psa=parseFloat(this.calculatorOneValues[point]["PSA"]);
        
        line[count]=[date,psa];
        ticks[count]=date;
        count++;
    }
    
    var date_sort_asc = function (date1, date2) {
        var temp1 = date1.split("/");
        var temp2 = date2.split("/");
        
        if ((new Date(temp1[2],temp1[1],temp1[0])) > (new Date(temp2[2],temp2[1],temp2[0]))) return 1;
        if ((new Date(temp1[2],temp1[1],temp1[0])) < (new Date(temp2[2],temp2[1],temp2[0]))) return -1;
        return 0;
    };
    ticks.sort(date_sort_asc);
    
    for(var i=0;i < ticks.length;i++){
        for(var j=0;j < line.length;j++){
            if(line[j][0] == ticks[i]){
                ordered[i] = [line[j][0],line[j][1]];
                break;
            }
        }
    }
    line = ordered;
    
    $("#calculator-one-screen-result-graphic").html('<div id="canvas"  ></div>');
    var plot2 = $.jqplot('canvas', [line], {
            backgroundColor: '#00794d',
            seriesColors:['#FFFFFF'],
            axesDefaults: {
                tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
                tickOptions: {
                  fontSize: '10pt'
                }
            },
            seriesDefaults: {
                markerOptions: {
                    style: 'filledSquare'
                }
            },
            axes: {
              xaxis: {
               // label:lang["date"],
                renderer: $.jqplot.CategoryAxisRenderer,
                autoscale:true,
                tickOptions: {
                  angle: -80
                }
              },
              yaxis:{
                //label:lang["PSA"],
                autoscale:true
              }
            }
        }
      );
    
    // appdrogeno chart style
    var appChartSty = {
        grid: {
            backgroundColor: '#00794d',
            gridLineColor: '#339370'
        },
        axes: {
            xaxis: {
                ticks: {
                    backgroundColor: '#00794d',
                    textColor: 'white'
                },
                label: {
                    backgroundColor: '#00794d',
                    textColor: 'white',
                    fontFamily: 'karbon'
                }
            },
            yaxis: {
                ticks: {
                    backgroundColor: '#00794d',
                    textColor: 'white'
                },
                label: {
                    backgroundColor: '#00794d',
                    textColor: 'white',
                    fontFamily: 'karbon'
                }
            }
        }
    };
    
    plot2.themeEngine.newTheme('appdrogeno', appChartSty);
    plot2.activateTheme('appdrogeno');
    $(".jqplot-target").css("background-color","#00794d");
    $(".jqplot-xaxis").css("bottom","-10px");
    $(".jqplot-yaxis").css("left","-10px");
    $("canvas").css("margin","auto");
    
    
    $( window ).resize(function() {
        try{
            plot2.replot( { resetAxes: true } );
            $(".jqplot-xaxis").css("bottom","-10px");
            $(".jqplot-yaxis").css("left","-10px");
            $("canvas").css("margin","auto");
        }catch(e){}
    });
};

var WidgetFieldGroupCalculatorOne = function(callobj) {
    this.countCalculatorsFieldShow = 0;
    this.countCalculatorsFieldId = 0;
    this.callobj=callobj;  
    $("#calculator-one-screen-fields").html("");
    this.callobj.validator();
    this.printFieldRow = function() {
        this.countCalculatorsFieldShow++;
        this.countCalculatorsFieldId++;
        var obj = this;
        $("#calculator-one-screen-fields").append("\n\
            <div id='CalculationOneFieldRow" + this.countCalculatorsFieldId + "' class='CalculationOneFieldRow'>\n\
                <div class='CalculationOneFields'><div>\n\
                <div class='field-one'>\n\
                    <div class='field-label'>" + lang['date'] + "</div>\n\
                    <div class='field-input date'><input id='datetime" + this.countCalculatorsFieldId + "' type='text' name='datetime" + this.countCalculatorsFieldId + "' value='' class='date-time calculatoronetime' widgetDropgenoId='" + this.countCalculatorsFieldId + "'  data-field='date' style='text-align:center;'/></div>\n\
                    <div class='field-label'>" + lang['PSA'] + "</div>\n\
                    <div class='field-input numeric'><input type='text' id='psa" + this.countCalculatorsFieldId + "' name='psa" + this.countCalculatorsFieldId + "' value='' class='calculatoronepsa' widgetDropgenoId='" + this.countCalculatorsFieldId + "' /></div>\n\
                    <div class='field-button'><input type='button' rowId='" + this.countCalculatorsFieldId + "' id='deleteGroupField" + this.countCalculatorsFieldId + "' class='delete-group-field'/></div>\n\
                </div>\n\
            </div>");
        $("#deleteGroupField" + this.countCalculatorsFieldId).click(function() {
            var rowid = $(this).attr("rowId");
            obj.deleteFieldRow(rowid);
        });
        setDateTimePicker($("#datetime" + this.countCalculatorsFieldId));
        $("#datetime" + this.countCalculatorsFieldId).change(function(){
            obj.callobj.validator();
            
        });
        $("#psa" + this.countCalculatorsFieldId).keyup(function(){
            if(!isNaN(parseFloat($(this).val())) && isFinite($(this).val())){   
                obj.callobj.validator();
            }else{
                $(this).val($(this).val().substring(0,$(this).val().length-1));
            }
        });
        $("#psa" + this.countCalculatorsFieldId).blur(function(){
            obj.callobj.validator();
        }); 
        $("#psa" + this.countCalculatorsFieldId).change(function(){
            obj.callobj.validator();
        }); 
        if (this.countCalculatorsFieldShow > 2) {
            $(".delete-group-field").each(function() {
                $(this).show();
            });
        } else {
            $(".delete-group-field").each(function() {
                $(this).hide();
            });
        }
        
    };
    this.deleteFieldRow = function(fieldRowId) {
        if (this.countCalculatorsFieldShow !== 2) {
            $("#CalculationOneFieldRow" + fieldRowId).remove();
            this.callobj.validator();
            this.countCalculatorsFieldShow--;
        }
        if (this.countCalculatorsFieldShow === 2) {
            $(".delete-group-field").each(function() {
                $(this).hide();
            });
        }
    };
};

var ScreenCalculatorTwo = function(screenCalculators,buttonBack,buttonEnd) {
    this.screenCalculators = screenCalculators;
    this.buttonBack=buttonBack;
    this.buttonEnd=buttonEnd;
};
ScreenCalculatorTwo.prototype = new Screen();
ScreenCalculatorTwo.prototype.constructor = ScreenCalculatorTwo;
ScreenCalculatorTwo.prototype.init = function() {
    var obj = this;
    $(this.MENU_ITEMS.CALCULATOR_CALCULATORS_FOUR + " .menu-calculator-item-group").click(function() {
       obj.changeTitle('Calculator two title');
       $(obj.MENU_ITEMS.CALCULATOR_CALCULATORS_TWO + " .menu-calculator-item-group").css("cursor","auto");  
       animation.startAnimation(
            {
                "before":function(){
                    var elements=obj.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE;
                    var left = $(elements).offset().left;
                    var width = $(elements).width();
                    var top = $(elements).offset().top;
                    $(elements).css("position", "absolute");
                    $(elements).css("left", left + "px");
                    $(elements).css("width", width + "px");
                    $(elements).css("top", top + "px");
                    var elements=obj.MENU_ITEMS.CALCULATOR_CALCULATORS_TWO;
                    var left = $(elements).offset().left;
                    var width = $(elements).width();
                    var top = $(elements).offset().top;
                    $(elements).css("position", "absolute");
                    $(elements).css("left", left + "px");
                    $(elements).css("width", width + "px");
                    $(elements).css("top", top + "px");   
                },
                "screen": "calculatorTwo",
                "callback": function(){
                        obj.printCalculatorTwoFields(false);
                },
                "animation":
                    [
                        {
                            "type": "hide",
                            "elements": [obj.MENU_ITEMS.CALCULATOR_CALCULATORS_ONE,obj.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE]
                        },
                        {
                            "type": "up",
                            "elements":[obj.MENU_ITEMS.CALCULATOR_CALCULATORS_TWO]
                        },
                        {
                            "type": "show",
                            "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_TWO]
                        }
                    ]
        });
    });
};
ScreenCalculatorTwo.prototype.printCalculatorTwoFields = function(is_back) {
    var obj = this;
    if(!is_back){
        $("#calculation_two_creatine").val("");
        $("#calculation_two_units").val("1");
        $("#calculation_two_age").val("");
        $("#calculation_two_weight").val("");
        $("#calculation_two_genderM").click();
    }  
    $(obj.MENU_ITEMS.CALCULATOR_CALCULATORS_TWO).show();
    $(obj.SUB_ITEMS.ITEM_CALCULATORS_TWO).show();
    if(this.buttonBack){       
        obj.createButton(obj.FOOTER.BUTTONS, "home-button", "", "home-button");
        $("#home-button").click(function() {
            obj.changeTitle('Calculator Calculators');
            obj.goBack(function(){        
                animation.startAnimation(
                {
                    "screen": "calculatorTwoBack",
                    "callback": function(){
                            obj.hideAll();
                            obj.screenCalculators.printScreen();
                    },
                    "animation":
                        [
                            {
                                "type": animation.FADETOGGLE_ANIMATION,
                                "elements": ["#footer-calculator"],
                                "inHide":function(){}
                            },
                            {
                                "type": "hide",
                                "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_TWO,obj.MENU_ITEMS.CALCULATOR_CALCULATORS_TWO+ " .menu-calculator-item-group"]
                            },
                            {
                                "type": "show",
                                "elements": [obj.MENU_ITEMS.CALCULATOR_CALCULATORS_ONE,obj.MENU_ITEMS.CALCULATOR_CALCULATORS_TWO + " .menu-calculator-item-group",obj.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE]
                            },
                            {
                                "type": animation.FADEIN_ANIMATION,
                                "elements": ["#footer-calculator"]
                            }
                        ]
                });
            });
        });
    }    
    if(!is_back)obj.createButton(obj.FOOTER.BUTTONS, "reset-button", lang["Clear"], "button-form");
    $("#reset-button").click(function(){
        $("#calculation_two_creatine").val("");
        $("#calculation_two_weight").val("");
        $("#calculation_two_age").val("");
        $("#calculation_two_genderM").prop('checked', true);
        $("#calculation_two_genderF").prop('checked', false);
        $("#calculation_two_units").val("1");
    });
    if(!is_back)obj.createButton(obj.FOOTER.BUTTONS, "calculate-button", lang["Calculate"], "button-form");
    $("#calculate-button").click(function() {
        var creatinine = $("#calculation_two_creatine").val();
        var creatinine_unid = $("#calculation_two_units").val();
        var age = $("#calculation_two_age").val();
        var weight = $("#calculation_two_weight").val();
        var male = $("#calculation_two_genderM").is(":checked");
        var female = $("#calculation_two_genderF").is(":checked");
        var calculator=new Calculator();
        var result = calculator.calculator2(creatinine, creatinine_unid, age, weight, male, female);
        $("#table_creatinite_clearance").html(result);
        if (creatinine === "" || isNaN(creatinine)) {
            alert(lang['Creatinine not be empty']);
        } else {
            if (age === "" || isNaN(age)) {
                alert(lang['Age not be empty']);
            } else {
                if (weight === "" || isNaN(weight)) {
                    alert(lang['Weight not be empty']);
                } else {
                    animation.startAnimation(
                        {
                            "screen": "calculatorTwoResult",
                            "callback": function() {
                               $(".element_text").text($("#c2header_result_text").text()); obj.printCalculatorTwoResult(creatinine, creatinine_unid, age, weight, male, female);
                            },
                            "animation":
                                [
                                    {
                                        "type": animation.FADETOGGLE_ANIMATION,
                                        "elements": ["#footer-calculator"],
                                        "inHide":function(){
                                            $(obj.FOOTER.BUTTONS).html("");
                                            obj.createButton(obj.FOOTER.BUTTONS, "home-button", "", "home-button");
                                        }
                                    },
                                    {
                                        "type": "hide",
                                        "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_TWO]
                                    },
                                    {
                                        "type": "show",
                                        "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_TWO_RESULT]
                                    },
                                    {
                                        "type": animation.FADEIN_ANIMATION,
                                        "elements": ["#footer-calculator"]
                                    }
                                ]
                        });
                }
            }
        }
    });
    
};

ScreenCalculatorTwo.prototype.printCalculatorTwoResult = function() {
    var obj = this;
    $("#home-button").click(function() {
        $(".element_text").text($("#c2header_text").text());
        obj.goBack(function(){       
             animation.startAnimation(
                {
                    "screen": "calculatorTwoResultBack",
                    "callback": function() {
                        obj.hideAll();
                        obj.printCalculatorTwoFields(true);
                    },
                    "animation":
                        [
                            {
                                "type": animation.FADETOGGLE_ANIMATION,
                                "elements": ["#footer-calculator"],
                                "inHide":function(){
                                    $(obj.FOOTER.BUTTONS).html("");
                                    obj.createButton(obj.FOOTER.BUTTONS, "reset-button", lang["Clear"], "button-form");

                                    obj.createButton(obj.FOOTER.BUTTONS, "calculate-button", lang["Calculate"], "button-form");
                                }
                            },
                            {
                                "type": "hide",
                                "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_TWO_RESULT]
                            },
                            {
                                "type": "show",
                                "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_TWO]
                            },
                            {
                                "type": animation.FADEIN_ANIMATION,
                                "elements": ["#footer-calculator"]
                            }
                        ]
                });
        }); 
    });
    if(this.buttonEnd){
        obj.createButton(obj.FOOTER.BUTTONS, "finish-button", lang["Finish"], "button-form");
        $("#finish-button").click(function(){
            obj.changeTitle('AppName');
            obj.finish([obj.MENU_ITEMS.CALCULATOR_CALCULATORS_TWO + " .menu-calculator-item-group",obj.SUB_ITEMS.ITEM_CALCULATORS_TWO_RESULT]);
        });
    }
};

var ScreenCalculatorThree = function(screenCalculators,buttonBack,buttonEnd) {
    this.screenCalculators = screenCalculators;
    this.buttonEnd=buttonEnd;
    this.buttonBack=buttonBack;
    
};
ScreenCalculatorThree.prototype = new Screen();
ScreenCalculatorThree.prototype.constructor = ScreenCalculatorThree;
ScreenCalculatorThree.prototype.init = function() {
    var obj = this;
    $(this.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE + " .menu-calculator-item-group").click(function() {       
        obj.changeTitle('Calculator three title');
        $(obj.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE + " .menu-calculator-item-group").css("cursor","auto");  
        animation.startAnimation(
            {
                "before": function(){
                    var elements=obj.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE;
                    var left = $(elements).offset().left;
                    var width = $(elements).width();
                    var top = $(elements).offset().top;
                    $(elements).css("position", "absolute");
                    $(elements).css("left", left + "px");
                    $(elements).css("width", width + "px");
                    $(elements).css("top", top + "px");
                },
                "screen": "calculatorThree",
                "callback": function() {
                    obj.printCalculatorThreeField(false);
                },
                "animation":
                    [
                        
                        {
                            "type": "hide",
                            "elements": [obj.MENU_ITEMS.CALCULATOR_CALCULATORS_ONE,obj.MENU_ITEMS.CALCULATOR_CALCULATORS_TWO]
                        },
                        {
                            "type": "up",
                            "elements": [obj.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE]
                        },
                        {
                            "type": "show",
                            "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_THREE]
                        }
                        
                    ]
            }); 
    });
};
ScreenCalculatorThree.prototype.printCalculatorThreeField = function(is_back) {
    var obj = this;
    if(!is_back){
        $("#calculation_three_height").val("");
        $("#calculation_three_weight").val("");
    }
    $(obj.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE).show();
    $(obj.SUB_ITEMS.ITEM_CALCULATORS_THREE).show();
    if(this.buttonBack){
        obj.createButton(obj.FOOTER.BUTTONS, "home-button", "", "home-button");
        $("#home-button").click(function() {
            obj.changeTitle('Calculator Calculators');
            obj.goBack(function(){          
                animation.startAnimation(
                {
                    "screen": "calculatorThreeBack",
                    "callback": function() {
                        obj.screenCalculators.printScreen();
                    },
                    "animation":
                        [
                            
                            {
                                "type": "hide",
                                "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_THREE,obj.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE+ " .menu-calculator-item-group"]
                            },
                            {
                                "type": "show",
                                "elements": [obj.MENU_ITEMS.CALCULATOR_CALCULATORS_ONE,obj.MENU_ITEMS.CALCULATOR_CALCULATORS_TWO,obj.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE+ " .menu-calculator-item-group"]
                            }
                        ]
                }); 
            }); 
        });
    }
    if(!is_back)obj.createButton(obj.FOOTER.BUTTONS, "calculate-button", lang["Calculate"], "button-form");
    $("#calculate-button").click(function() {
        var height = $("#calculation_three_height").val();
        var weight = $("#calculation_three_weight").val();
        var height_unit = $("#calculation_three_units").val();
        var formula = $("#calculation_three_formula").val();
        if (height === "" || isNaN(height)) {
            alert(lang['Height not be empty']);
        } else if (weight === "" || isNaN(weight)) {
            alert(lang['Weight not be empty']);
        } else {
            var calculator=new Calculator();
            var result = calculator.calculator3(height, weight, height_unit, formula);
            $("#table_corporal_surface").html(result); 
            animation.startAnimation(
            {
                "screen": "calculatorThreeResult",
                "callback": function() {
                    obj.printCalculatorThreeResult();
                },
                "animation":
                    [
                        {
                            "type": animation.FADETOGGLE_ANIMATION,
                            "elements": ["#footer-calculator"],
                            "inHide":function(){
                                $(obj.FOOTER.BUTTONS).html("");
                                    obj.createButton(obj.FOOTER.BUTTONS, "home-button", "", "home-button");
                            }
                        },
                        {
                            "type": "hide",
                            "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_THREE]
                        },
                        {
                            "type": "show",
                            "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_THREE_RESULT]
                        },
                        {
                            "type": animation.FADEIN_ANIMATION,
                            "elements": ["#footer-calculator"]
                        }
                    ]
            }); 
            
        }
    });
};

ScreenCalculatorThree.prototype.printCalculatorThreeResult = function() {
    var obj = this;
    $("#home-button").click(function() {
        obj.goBack(function(){     
            animation.startAnimation(
            {
                "screen": "calculatorThreeResultBack",
                "callback": function() {
                    obj.hideAll();
                    obj.printCalculatorThreeField(true);
                },
                "animation":
                    [
                        {
                            "type": animation.FADETOGGLE_ANIMATION,
                            "elements": ["#footer-calculator"],
                            "inHide":function(){
                                $(obj.FOOTER.BUTTONS).html("");
                                obj.createButton(obj.FOOTER.BUTTONS, "calculate-button", lang["Calculate"], "button-form");
                            }
                        },
                        {
                            "type": "hide",
                            "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_THREE_RESULT]
                        },
                        {
                            "type": "show",
                            "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_THREE]
                        },
                        {
                            "type": animation.FADEIN_ANIMATION,
                            "elements": ["#footer-calculator"]
                        }
                    ]
            }); 
            
        });     
    });
    if(this.buttonEnd){
        obj.createButton(obj.FOOTER.BUTTONS, "finish-button", lang["Finish"], "button-form");
        $("#finish-button").click(function(){
            obj.changeTitle('AppName');
            obj.finish([obj.MENU_ITEMS.CALCULATOR_CALCULATORS_THREE + " .menu-calculator-item-group",this.SUB_ITEMS.CALCULATOR_CALCULATORS_THREE_RESULT]);
        });
    }
};

var ScreenCalculatorFour = function(screenCalculators,buttonBack,buttonEnd) {
    this.screenCalculators = screenCalculators;
    this.buttonEnd=buttonEnd;
    this.buttonBack=buttonBack;
    this.CALC4QUESTIONS=lang['Fatigue questions'];
    this.questionIndex=0;
    this.maxQuestions=10;
    this.answers=[];
    this.exportMode=0;
    this.name="";
    this.identificator="";
    this.dateCreate="";
};
ScreenCalculatorFour.prototype = new Screen();
ScreenCalculatorFour.prototype.constructor = ScreenCalculatorFour;
ScreenCalculatorFour.prototype.init = function() {
   
};
ScreenCalculatorFour.prototype.setNextQuestion = function(index){
    var obj = this;
    var actual_question = lang['Fatigue questions'][obj.questionIndex];
    var to_question = (index || index === 0) &&  index < lang['Fatigue questions'].length ? lang['Fatigue questions'][index] : "";
    var common_text = $.trim(actual_question.substr(0,actual_question.indexOf("|")));
    var uncommon_text = $.trim(actual_question.substr(actual_question.indexOf("|")+1));
   
    if(actual_question.indexOf("|") >= 0){
        $( "#common" ).html(common_text);
        $( "#uncommon" ).html(uncommon_text);
    }else{
        $( "#common" ).html("");
        $( "#uncommon" ).html(actual_question);
    }
    obj.progress(obj.questionIndex+1);
}
ScreenCalculatorFour.prototype.progress=function(value){
    $(".progress").each(function(){
        $(this).find(".unchecked").each(function(){$(this).show();});
        $(this).find(".checked").each(function(){$(this).hide();});
        $("#progress_"+value+" .checked").show();
        $("#progress_"+value+" .unchecked").hide();
    });
}
ScreenCalculatorFour.prototype.printCalculatorFourField = function() {
    var obj = this;
    var blur = true;

    obj.setNextQuestion();
    $("#content_type_radiobuttons").show();
    $( "#slider" ).slider({
        value:0,
        min: 0,
        max: 10,
        step: 1,
        start: function(){ blur = false; },
        stop: function(){ blur = true; },
        slide: function( event, ui ) {
          $( "#slider-selected" ).html( ui.value );

        }
    });
    $("#slider").css("background","#dff107").css("border","1px solid #a7f107").
    find(".ui-slider-handle").css("background","white").css("border","1px solid black").
    hover(function(){ $(this).css("background","#00794d").css("border","1px solid white"); },
        function(){ if(blur) $(this).css("background","white").css("border","1px solid black"); });

    $( "#slider-selected" ).val(  $( "#slider" ).slider( "value" ) );
    $(obj.MENU_ITEMS.CALCULATOR_CALCULATORS_FOUR).show();
    $(obj.SUB_ITEMS.ITEM_CALCULATORS_FOUR).show();
    obj.createButton("#footer-calculator", "home-button", "", "home-button");
    obj.createButton(obj.FOOTER.BUTTONS, "next-button", "", "next-button");    
    $("#content_type_slider").hide();
    $("#home-button").click(function(){
           $("#next-button").attr("disabled","disabled");     
           $("#home-button").attr("disabled","disabled");
           obj.setNextQuestion(obj.questionIndex-1);   
           animation.clear();
            obj.questionIndex--; 
           var viewToHide=["#content_type_slider"];
           var viewToShow=["#content_type_slider"];
           if(obj.questionIndex==0){
               viewToShow=["#content_type_radiobuttons"];
               viewToHide=["#content_type_slider"];
           }
           var animObj=[];
            if(obj.questionIndex==3){
                 animObj[animObj.length]={
                             "type": animation.FADETOGGLE_ANIMATION, 
                             "elements": ["#uncommon"]
                         };
                 animObj[animObj.length]={
                             "type": animation.FADETOGGLE_ANIMATION, 
                             "elements": ["#common"]
                         };
               
            }else{
                animObj[animObj.length]={
                             "type": animation.FADETOGGLE_ANIMATION, 
                             "elements": ["#uncommon"]
                         };
                
            }
            animObj[animObj.length]={
                "type": animation.FADETOGGLE_ANIMATION,
                "elements": viewToHide,
                "inHide":function(){
                    $( "#slider" ).slider( {value:  5});
                    $( "#slider-selected" ).html( 5 );
                   
                    obj.setNextQuestion();
                    if(obj.questionIndex >= 4){
                        $("#minFatigueText").text("No interfiere");
                        $("#maxFatigueText").text("Interfiere por completo");
                    }else{
                        $("#minFatigueText").text("Ninguna fatiga");
                        $("#maxFatigueText").text("La peor fatiga que se puede imaginar");
                    }
                }          
            };
            animObj[animObj.length]={
                "type": animation.FADETOGGLE_ANIMATION,
                "elements": ["#footer-calculator"],
                "inHide": function(){
                    if(obj.questionIndex>0 && obj.questionIndex<obj.maxQuestions){
                        $("#home-button").show();
                    }else{
                        $("#home-button").hide();
                    }
                    if((obj.questionIndex+1)===obj.maxQuestions){
                        $("#next-button").hide();
                        $("#calculate-button").show();
                    }else{
                        $("#next-button").show();
                        $("#calculate-button").hide();
                    }
                }
            };
            animObj[animObj.length]={
                "type": animation.FADEIN_ANIMATION,
                "elements": ['#uncommon']
            };
            animObj[animObj.length]={
                "type": animation.FADEIN_ANIMATION,
                "elements": viewToShow
            };
            animObj[animObj.length]={
                "type": animation.FADEIN_ANIMATION,
                "elements": ["#footer-calculator"]
            };
            animation.startAnimation(
            {
                "screen": "calculatorFourResultBack",
                "callback": function() {    
                    $("#home-button").removeAttr("disabled"); 
                    $("#next-button").removeAttr("disabled"); 
                },
                "animation":animObj                 
            }); 
    });
    $("#next-button").click(function() {
           $("#next-button").attr("disabled","disabled");     
           $("#home-button").attr("disabled","disabled");
           animation.clear();
           var viewToHide=["#content_type_slider"];
           var viewToShow=["#content_type_slider"];
           if(obj.questionIndex==0){
               viewToHide=["#content_type_radiobuttons"];
           }
           var animObj=[
                        {
                            "type": animation.FADETOGGLE_ANIMATION,
                            "elements": ["#uncommon"],
                            "inHide": function(){
                                
                                if(obj.questionIndex<0){
                                    obj.answers[obj.questionIndex]=($("#answerYes").is(":checked"))?1:0;
                                }else{
                                    var value=$( "#slider" ).slider( "value" );
                                    obj.answers[obj.questionIndex]=value;
                                }
                                if(obj.questionIndex===3){
                                    $("#common").hide();
                                }
                               
                                obj.questionIndex++;
                                obj.setNextQuestion(obj.questionIndex+1);
                                
                            }
                        },
                        
                        {
                            "type": animation.FADETOGGLE_ANIMATION,
                            "elements": viewToHide,
                            "inHide":function(){
                                $( "#slider" ).slider( {value:  5});
                                $( "#slider-selected" ).html( 5 );
                                if(obj.questionIndex >= 4){
                                    $("#minFatigueText").text("No interfiere");
                                    $("#maxFatigueText").text("Interfiere por completo");
                                }else{
                                    $("#minFatigueText").text("Ninguna fatiga");
                                    $("#maxFatigueText").text("La peor fatiga que se puede imaginar");
                                }
                            }          
                        },
                        {
                            "type": animation.FADETOGGLE_ANIMATION,
                            "elements": ["#footer-calculator"],
                            "inHide": function(){
                                if(obj.questionIndex>0){
                                    $("#home-button").show();
                                }else{
                                    $("#home-button").hide();
                                }
                                if((obj.questionIndex+1)===obj.maxQuestions){
                                    $("#next-button").hide();
                                    $("#calculate-button").show();
                                }else{
                                    $("#next-button").show();
                                    $("#calculate-button").hide();
                                }
                            }
                        } 
                        
                    ];
            if(obj.questionIndex===3){
                animObj[animObj.length]={
                                "type": animation.FADEIN_ANIMATION,
                                "elements": ["#common"]
                            };
                animObj[animObj.length]={
                                "type": animation.FADEIN_ANIMATION,
                                "elements": ["#uncommon"]
                            };
                
            }else{
                animObj[animObj.length]={
                                "type": animation.FADEIN_ANIMATION,
                                "elements": ["#uncommon"]
                            };
                
            }
            animObj[animObj.length]={
                            "type": animation.FADEIN_ANIMATION,
                            "elements": viewToShow
                         };
            animObj[animObj.length]={
                            "type": animation.FADEIN_ANIMATION,
                            "elements": ["#footer-calculator"]
                        };
            animation.startAnimation(
            {
                "screen": "calculatorFourResultBack",
                "callback": function() {    
                    $("#home-button").removeAttr("disabled"); 
                    $("#next-button").removeAttr("disabled"); 
                },
                "animation":animObj     
            });          
    });
    obj.createButton(obj.FOOTER.BUTTONS, "calculate-button", lang["Ending"], "button-form");
    $("#calculate-button").click(function(){
         animation.startAnimation(
         {
             "screen": "calculatorFourResult",
             "callback": function() {     

             },
             "animation":
                 [
                     {
                         "type": animation.FADETOGGLE_ANIMATION,
                         "elements": ["#footer-calculator"],
                         "inHide": function(){
                                var value=$( "#slider" ).slider( "value" );
                             $("#home-button").remove();
                             $("#next-button").remove();
                                obj.answers[obj.answers.length]=value;
                                obj.printCalculatorFourResult();
                         }
                     },
                     {
                         "type": animation.FADETOGGLE_ANIMATION,
                         "elements": ["#copyright"]
                     },
                     {
                         "type": "hide",
                         "elements": ["#calculator-four-subheader",obj.SUB_ITEMS.ITEM_CALCULATORS_FOUR]
                     },
                     
                     {
                         "type": "show",
                         "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_FOUR_RESULT]
                     },
                     
                     {
                         "type": animation.FADEIN_ANIMATION,
                         "elements": ["#footer-calculator"]
                     }
                 ]
         }); 
    });
    $("#next-button").show();
    $("#home-button").hide();
    $("#calculate-button").hide();
       
};
ScreenCalculatorFour.prototype.printCalculatorFourResult = function() {
    var obj=this;
    var calc=new Calculator();
    var arr_result=calc.calculator4(this.answers);

    var result = "";
    var global=Math.round(arr_result["global"] * 100) / 100;
    var intensity=Math.round(arr_result["intensity"] * 100) / 100;
    var interference=Math.round(arr_result["interference"] * 100) / 100;

    $("#calculate-button").remove();  
    $("#calculator-four-global").html(global + " (" + arr_result["globalDescription"] + ")");
    $("#calculator-four-intensity").html(intensity + " (" + arr_result["intensityDescription"] + ")");
    $("#calculator-four-interference").html(interference + " (" + arr_result["interferenceDescription"] + ")");

     
    obj.createButton("#footer-calculator", "home-button", "", "home-button");
    obj.createButton(obj.FOOTER.BUTTONS,"export-pdf", lang['export-pdf'], "export-button export-button-left");
    obj.createButton(obj.FOOTER.BUTTONS,"export-csv", lang['export-csv'], "export-button export-button-left");
    
    
    $("#export-pdf").click(function(){
        $("#export-dialog").show();
        $("#calculator-four-date").val(Utils.getCurrentDate());
        obj.exportMode=2;
    });
    $("#export-csv").click(function(){
        $("#export-dialog").show();
        $("#calculator-four-date").val(Utils.getCurrentDate());
        obj.exportMode=1;
    });
    $("#calculator-four-execute-export").click(function(){
        obj.name=$("#calculator-four-name").val();
        obj.dateCreate=$("#calculator-four-date").val();
        if(obj.exportMode===1){
            APPDROGENO.exportFatigaCSV(lang['Fatigue questions csv'],
                obj.answers,
                obj.name,
                obj.dateCreate,
                intensity,
                interference,
                global,
                result);
        }else{
            APPDROGENO.exportFatigaPDF(obj.CALC4QUESTIONS,
                obj.answers,
                obj.name,
                obj.dateCreate,
                intensity,
                interference,
                global,
                result);
        }
        $("#export-dialog").hide();
    });
    $("#calculator-four-execute-cancel").click(function(){
        $("#export-dialog").hide();
    });
    $("#home-button").click(function() {
        obj.answers=[];
        obj.questionIndex=0;
        animation.startAnimation(
            {
                "screen": "calculatorFourResultBack",
                "callback": function() {
                    obj.hideAll();
                    obj.printCalculatorFourField(true);
                },
                "animation":
                    [
                        {
                            "type": animation.FADETOGGLE_ANIMATION,
                            "elements": ["#footer-calculator"],
                            "inHide":function(){
                                $(obj.FOOTER.BUTTONS).html("");
                                $("#home-button").remove();
                                obj.setNextQuestion();
                                $("#content_type_radiobuttons").show();
                                $("#content_type_slider").hide();
                            }
                        },
                        {
                            "type": "hide",
                            "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_FOUR_RESULT]
                        },
                        {
                            "type": "show",
                            "elements": ["#calculator-four-subheader",obj.SUB_ITEMS.ITEM_CALCULATORS_FOUR]
                        },
                        {
                         "type": animation.FADEIN_ANIMATION,
                         "elements": ["#copyright"]
                        },
                        {
                            "type": animation.FADEIN_ANIMATION,
                            "elements": ["#footer-calculator"]
                        }
                    ]
            }); 
            
    });
};
var ScreenCalculatorFive = function(screenCalculators,buttonBack,buttonEnd) {
    this.psaElements=[];
    this.numPsaElements=0;
};
ScreenCalculatorFive.prototype = new Screen();
ScreenCalculatorFive.prototype.constructor = ScreenCalculatorFive;
ScreenCalculatorFive.prototype.init = function() {
   $("#psa-progression-header").hide();
};
ScreenCalculatorFive.prototype.printCalculatorFiveField = function(back) {
    var obj=this;
    if(!back)obj.createButton(obj.FOOTER.BUTTONS, "reset-button", lang["Clear"], "button-form");
    $("#reset-button").click(function(){
        $("#tetosterona").val("");
        $("#tetosterona-unit").val("ng/dl");
        $("#nadir").val("");
        $("#radiologic-one").prop('checked', false);
        $("#radiologic-two").prop('checked', false);
        $("#psa-progression-group").html("");
        obj.psaElements=0;
        obj.psaElements=[];
    });
    if(!back)obj.createButton(obj.FOOTER.BUTTONS, "calculate-button", lang["Calculate"], "button-form");
    $("#calculator-five-screen").show();
    $("#calculate-button").click(function(){
        var tetosterone=$("#tetosterona").val();
        var tetosteroneUnit=$("#tetosterona-unit").val();
        tetosterone = tetosterone === "" || isNaN(tetosterone) ? 0 : tetosterone;
        if((tetosteroneUnit == "ng/dl" && tetosterone >= 50) || (tetosteroneUnit == "nmol/l" && tetosterone >= 1.7)){
            $("body").append("<div id='calculator_testosterone' class='appdrogeno_dialog'>"+lang["testosterone_max_limit"].replace("<50ng/dl",tetosteroneUnit == "ng/dl" ? "< 50 ng/dl" : "< 1.7 nmol/l")+"</div>");
            $("#calculator_testosterone").dialog({
                "open":function(){ 
                    $(this).parent().removeClass("ui-widget-content ui-corner-all").css("border","none");
                    $(this).parent().find(".ui-widget-header").removeClass("ui-widget-content ui-corner-all").css("border","none"); },
                "close":function(){ $(this).dialog('destroy').remove(); 
            }});
            return;
        }
        animation.startAnimation(
            {
                "screen": "calculatorFiveResult",
                "callback": function() {
                    obj.printCalculatorFiveResult();
                },
                "animation":
                    [
                        {
                            "type": animation.FADETOGGLE_ANIMATION,
                            "elements": ["#footer-calculator"],
                            "inHide":function(){
                                $(obj.FOOTER.BUTTONS).html("");
                                obj.createButton(obj.FOOTER.BUTTONS, "home-button", "", "home-button");
                                var psa=[];
                                var date=[];
                                var tetosterone=$("#tetosterona").val();
                                var tetosteroneUnit=$("#tetosterona-unit").val();
                                var radiologicOne=$("#radiologic-one").is(":checked");
                                var radiologicTwo=$("#radiologic-two").is(":checked");
                                var nadir = $("#nadir").val();

                                $("#calculator-five-subresult").html("");
                                for(var count=0;count<obj.psaElements.length;count++){
                                    if(obj.psaElements[count]!=null){
                                        var p=obj.psaElements[count].find(".psa-element").val();
                                        var d=obj.psaElements[count].find(".date-element").val();
                                        if(obj.psaElements[count]!=null && p!="" && d!=""){
                                            psa[psa.length]=p;
                                            date[date.length]=d;
                                        }
                                    }
                                }  
                                var calculator=new Calculator();
                                var result = calculator.calculator5(psa,nadir,date,tetosterone,tetosteroneUnit,radiologicOne,radiologicTwo);
                                $("#calculator-five-result").html('<img id="calculator-five-result-image" width="90px" src="img/btn_bg_white.png"/>'); 
                                if(result.length>1){
                                    $("#calculator-five-result").append("<p id='calculator-five-result-string'>"+lang['Yes']+"</p>");
                                    var calc5_result = lang["calc5_result_title"];
                                    for(var count=0;count<result.length;count++) calc5_result += "<br/> - "+result[count];
                                    $("#calculator-five-subresult").append("<p>"+calc5_result+"</p>");
                                }else{
                                    $("#calculator-five-result").append("<p id='calculator-five-result-string'>"+lang['No']+"</p>");
                                    $("#calculator-five-subresult").append("<p>"+lang["calc5_no_result"].replace("<50 ng/dl",tetosteroneUnit == "ng/dl" ? "< 50 ng/dl" : "< 1.7 nmol/l")+"</p>");
                                }  
                            }
                        },
                        {
                            "type": "hide",
                            "elements": [obj.MENU_ITEMS.CALCULATOR_CALCULATORS_FIVE]
                        },
                        {
                            "type": "show",
                            "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_FIVE_RESULT]
                        },
                        {
                            "type": animation.FADEIN_ANIMATION,
                            "elements": ["#footer-calculator"]
                        }
                    ]
            }); 
    });
    if(!back)$("#psa-progression-add").click(function(){
        var count=obj.psaElements.length;
        $("#psa-progression-group").append(
            "<tr id=\"psa-progression-row-"+count+"\">"+
                "<td>"+lang['PSA']+"</td>"+
                "<td> <input type=\"text\" class=\"psa-element\" id=\"psa-element-"+count+"\" name=\"\" value=\"\" /> </td>  "  +
                "<td>"+lang['date']+"</td>"+
                "<td> <input type=\"text\" class=\"date-element\" id=\"date-element-"+count+"\" name=\"\" value=\"\" /> </td> "  +
                "<td style=\"cursor:pointer;\"><div id=\"delete-element-"+count+"\" index=\""+count+"\">-</div></td>" +
            "</tr>"   
        );
        setDateTimePicker("#date-element-"+count);
        $("#delete-element-"+count).click(function(){
            var index=$(this).attr("index");
            $(obj.psaElements[index]).remove();
            obj.psaElements[index]=null;
            obj.numPsaElements--;
            if(obj.numPsaElements>0){
                $("#psa-progression-header").show();
            }else{
                $("#psa-progression-header").hide();
            }
        });
        obj.psaElements.push($("#psa-progression-row-"+count));
        $("#psa-element-"+count).keyup(function(){
            if(isNaN(parseFloat($(this).val())) || !isFinite($(this).val())){   
                $(this).val($(this).val().substring(0,$(this).val().length-1));
            }
        });
        $("#nadir").keyup(function(){
            if(isNaN(parseFloat($(this).val())) || !isFinite($(this).val())){   
                $(this).val($(this).val().substring(0,$(this).val().length-1));
            }
        });
        obj.numPsaElements++;
    });
};
ScreenCalculatorFive.prototype.printCalculatorFiveResult = function() {
    var obj=this;
    
    
    $("#home-button").click(function(){
        animation.startAnimation(
            {
                "screen": "calculatorFiveResultBack",
                "callback": function() {
                    obj.hideAll();
                    obj.printCalculatorFiveField(true);
                },
                "animation":
                    [
                        {
                            "type": animation.FADETOGGLE_ANIMATION,
                            "elements": ["#footer-calculator"],
                            "inHide":function(){
                                $(obj.FOOTER.BUTTONS).html("");
                                obj.createButton(obj.FOOTER.BUTTONS, "reset-button", lang["Clear"], "button-form");
                                obj.createButton(obj.FOOTER.BUTTONS, "calculate-button", lang["Ending"], "button-form");
                                
                            }
                        },
                        {
                            "type": "hide",
                            "elements": ["#calculator-five-screen-result"]
                        },
                        {
                            "type": "show",
                            "elements": ["#calculator-five-screen"]
                        },
                        {
                            "type": animation.FADEIN_ANIMATION,
                            "elements": ["#footer-calculator"]
                        }
                    ]
            }); 
        
    });  
};
var ScreenCalculatorSix = function(screenCalculators,buttonBack,buttonEnd) {
    this.psaElements=[];
    this.numPsaElements=0;
    this.valuesSelected={
    };
    this.useGrade=false;
};
ScreenCalculatorSix.prototype = new Screen();
ScreenCalculatorSix.prototype.constructor = ScreenCalculatorSix;
ScreenCalculatorSix.prototype.init = function() {
   this.cicles=[
        lang['TNM primary tumor'],
        lang['TNM ganglios'],
        lang['TNM metastasis'],
        lang['TNM pronóstico']
   ];
    this.questionIndex=0;
};
ScreenCalculatorSix.prototype.printCalculatorSixField = function(back) {
    var obj=this;
    $(obj.MENU_ITEMS.ITEM_CALCULATORS_SIX).show();
     
    $("#tmn_t_sublevel_group").hide();
    $("#t_section").show();
    $("#m_section").hide();
    $("#n_section").hide();
    $("#pronostic_section").hide();

    this.questionIndex=0;
    $( "#calculator-six-subheader h2" ).html(this.cicles[this.questionIndex]);

    $("#tmn_t_level_select").change(function(){
        switch($(this).val()){
            case "t4":
            case "tx":
                $("#tmn_t_sublevel_group").hide();
                break;
            case "t1":
                 $("#tmn_t_sublevel_group").show();
                obj.setDropDown($("#tmn_t_subnivel_select"),lang['TNM t1 sublevels']);
                break;
            case "t2":
                 $("#tmn_t_sublevel_group").show();
                obj.setDropDown($("#tmn_t_subnivel_select"),lang['TNM t2 sublevels']);
                break;
            case "t3":
                 $("#tmn_t_sublevel_group").show();
                obj.setDropDown($("#tmn_t_subnivel_select"),lang['TNM t3 sublevels']);
                break;
        }
    });
    $("input[group='m_section']").each(function(){
        var objCheckbox=this;
        $(this).click(function(){
            if($(this).is(":checked")){
                $("input[group='m_section']").each(function(){
                    if(this!=objCheckbox){
                        $(this).prop( "checked", false );
                    }
                });
            } 
        });
    });
    $("input[group='n_section']").each(function(){
        var objCheckbox=this;
        $(this).click(function(){
            if($(this).is(":checked")){
                $("input[group='n_section']").each(function(){
                    if(this!=objCheckbox){
                        $(this).prop( "checked", false );
                    }
                });
            } 
        });
    });
    $("input[group='pronostic_section']").each(function(){
        var objCheckbox=this;
        $(this).click(function(){
            if($(this).is(":checked")){
                $("input[group='pronostic_section']").each(function(){
                    if(this!=objCheckbox){
                        $(this).prop( "checked", false );
                    }
                });
            } 
        });
    });
    
    $("#tmn_t_level_select").change();
    $("input[group='decimal']").each(function(){
         $(this).keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                 // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                 // Allow: Ctrl+C
                (e.keyCode == 67 && e.ctrlKey === true) ||
                 // Allow: Ctrl+X
                (e.keyCode == 88 && e.ctrlKey === true) ||
                 // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
     });
    obj.createButton("#footer-calculator", "home-button", "", "home-button");
    obj.createButton(obj.FOOTER.BUTTONS, "next-button", "", "next-button");
    $("#home-button").click(function() {
        $("#next-button").attr("disabled","disabled");     
        $("#home-button").attr("disabled","disabled");
        animation.clear();
        obj.questionIndex--;
        animation.startAnimation(
        {
            "screen": "calculatorSixResultBack",
            "callback": function() {    
                $("#home-button").removeAttr("disabled"); 
                $("#next-button").removeAttr("disabled");
                
            },
            "animation":
                [
                    {
                        "type": animation.FADETOGGLE_ANIMATION,
                        "elements": ["#footer-calculator"],
                        "inHide": function(){
                        }
                    },
                    {
                        "type": animation.FADETOGGLE_ANIMATION,
                        "elements": ["#calculator-six-subheader h2"],
                        "inHide": function(){                               
                            
                        }
                    },
                    {
                        "type": animation.FADETOGGLE_ANIMATION,
                        "elements": ["#content-calculator-scroll"],
                        "inHide":function(){
                           $( "#calculator-six-subheader h2" ).html(obj.cicles[obj.questionIndex]);
                                if(obj.questionIndex==0){
                                    $("#t_section").show();
                                    $("#calculate-button").hide();
                                    $("#home-button").hide();
                                    $("#next-button").show();
                                }else{
                                    $("#t_section").hide();
                                }
                                if(obj.questionIndex==2){
                                    $("#m_section").show();
                                    $("input[group='n_section']").each(function(){
                                        if($(this).is(":checked")){
                                            obj.valuesSelected["N"]=$(this).val();
                                        }
                                    });  
                                    $("#calculate-button").hide();
                                    $("#home-button").show();
                                    $("#next-button").show();
                                }else{
                                    $("#m_section").hide();
                                }
                                if(obj.questionIndex==1){
                                    $("#calculate-button").hide();
                                    $("#home-button").show();
                                    $("#next-button").show();
                                    $("#n_section").show();
                                    if($("#tmn_t_level_select").val()=="t1" 
                                       || $("#tmn_t_level_select").val()=="t2" 
                                       || $("#tmn_t_level_select").val()=="t3" ){
                                        obj.valuesSelected["T"]=$("#tmn_t_subnivel_select").val();
                                    }else{
                                        obj.valuesSelected["T"]=$("#tmn_t_level_select").val();
                                    } 
                                }else{ 
                                    $("#n_section").hide();
                                }
                                if(obj.questionIndex==3){
                                    $("#calculate-button").show();
                                    $("#home-button").show();
                                    $("#next-button").hide();
                                    $("#pronostic_section").show();
                                     $("input[group='m_section']").each(function(){
                                        if($(this).is(":checked")){
                                            obj.valuesSelected["M"]=$(this).val();
                                        }
                                    });
                                }else {
                                    $("#pronostic_section").hide();
                                }
                        }          
                    },
                    

                    {
                        "type": animation.FADEIN_ANIMATION, 
                        "elements": ["#calculator-six-subheader h2"]
                    },
                    {
                        "type": animation.FADEIN_ANIMATION,
                        "elements": ["#content-calculator-scroll"]

                    },
                    {
                        "type": animation.FADEIN_ANIMATION,
                        "elements": ["#footer-calculator"]
                    }              

                ]
        }); 
    });
    $("#next-button").click(function() {
           $("#next-button").attr("disabled","disabled");     
           $("#home-button").attr("disabled","disabled");    
           animation.clear();
           animation.startAnimation(
            {
                "screen": "calculatorSixResultBack",
                "callback": function() {    
                    $("#home-button").removeAttr("disabled"); 
                    $("#next-button").removeAttr("disabled"); 
                },
                "animation":
                    [
                         {
                            "type": animation.FADETOGGLE_ANIMATION,
                            "elements": ["#footer-calculator"],
                            "inHide": function(){
                                obj.questionIndex++;
                                if((obj.questionIndex+1)===obj.cicles.length){
                                   $("#calculate-button").show();
                                    $("#home-button").show();
                                    $("#next-button").hide();
                                }
                            }
                        },
                        {
                            "type": animation.FADETOGGLE_ANIMATION,
                            "elements": ["#calculator-six-subheader h2"],
                            "inHide": function(){                               
                               
                            }
                        },
                        {
                            "type": animation.FADETOGGLE_ANIMATION,
                            "elements": ["#content-calculator-scroll"],
                            "inHide":function(){
                                $( "#calculator-six-subheader h2" ).html(obj.cicles[obj.questionIndex]);
                                if(obj.questionIndex==0){
                                    $("#t_section").show();
                                    $("#calculate-button").hide();
                                    $("#home-button").hide();
                                    $("#next-button").show();
                                }else {
                                    $("#t_section").hide();
                                }
                                if(obj.questionIndex==2){
                                    $("input[group='m_section']").each(function(){
                                        if($(this).is(":checked")){
                                            $(this).prop('checked', false);
                                        }
                                    });
                                    $("#m_section_mx").prop('checked', true);
                                    $("#m_section").show();
                                    $("input[group='n_section']").each(function(){
                                        if($(this).is(":checked")){
                                            obj.valuesSelected["N"]=$(this).val();
                                        }
                                    });
                                    $("#calculate-button").hide();
                                    $("#home-button").show();
                                    $("#next-button").show();
                                }else{
                                    $("#m_section").hide();
                                }
                                if(obj.questionIndex==1){
                                    $("#calculate-button").hide();
                                    $("#home-button").show();
                                    $("#next-button").show();
                                     $("input[group='n_section']").each(function(){
                                        if($(this).is(":checked")){
                                            $(this).prop('checked', false);
                                        }
                                    });
                                    $("#n_section_nx").prop('checked', true);
                                    $("#n_section").show();
                                    if($("#tmn_t_level_select").val()=="t1" 
                                       || $("#tmn_t_level_select").val()=="t2" 
                                       || $("#tmn_t_level_select").val()=="t3" ){
                                        obj.valuesSelected["T"]=$("#tmn_t_subnivel_select").val();
                                    }else{
                                        obj.valuesSelected["T"]=$("#tmn_t_level_select").val();
                                    } 
                                }else{ 
                                    $("#n_section").hide();
                                }
                                if(obj.questionIndex==3){
                                    $("#calculate-button").show();
                                    $("#home-button").show();
                                    $("#next-button").hide();
                                    $("#pronostic_section").show();
                                     $("input[group='m_section']").each(function(){
                                        if($(this).is(":checked")){
                                            obj.valuesSelected["M"]=$(this).val();
                                        }
                                    });
                                }else {
                                    $("#pronostic_section").hide();
                                }
                            }          
                        }, 
                        {
                            "type": animation.FADEIN_ANIMATION, 
                            "elements": ["#calculator-six-subheader h2"]
                        },
                        {
                            "type": animation.FADEIN_ANIMATION,
                            "elements": ["#content-calculator-scroll"]
                            
                        },
                        {
                            "type": animation.FADEIN_ANIMATION,
                            "elements": ["#footer-calculator"]
                        }              
                       
                    ]
            }); 
             
    });
    obj.createButton(obj.FOOTER.BUTTONS, "calculate-button", lang["Ending"], "button-form");
    $("#calculate-button").click(function(){
         obj.useGrade=false;
         obj.valuesSelected["PSA"]=$("#pronostic_section_psa_value").val();
         obj.valuesSelected["GLEASONONE"]=$("#pronostic_section_gleason_value_one").val();
         obj.valuesSelected["GLEASONTWO"]=$("#pronostic_section_gleason_value_two").val();
         obj.valuesSelected["G"]=0;
         
         if(obj.valuesSelected["GLEASONONE"] == "" && obj.valuesSelected["GLEASONTWO"] != ""){
             obj.valuesSelected["GLEASONONE"] = "0";
         }
         if(obj.valuesSelected["GLEASONONE"] != "" && obj.valuesSelected["GLEASONTWO"] == ""){
             obj.valuesSelected["GLEASONTWO"] = "0";
         }
         if(obj.valuesSelected["GLEASONONE"] != "" && obj.valuesSelected["GLEASONTWO"] != "") {
             if ((parseFloat(obj.valuesSelected["GLEASONONE"]) + parseFloat(obj.valuesSelected["GLEASONTWO"])) > 10) {
                 alert(lang["gleason_max_limit"]);
                 return;
             }
         }

         animation.startAnimation(
         {
             "screen": "calculatorSixResult",
             "callback": function() {     

             },
             "animation":
                 [
                     {
                         "type": animation.FADETOGGLE_ANIMATION,
                         "elements": ["#footer-calculator"],
                         "inHide": function(){
                             $("#home-button").remove();
                                obj.printCalculatorSixResult();
                             
                         }
                     },
                     {
                         "type": "hide",
                         "elements": ["#calculator-six-subheader","#calculator-six-screen"]
                     },
                     {
                         "type": "show",
                         "elements": [obj.SUB_ITEMS.ITEM_CALCULATORS_SIX_RESULT]
                     },
                     {
                         "type": animation.FADEIN_ANIMATION,
                         "elements": ["#footer-calculator"]
                     }
                 ]
         }); 
    });
    $("#calculate-button").hide();
    $("#home-button").hide();
    $("#next-button").show();
};
ScreenCalculatorSix.prototype.setDropDown = function(o,elements) {
    $(o).html("");
    for(var elem in elements){
        $(o).append("<option value='"+elem+"'>"+elements[elem]+"</option>");
    }
    $(o).change();
};
ScreenCalculatorSix.prototype.hideResultImages=function(){
    $("#modelt2a").hide();
    $("#modelt2b").hide();
    $("#modelt2c").hide();
    $("#modelt3a").hide();
    $("#modelt3b").hide();
    $("#modelt4").hide();
};
ScreenCalculatorSix.prototype.hideResultButtons=function(){
    $("#modelt1a_button").hide();
    $("#modelt1b_button").hide();
    $("#modelt1c_button").hide();
    $("#modelt2a_button").hide();
    $("#modelt2b_button").hide();
    $("#modelt2c_button").hide();
    $("#modelt3a_button").hide();
    $("#modelt3b_button").hide();
    $("#modelt4_button").hide();
};
ScreenCalculatorSix.prototype.cssResultButtons=function(){
    $("#modelt1a_button").attr("class","estadiaje_button");
    $("#modelt1b_button").attr("class","estadiaje_button");
    $("#modelt1c_button").attr("class","estadiaje_button");
    $("#modelt2a_button").attr("class","estadiaje_button");
    $("#modelt2b_button").attr("class","estadiaje_button");
    $("#modelt2c_button").attr("class","estadiaje_button");
    $("#modelt3a_button").attr("class","estadiaje_button");
    $("#modelt3b_button").attr("class","estadiaje_button");
    $("#modelt4_button").attr("class","estadiaje_button");
};
ScreenCalculatorSix.prototype.selectedChange=function(selected){
    $("#3d").hide();
    var estadiaje="";
    switch(selected){
        case "t2a":
            $("#3d").show();
            estadiaje="2a";
            break;
        case "t2b":
            $("#3d").show();
            estadiaje="2b";
            break;
        case "t2c":
            $("#3d").show();
            estadiaje="2c";
            break;
        case "t3a":
            $("#3d").show();
            estadiaje="3a";
            break;
        case "t3b":
            $("#3d").show();
            estadiaje="3b";
            break;          
        case "t4":
            $("#3d").show();
            estadiaje="4";
            break;
    }
    return estadiaje;
    
    
};
ScreenCalculatorSix.prototype.printCalculatorSixResult = function() {
    var obj=this;
    var estadiaje;
    $("#calculate-button").remove();
    $("#home-button").remove();
    obj.createButton("#footer-calculator", "home-button", "", "home-button");
    obj.createButton(obj.FOOTER.BUTTONS,"export-csv", lang['export-csv'], "export-button");
    obj.createButton(obj.FOOTER.BUTTONS,"3d", lang['3d'], "export-button");
    var selectedTumor="";
    var estadiajes=[];
    var calculator=new Calculator();
    var objects=[
        {button:"#modelt1a_button",image:"",t:"t1a"},
        {button:"#modelt1b_button",image:"",t:"t1b"},
        {button:"#modelt1c_button",image:"",t:"t1c"},
        {button:"#modelt2a_button",image:"#modelt2a",t:"t2a"},
        {button:"#modelt2b_button",image:"#modelt2b",t:"t2b"},
        {button:"#modelt2c_button",image:"#modelt2c",t:"t2c"},
        {button:"#modelt3a_button",image:"#modelt3a",t:"t3a"},
        {button:"#modelt3b_button",image:"#modelt3b",t:"t3b"},
        {button:"#modelt4_button",image:"#modelt4",t:"t4"}
    ];
    var res= "NO SE HA PODIDO DETERMINAR EL RIESGO";
    

    var resRiskLocation = calculator.calculator6GetRiskAndLocation( this.valuesSelected['T'], this.valuesSelected['M'], this.valuesSelected['N'], this.valuesSelected['PSA'], this.valuesSelected['GLEASONONE'] , this.valuesSelected['GLEASONTWO']);
    var resRisk = resRiskLocation[0];
    var resLoc = resRiskLocation[1];

    if(resRisk!="" || resLoc!=""){
        if(resLoc == LOCALICE && resRisk == LOWRISK){
            res = "CÁNCER DE PRÓSTATA LOCALIZADO DE BAJO RIESGO";
        }
        if(resLoc == LOCALICE && resRisk == MEDIARISK){
            res = "CÁNCER DE PRÓSTATA LOCALIZADO DE RIESGO INTERMEDIO";
        }
        if(resLoc == LOCALICE && resRisk == HIGHTRISK){
            res = "CÁNCER DE PRÓSTATA LOCALIZADO DE ALTO RIESGO";
        }
        if(resLoc == LOCALICEADVANCE){
            res = "CÁNCER DE PRÓSTATA LOCALIZADO DE ALTO RIESGO";
        }
        if(resRisk == METASTICORISK){
            res = "CÁNCER DE PRÓSTATA METASTÁSICO";
        }
    }else{
        res = "NO SE HA PODIDO DETERMINAR EL RIESGO";
    }
    
     $("#risk-result").html(res);    
    this.hideResultImages();
    this.hideResultButtons();
    
    var setSelect=function(s){
        obj.hideResultImages();
        obj.cssResultButtons();
        $(s.button).attr("class","estadiaje_button_select");
        $(s.button).show();
        $(s.image).show();
        obj.estadiaje=obj.selectedChange(s.t);
    };
    var count=0;
    for(var i in objects){
        var o=objects[i];
        if(o.t==this.valuesSelected['T']){
            setSelect(o);
        }
    }
    if(this.valuesSelected['T']=='tx'){
        setSelect(objects[0]);
        for(var i in objects){
            var o=objects[i];
            $(o.button).show();
        }
    }
    if(this.valuesSelected['T']=='tx' || this.valuesSelected['T']=='t1a' || this.valuesSelected['T']=='t1b' || this.valuesSelected['T']=='t1c'){
        $("#estadiaje_image").hide();
    }else{
        $("#estadiaje_image").show();
    }
    for(var i in objects){
        var o=objects[i];
        $(o.button).attr("index",i);
        $(o.button).click(function(){
           var index=$(this).attr("index");
           setSelect(objects[index]);
        });
    }
    $("#t_result").html(lang['TMN_TMN_AVAILABLES'][this.valuesSelected['T']]);
    $("#m_result").html(lang['TMN_TMN_AVAILABLES'][this.valuesSelected['M']]);
    $("#n_result").html(lang['TMN_TMN_AVAILABLES'][this.valuesSelected['N']]);
    
    $(".psa_group").each(function(){$(this).show();});
    $(".grade_group").each(function(){$(this).hide();});
    if(this.valuesSelected['PSA'] != "") {
        $("#psa_result").html(this.valuesSelected['PSA']);
    }else{
        $("#psa_result").html("indeterminado");
    }

    var gleasonNumOne = 0;
    var gleasonNumTwo = 0;
    var gleasonSum = 0;
    if(this.valuesSelected['GLEASONONE'] != ""){
        gleasonNumOne = parseFloat((this.valuesSelected['GLEASONONE']=="")?"0":this.valuesSelected['GLEASONONE']);
        gleasonNumTwo = parseFloat((this.valuesSelected['GLEASONTWO']=="")?"0":this.valuesSelected['GLEASONTWO']);
        gleasonSum = gleasonNumOne + gleasonNumTwo;
        $("#gleason_result").html(gleasonSum + " (" + gleasonNumOne + "+" + gleasonNumTwo +")");
    }else{
        $("#gleason_result").html("indeterminado");
    }
    
    $("#3d").click(function(){
        window.open('Model3D.html?tumor='+obj.estadiaje);
    });
    $("#export-csv").click(function(){
         APPDROGENO.exportTMN(lang['TMN_TMN_AVAILABLES'][obj.valuesSelected['T']],
                              lang['TMN_TMN_AVAILABLES'][obj.valuesSelected['M']],
                              lang['TMN_TMN_AVAILABLES'][obj.valuesSelected['N']],
                              obj.useGrade,
                              lang['TMN_TMN_AVAILABLES'][obj.valuesSelected['G']],
                              obj.valuesSelected['PSA'],
                                gleasonNumOne,
                                gleasonNumTwo,
                              res
                             );
    });
    $("#home-button").click(function(){
        $("#tmn_t_level_select :nth-child(1)").prop('selected', true);
        $("#tmn_t_level_select").change();
        animation.startAnimation(
            {
                "screen": "calculatorFiveResultBack",
                "callback": function() {
                   $("#home-button").remove();
                   $("#tmn_t_level_select :nth-child(1)").prop('selected', true);
                   $("#tmn_t_level_select").change();  
                },
                "animation":
                    [
                        {
                            "type": animation.FADETOGGLE_ANIMATION,
                            "elements": ["#footer-calculator"],
                            "inHide":function(){
                                $(obj.FOOTER.BUTTONS).html("");
                                $("#home-button").remove();
                                 obj.printCalculatorSixField();
                            }
                        },
                        {
                            "type": "hide",
                            "elements": ["#calculator-six-screen-result"]
                        },
                        {
                            "type": "show",
                            "elements": ["#calculator-six-subheader"],
                            "inHide": function(){                               
                               
                            }
                        },
                        {
                            "type": "show",
                            "elements": ["#calculator-six-screen"]
                        },
                        
                        {
                            "type": animation.FADEIN_ANIMATION,
                            "elements": ["#footer-calculator"]
                        }
                         
                    ]
            }); 
        
    });  
};
var ScreenCalculatorSeven = function(screenCalculators,buttonBack,buttonEnd) {

};
ScreenCalculatorSeven.prototype = new Screen();
ScreenCalculatorSeven.prototype.constructor = ScreenCalculatorSeven;
ScreenCalculatorSeven.prototype.init = function() {};
ScreenCalculatorSeven.prototype.printCalculatorSevenField = function(back) {
    var obj=this;
    $("#calc-seven-t-info").click(function(){
        $(".ui-dialog-content").dialog("close");
        $("#calc-seven-t-popup").dialog({width:'700',height:'400'});
        $(".ui-widget-content,.ui-widget-header").removeClass("ui-widget-content ui-corner-all").css("border","none");

    });
    $("#calc-seven-m-info").click(function(){
        $(".ui-dialog-content").dialog("close");
        $("#calc-seven-m-popup").dialog({width:'700',height:'400'});
        $(".ui-widget-content,.ui-widget-header").removeClass("ui-widget-content ui-corner-all").css("border","none");
       
    });
    $("#calc-seven-n-info").click(function(){
        $(".ui-dialog-content").dialog("close");
        $("#calc-seven-n-popup").dialog({width:'700',height:'400'});
        $(".ui-widget-content,.ui-widget-header").removeClass("ui-widget-content ui-corner-all").css("border","none");     
    });
    $("#calc-seven-g-info").click(function(){
        $(".ui-dialog-content").dialog("close");
        $("#calc-seven-g-popup").dialog({width:'700',height:'400'});
        $(".ui-widget-content,.ui-widget-header").removeClass("ui-widget-content ui-corner-all").css("border","none");       
    });
};

var Calculator = function() {};
Calculator.prototype.calculator1 = function(values) {
    var ret={"PSADT":0,"VPSA":0};
    var scopeDateY={}; 
    var scopeDateX={};  
    var velocitypsaY={}; 
    var velocitypsaX={}; 
    for(var x in values){
        var datestr=values[x]["date"];
        var psa=values[x]["PSA"];
        var dateval=datestr.split("/");
        var years=dateval[2];
        var months=dateval[1];
        var days=dateval[0];
        var diff =  Date.UTC(years,months-1,days,0,0,0) - Date.UTC(1900,0,1,0,0,0);
        var secleft = diff/1000/60;
        var hrsleft = secleft/60;
        var difDay = hrsleft/24;
        difDay=difDay+2;//for two days and added the bug in Excel that counts the whole last day as account 1900 as a leap
        var difYears=difDay/365.25;
        scopeDateX[x]=difYears;
        scopeDateY[x]=Math.log(parseFloat(psa));   
        velocitypsaX[x]=difYears;
        velocitypsaY[x]=parseFloat(psa);
    }
    var linearegressionSlope=linearRegression(scopeDateX,scopeDateY);
    var linearegressionVelocity=linearRegression(velocitypsaX,velocitypsaY);
    if(!isNaN(linearegressionSlope["slope"]) && linearegressionSlope["slope"]!=0 
            && !isNaN(linearegressionVelocity["slope"]) ){
        ret["PSADT"]=Math.round((((Math.log(2)/linearegressionSlope["slope"])*12))*100)/100;
        ret["VPSA"]=Math.round((linearegressionVelocity["slope"]/12)*100)/100;
    }
    return ret;
};
Calculator.prototype.calculator2 = function(creatinine, creatinine_unid, age, weight, male, female) {
    if (creatinine_unid === "2")
        creatinine /= 88;
    var result = (140 - age) * weight * (male ? 1 : 0.85) / (72 * creatinine);
    return Math.round(result * 100) / 100;
};
Calculator.prototype.calculator3 = function(height, weight, height_unit, formula) {
    if (height_unit === "2")
        height *= 100;
    var result = 0;
    switch (parseInt(formula)) {
        case 1:
            result = (0.7184 * Math.pow(height, 0.725) * Math.pow(weight, 0.425)) / 100;
            break;
        case 2:
            result = (2.35 * Math.pow(height, 0.42246) * Math.pow(weight, 0.51456)) / 100;
            break;
        case 3:
            result = (2.4265 * Math.pow(height, 0.3964) * Math.pow(weight, 0.5378)) / 100;
            break;
        case 4:
            result = Math.sqrt(height * weight / 3600);
            break;
        default:
            result = 0;
    }
    result = Math.round(result * 100) / 100;
    return result;
};
Calculator.prototype.calculator4 = function(values){

    var arr_result={
        "intensity":values[3],
        "interference":(values[4]+values[5]+values[6]+values[7]+values[8]+values[9])/6,
        "global":(((values[4]+values[5]+values[6]+values[7]+values[8]+values[9])/6)+values[1]+values[2]+values[3])/4,
        "intensityDescription": "",
        "interferenceDescription": "",
        "globalDescription": ""
    };
    arr_result["intensityDescription"] = getGetGrade(arr_result["intensity"]) + " y " + getGetSignificative(arr_result["intensity"]);
    arr_result["interferenceDescription"] = getGetGrade(arr_result["interference"]) + " y " + getGetSignificative(arr_result["interference"]);
    arr_result["globalDescription"] = getGetGrade(arr_result["global"]);

    return arr_result;
};
function getGetGrade(level){
    if(level >=0 && level<4){
        return lang["fatigue_grade_leve"];
    }else if(level >= 4 && level<7){
        return lang["fatigue_grade_moderada"];
    }else{
        return lang["fatigue_grade_severa"];
    }
}

function getGetSignificative(level){
    if(level < 5){
        return lang["fatigue_nosignificative"];
    }else{
        return lang["fatigue_significative"];
    }
}

Calculator.prototype.calculator5 = function(psa,nadir,date,tetosterone,tetosteroneUnit,radiologicOne,radiologicTwo){
    var result = [];
    nadir = parseFloat(nadir);
    var testosterone_problem=false;
    if (((tetosteroneUnit=="ng/dl" && tetosterone < 50) || (tetosteroneUnit=="nmol/l" && tetosterone < 1.7)) && tetosterone!="") {
        result[result.length]=lang["calc5_tetosterone_result_level"].replace("<50 ng/dl",tetosteroneUnit == "ng/dl" ? "< 50 ng/dl" : "< 1.7 nmol/l");
        testosterone_problem=true;
    }
    if (radiologicOne || radiologicTwo) {
        result[result.length]=lang["calc5_radiologic_progress_result"];
    }
    //order
    var dateOrder = [];
    if(testosterone_problem && date.length>=3){
        for (var count2=0;count2<date.length;count2++) {
            var date1 = getDate(date[count2]);
            var psa1 = psa[count2];
            dateOrder[count2]={'date':date1,'psa':parseFloat(psa1)};
        }
        dateOrder.sort(function(a, b) {
            a = a.date;
            b = b.date;
            return a<b ? -1 : a>b ? 1 : 0;
        });
        
        var bioExists=false;
        if(dateOrder.length>=3) {
            var lastPsaValue = 0;
            var rowsWithPSAValuesIncreasedArray = [];
            for (var currentRowDataindex in dateOrder) {
                var currentRowData = dateOrder[currentRowDataindex];
                //if PSA its higher than previous value add to list
                if(currentRowData.psa > lastPsaValue){
                    rowsWithPSAValuesIncreasedArray[rowsWithPSAValuesIncreasedArray.length]=currentRowData;
                    lastPsaValue = currentRowData.psa;
                }else{
                    //when first not increase value comes, calculate
                    bioExists = checkBiologic(rowsWithPSAValuesIncreasedArray, nadir);
                    rowsWithPSAValuesIncreasedArray=[];
                    lastPsaValue = 0;
                    if(bioExists){
                        break;
                    }
                }
            }
            //if there is values in the array without check (the last values is raising)
            if(rowsWithPSAValuesIncreasedArray.length > 0){
                bioExists = checkBiologic(rowsWithPSAValuesIncreasedArray, nadir);
            }
        }
        if(bioExists){ 
            result[result.length]=lang["calc5_bioquimic_progress_result"];
        }
    }
    
    return result;
        
};
function checkBiologic(rowsWithPSAIncreasing,nadirValue) {
    var psaIncreaseCounter = 0;
    var nadirRaiseCounter = 0;

    var halfNadir = nadirValue/2;

    //at least 3 PSA increase and the last value of PSA must be higher than 2
    if(rowsWithPSAIncreasing.length<3 || rowsWithPSAIncreasing[(rowsWithPSAIncreasing.length-1)].psa<=2){
        return false;
    }

    var lastDate = getDate("01/01/1970");
    var lastPSA = 0;
    for(var increasedPSAindex in rowsWithPSAIncreasing){
        var increasedPSA = rowsWithPSAIncreasing[increasedPSAindex];
        var lastdatapsa = {'date':lastDate,'psa':lastPSA};
        //if the PSA increases from last and it's 50% higher than NADIR check the date
        if (((increasedPSA.date - lastdatapsa.date)/(1000*60*60*24)) >= 7 && increasedPSA.psa > nadirValue){
            psaIncreaseCounter++;
            
            if (lastPSA > 0 && (increasedPSA.psa - nadirValue) > halfNadir) {
                nadirRaiseCounter++;
            }
            //only increase date when it's a week longer
            lastDate = increasedPSA.date;
        }
        lastPSA = increasedPSA.psa;
    }

    if(psaIncreaseCounter >= 3 && nadirRaiseCounter >= 2){
        return true;
    }else{
        return false;
    }
}

var LOWRISK = "lowRisk";
var MEDIARISK = "mediaRisk"
var HIGHTRISK = "hightRisk";
var METASTICORISK = "metasticorisk";

var LOCALICE = "localice";
var LOCALICEADVANCE = "localiceAdvance";
var ADVANCE = "advance";
Calculator.prototype.calculator6GetRiskAndLocation = function( t, m, n, Spsa, SgleasonOne, SgleasonTwo){
    var result = ["", ""];

    var psa = parseFloat((Spsa == "") ? "0" : Spsa);
    var gleasonOne = parseFloat((SgleasonOne == "") ? "0" : SgleasonOne);
    var gleasonTwo = parseFloat((SgleasonTwo == "") ? "0" : SgleasonTwo);
    var gleason = gleasonOne + gleasonTwo;

    // T: entre T1 y T2a Y N: NX o N0 Y M: MX o M0 Y PSA: <10 Y GLEASON: <7
    if ( (t == "t1a" || t == "t1b" || t == "t1c" || t == "t2a")  &&
            (n == "n0" || n == "nx") &&
            (m == "m0" || m == "mx") &&
            psa < 10  &&
            gleason < 7
            ) {
        result[0] = LOWRISK;
        result[1] = LOCALICE;

    }
    
    // (T: T2b o PSA: entre 10 y 20 o GLEASON: =7) y (NX o N0 – MX o M0)
    if ( (t == "t2b" || (psa >= 10 && psa <= 20) || gleason == 7) 
            && (n == "n0" || n == "nx") 
            && (m == "m0" || m == "mx")){
        result[0] = MEDIARISK;
        result[1] = LOCALICE;
    }
    
    //  T: T2c o PSA: >20 o GLEASON: >7
    if ( t == "t2c" || psa > 20 || gleason > 7 ){
        result[0] = HIGHTRISK;
        result[1] = LOCALICE;
    }
    
    //T: entre 3 y 4  o N: N1
    if( t == "t3a" || t == "t3b" || t == "t4" || n == "n1"){
        result[0] = HIGHTRISK;
        result[1] = LOCALICEADVANCE;
    }
    
    //M1
    if(m == "m1"){
        result[0] = METASTICORISK;
        result[1] = ADVANCE;
    }

    return result;
};
Calculator.prototype.calculator6GetRisk=function( t, m, n, psa, gleason){
    if(t=="t3a" || t=="t3b" || n=="n1"){
        return "hightrisk";
    }
    //cT2c ó PSA >20 ng/ml ó Gleason > 7.
    if((psa>20) || gleason > 7 || t=="t2c"){
        return "hightrisk";
    }
    //cT2b ó Gleason = 7 ó (PSA >10 y ≤20 ng/ml).
    if((psa>10 && psa<=20) || gleason==7 || t=="t2b" ){
        return "mediarisk";
    }
    //cT1–cT2a y Gleason <7 y PSA ≤10 ng/ml.
    if(psa<=10 && gleason<7 && (t=="t1a"  || t=="t1b" || t=="t1c" || t=="t2a")){
        return "lowrisk";
    }
    return "";
};

Calculator.prototype.calculator6GetLocation = function( t,  m,  n){
    //N1 o M1 o cT4
    if(t=="t4" || n=="n1" || m=="m1"){
        return "diseminated";
    }
    //cT1–cT2, N0–Nx, M0–Mx
    if((t=="t1a" || t=="t1b"
            || t=="t1c" || t=="t2a"
            || t=="t2c" || t=="t2b"
        ) && (n=="n0" || n=="nx")
            && (m=="m0" || m=="mx")
    ){
        return "localice";
    }
    //cT3, N0–Nx, M0–Mx
    if((t=="t3a" || t=="t3b")  && (n=="n0" || n=="nx") &&  (m=="m0" || m=="mx")
    ){
        return "advanced";
    }
    
    return "";
};

function initGoogleAnalitic(){
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
}
function googleAnalytic() {
    ga('create', 'UA-50944634-1', 'appdrogeno-provisional-website.es');
    ga('send', 'pageview');
}
function setDateTimePicker(o) {          
    $(o).datepicker({dateFormat: "dd/mm/yy", dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'], dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'], monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'], monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'], firstDay: 1, maxDate: new Date()});
};
function getDate(dateS){
    var arrDate=dateS.split("/");
    var date=new Date(arrDate[2]+"-"+arrDate[1]+"-"+arrDate[0]);
    return date;
};
