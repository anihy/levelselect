/**
**切换地区组件
*select
*
*/
$(function(){
    var area = [
        ["北京", "上海", "深圳", "广州", "杭州"],
        { "province": "广东", "city": ["广州", "深圳", "珠海", "东莞", "汕头"] ,"initial":"G"},
        { "province": "广西", "city": ["南宁", "柳州", "桂林"], "initial": "G" },
        { "province": "福建", "city": ["福州", "泉州", "厦门"], "initial": "F" }
    ];
    var state = 0;//状态 0是初始或者完成选择，1是选择了省份，但是没选城市；
	/* var selectButton = $("#areaSelect").levelSelect(); */
	
    (function areaSelect(area) {
        var selectBox = $(".selectBox");
        var selectButton = $("#areaSelect");
        var html = selectBox.html();

        function init() {
            selectBox.html(html); //初始化box的dom结构
            var cityboxBox = selectBox.find("#hotcity");
            var provinceBox = selectBox.find("#province");
            var city = "";
            var province = "";
            $.each(area, function (i, value) {
                if (value instanceof Array) {
                    for (var j in value) {
                        city += "<a class='hotcity' href='#'>" + value[j] + "</a>";
                    }
                    cityboxBox.after(city);
                } else if (value instanceof Object) {
                    province += "<a class='province' href='#'>" + value.province + "</a>";
                    
                }
            });
            provinceBox.after(province);

        };
        
        selectButton.bind("click", function () {
            if (selectBox.is(":visible")) {
                selectBox.hide();
            } else {
                if (state == 0) {
                    selectButton.html("选择地区");
                    init();
                    init();
                }
                selectBox.show();

                $(document).bind("click", function (e) {
                    e.stopPropagation();
                    var t = $(e.target);
                    if (t.closest(selectBox).length === 0 && selectButton[0] != t[0] && state != 1) {
                        selectBox.hide();
                        $(document).unbind();
                    }
                    
                });
            }

            //给 input hidden 传递value
            if (selectButton.html() == "选择地区") {
                $("#area").attr("value", "");
            }
        });
        selectBox.delegate(".province", "click", function () {
            var that = $(this);
            state = 1;
            selectButton.html(that.html());
            $.each(area, function (i, value) {
                if (value instanceof Object) {
                    if (that.html() == value.province) {
                        var str1 = "";
                        for (var j in value.city) {
                            str1 += "<a class='city' href='#'>" + value.city[j] + "</a>"
                        }
                        selectBox.html("<span class='title'>" + that.html() + "省所有城市</span>" + str1);
                    }
                };
            });
            
            selectBox.delegate(".city", "click", function () {
                var str2 = selectButton.html() + " - " + $(this).html()
                selectButton.html(str2);
                $("#area").attr("value", $(this).html());
                selectBox.hide();
                state = 0;
                selectBox.undelegate(".city", "click");
            });
        }).delegate(".hotcity", "click", function () {
            selectButton.html($(this).html());
            $("#area").attr("value", $(this).html());
            selectBox.hide();
            state = 0;
        })
        
    })(area)
})


$.fn.levelSelect=function(){
	var $this = $(this);
	var selectFrameHtml = $this.html();
		$this.click(function(){
			
			console.log($this.html());
		})
		


};


