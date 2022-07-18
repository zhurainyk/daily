 <template>
    <div>axios测试

        <div id="clock">
            <div id="main">
            </div>
            <div class="clearfloat"></div>

            <div id='body'>
                <p class="date"></p>
                <p class="time" id="time">00:00:00</p>
                <p class="text" id="text">2018-08-08 星期一</p><br>
                <div class="search bar6">
                    <form target="_parent" action="./" onsubmit="return validate_form(this);" method="get">
                        <input id="wd" type="text" name="v" placeholder="请输入视频名称或视频链接" value="">
                        <button type="submit"></button>
                        <div id="word"></div>
                    </form>


                    <div id="socode_diy">
                        <br />
                        <br /><br />
                        <!--     自定义 热门搜索   结束   -->
                        <font face="verdana" style="color:LightGreen;">热门搜索：</font>
                        <a href="javascript:void(0);" onclick="top.location.href='./?wd='+this.innerHTML;">青面修罗</a>
                        <a href="javascript:void(0);" onclick="top.location.href='./?wd='+this.innerHTML;">月球陨落</a>
                        <a href="javascript:void(0);" onclick="top.location.href='./?wd='+this.innerHTML;">梦华录</a>
                        <a href="javascript:void(0);" onclick="top.location.href='./?wd='+this.innerHTML;">暗夜行者</a>
                        <a href="javascript:void(0);" onclick="top.location.href='./?wd='+this.innerHTML;">法医秦明之读心者</a>
                        <a href="javascript:void(0);" onclick="top.location.href='./?wd='+this.innerHTML;">对决</a>
                        <a href="javascript:void(0);" onclick="top.location.href='./?wd='+this.innerHTML;">说英雄谁是英雄</a>
                        <a href="javascript:void(0);" onclick="top.location.href='./?wd='+this.innerHTML;">斗罗大陆</a>
                        <a href="javascript:void(0);" onclick="top.location.href='./?wd='+this.innerHTML;">凡人修仙传</a>
                        <a href='./mov/'>
                            <font face="verdana" style="color:OrangeRed;">影视大全</font>
                        </a>
                        <br /><br /></br></br>


                        <!--     自定义 其它    -->
                        <font face="verdana" style="color:Gold;">解析支持：优酷、爱奇艺、腾讯、芒果、乐视、搜狐、MP4、M3U8、FLV等等</font><br />
                    </div>
                </div>
                <br /><br /><br />
                <font face="verdana" style="color:Khaki"> 调用方式：</font> <a style="color:Khaki" target="_top"
                    href="./?v=https://v.qq.com/x/cover/tk3l27paq7sqr0z/p0036mrfj8h.html">https://svip.bljiex.cc/?v=视频名称或地址</a>
                <br /><br />
                <br><span id="sitetime"> </span><br>
                <br>
                <div id="footer"></div>
            </div>
        </div>
    </div>

</template>
 
<script>

import axios from 'axios'
console.log(axios)
import './assets/36'
import './assets/f2'
import './assets/ba'

import './assets/index'
export default {
    mounted() {
        console.log(axios)
       
        axios({
            url: 'api.php', //https://svip.bljiex.cc/?v=视频名称或地址
            params: {
                tp: 'jsonp',
                wd: '重庆',
            },
            methods: "GET",
            headers: {
                // 'Accept': 'application/json, text/javascript, */*; q=0.01',
                // 'Accept-Encoding': 'gzip, deflate, br',
                // 'Accept-Language': 'zh-CN,zh;q=0.9',
                // 'Connection': ' keep-alive',
                // 'Cookie': 'xxx',
                test:'xxxx'

                // 'Host': 'svip.bljiex.cc',
                // 'Referer': 'https://svip.bljiex.cc/so.php?wd=',
                // 'sec-ch-ua': `";Not A Brand";v="99", "Chromium";v="94"`,
                // 'sec-ch-ua-mobile': '?0',
                // 'sec-ch-ua-platform': "Windows",
                // 'Sec-Fetch-Dest': 'empty',
                // 'Sec-Fetch-Mode': 'cors',
                // 'Sec-Fetch-Site': 'same-origin',
                // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 Core/1.94.169.400 QQBrowser/11.0.5130.400',
                // 'X-Requested-With': 'XMLHttpRequest',
            }
        }).then(res => {
            console.log(res)
        })
    },
}
</script>

<style>
</style>