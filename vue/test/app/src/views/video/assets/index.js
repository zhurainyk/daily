function check_str(field) {
    with(field) {
        var arr = ['{', '}', '(', ')', '=', ',', ';', '"', '<', '>', 'script', 'iframe', '@', '&', '%', '$', '#', '*', ':', '.', 'if', '/', '\\'];
        if ("0" == '1') {
            var str = "色情|淫|秽|强奸|另类|乱伦|咻嘿|莉哥|AV";
            if (str != '') {
                strs = str.split("|");
                arr = arr.concat(strs);
            }
        }
        for (var key in arr) {
            if (value.toLowerCase().indexOf(arr[key].toLowerCase()) > -1) {
                return true;
            }
        }
        return false;

    }
}

function validate_form(thisform) {
    with(thisform) {
        if (wd.value.indexOf('http') === -1) {
            action = './so.php';
            wd.name = 'wd';
        } else {
            action = 'play.html';
            wd.name = 'url';
            wd.value = 'index.php?url=' + wd.value;
        }
        if (typeof wd !== "undefined" && wd.name == 'wd') {
            if (check_str(wd)) {

                alert("请勿输入非法字符！");
                return false
            }

        }
    }
}
//入口
function init() {
    var wd = _GET("wd");
    var url = _GET("url");
    console.log(url)
    if (wd === "" && url === "") {
        w = "";
        //w='<br><br><font size="4" color="LightGreen">...视</font><font color="LightGreen">频地址不能为空...</font>';

        $(".date").html(w);
    }
    if (wd !== "") {
        getvideo(wd);
    }

    w = "Vip智能解析系统";

    w += '  <a  style="color:Red;"  href="javascript:void(0);" onclick="echoby();" >   免责声明 </a><br><br>';

    $("#footer").html(w);
    toggleCenter();
}

//显示版权
function echoby() {

    alert("本站所有视频均来自外部引用，本站不存储不制作任何视频！\r\n 如有侵权问题，请与源站联系,谢谢合作！");

}

//搜索排行  
function echotop() {
    if ($("#main").html().indexOf("搜索排行榜") != -1) {
        $("#main").html("");
    } else {
        var w = "<br><br><div style='text-align:center;'><h3>搜索排行榜-TOP100</h3>";
        w += "</div>";
        $("#main").html(w);
    }
    toggleCenter();
}


//刷新列表
function relist(data) {
    if (data && data.success) {
        var v = data.info;
        var w = "<br><br><div style='text-align:center;'><h3>搜索到相关视频" + v.length + "个，请点击访问</h3>";
        for (i = 0, len = v.length; i < len; i++) {

            /*
              _blank：新窗口打开。
              _parent：在父窗口中打开链接。
              _self：默认，当前页面跳转。
               _top：在当前窗体打开链接，并替换当前的整个窗体(框架页)。
             */

            var href = "./?index" + v[i].id + "-" + v[i].flag + "-1.htm";

            var title = removeHTMLTag(v[i].title, true) + "(" + (v[i].from) + ")";

            w += "<a  class='list_btn '  target='_self'   href='" + href + "' title='" + title + "' ><strong>" + title + "</strong></a>";

        }
        w += "</div>";

    } else {

        var w = '<h3 >很抱歉，未搜索到相关资源</h3>';
        $("#info").html('请修改影片名后重新搜索');

    }
    $("#main").html(w);
    $("#body").show();
    toggleCenter();

}

//取视频数据
function getvideo(word) {
    console.log('进来2')
    $.ajax({
        url: './api.php?out=jsonp&wd=' + word,
        timeout: 30000,
        dataType: 'jsonp',
        jsonp: 'cb',
        beforeSend: function () {
            $("#body").hide();
            $("#main").html('<h3 >正在搜索中,请稍后...</h3>');
        },
        success: function (data) {
            relist(data);
        },
        error: function () {
            relist();
        }
    });
}

//自适应大小位置
function toggleCenter() {

    if ($("#main").height() + $("#clock").height() > $(window).height()) {

        $("#clock").css("position", "static");

    } else {

        $("#clock").css("position", "absolute");
        $("#clock").css("top", ($(window).height() - $("#clock").height()) / 2 - 20);

    }

    if ($(window).width() <= $("#clock").width()) {
        $("#clock").css("left", 0);
    } else {
        $("#clock").css("left", ($(window).width() - $("#clock").width()) / 2);
    }

}
$(window).resize(function () {
    toggleCenter();
});


init();