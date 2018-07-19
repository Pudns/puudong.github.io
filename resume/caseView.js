var caseViwe = {
    init: function () {
        caseViwe.industryClass();//--一级行业数据
        caseViwe.event_(); //--全局事件
    },
    event_:function () {
        var classification1;
        $("#industry").on("click","li",function () {//--一级列表
            if ($(this).parent().parent().hasClass("inner-l")) {
                if ($(this).children("ul").css("height") == "0px") {
                    $(this).children("ul").css("height","auto");
                    $(this).siblings().children("ul").css("height",0);
                    $(this).children("i").css("background-position","-35px -38px");
                    $(this).siblings().children("i").css("background-position","-35px -18px");
                } else {
                    $(this).children("ul").css("height",0);
                    $(this).children("i").css("background-position","-35px -18px");
                }
                classification1 = $(this).children("span").text();
            } else {
                window.location.href = "/resumecase/" + classification1 + "/" + $(this).text() + "";
            }
        });
        $("#industry").on("click","ul li",function (e) {//--二级列表
            if(e.stopPropagation()){
                e.stopPropagation();
            }else{
                e.cancelBubble=true;
            };
        });
    },
    industryClass: function () {  //--一级行业数据
        $.ajax({
            type: "get",
            url: "http://www.capabcv.com/resumev2/resumev2.ashx?resumeaction=classificationloadv2",
            dataType: "jsonp",
            jsonp: "callback",
            success: function(data) {
                var str = "";
                var ele = "";
                var ele2 = "";
                var list1 = [];
                for(var i = 0;i < data.classification2.length;i++){
                    if(str != data.classification2[i].sClassification1){
                        list1.push(data.classification2[i].sClassification1);
                        ele += "<li class='list2'>"+"<span>"+data.classification2[i].sClassification1+"</span>"+"<i></i>"+"</li>";
                    };
                    str = data.classification2[i].sClassification1;
                };
                $("#industry").html(ele);
                for(var j = 0;j<list1.length;j++){
                    ele2 = "<ul>";
                    for(var i = 0;i < data.classification2.length;i++){
                        if(list1[j] == data.classification2[i].sClassification1){
                            ele2 += "<li>"+data.classification2[i].sClassification2+"</li>";
                        };
                    };
                    ele += "</ul>"
                    $(".list2").eq(j).html($(".list2").eq(j).html()+ele2);
                };
            },
        });
    },
};
$(function () {
    caseViwe.init();
});
function applyCase () {
    var cid = $("#vid").val();
    $.ajax({
        url: "http://www.capabcv.com/resumev2/Resumev2.ashx?resumeaction=essayedit",
        url: "http://www.capabcv.com/resumev2/Resumev2.ashx?resumeaction=essayedit",
        data: { caseId: cid },
        type: 'get',
        dataType: 'jsonp',
        crossDomain: true,
        success: function (data) {
            window.location.href = "http://www.capabcv.com/resumev2/pageproducter.aspx";
        },
        error: function() {
            alert("网络异常");
        },
    });
}
