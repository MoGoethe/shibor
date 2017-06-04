
var shibor_s5 = echarts.init(document.getElementById('s5'),'macarons'); 

/*
author:seaseeyoul
time:20170604
	注 ： $ 美元符号为 jQuery对象，里面包含js常用的方法，dom操作方法
{
	step1: 使用ajax获取数据,
	step2: 
}
*/
var option_s5 = {
    title : {
        text : '时间坐标折线图',
        subtext : 'dataZoom支持'
    },
    tooltip : {
        trigger: 'item',
        formatter : function (params) {
            var date = new Date(params.value[0]);
            data = date.getFullYear() + '-'
                   + (date.getMonth() + 1) + '-'
                   + date.getDate() + ' '
                   + date.getHours() + ':'
                   + date.getMinutes();
            return data + '<br/>'
                   + params.value[1] + ', ' 
                   + params.value[2];
        }
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    dataZoom: {
        show: true,
        start : 70
    },
    legend : {
        data : ['series1']
    },
    grid: {
        y2: 80
    },
    xAxis : [
        {
            type : 'time',
            splitNumber:10
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name: 'series1',
            type: 'line',
            showAllSymbol: true,
            symbolSize: function (value){
                return Math.round(value[2]/10) + 2;
            },
            data: (function () {
                var d = [];
                var len = 0;
                var now = new Date();
                var value;
                while (len++ < 200) {
                    d.push([
                        new Date(2014, 9, 1, 0, len * 10000),
                        (Math.random()*30).toFixed(2) - 0,
                        (Math.random()*100).toFixed(2) - 0
                    ]);
                }
                return d;
            })()
        }
    ]
};

//这一步应该放到回调函数里面执行，确保数据已经获取到
shibor_s5.setOption(option_s5); 

$.ajax({
	type: "POST",//请求方式  GET/ PIOST
	url: "/api/shibor/report",//地址，就是action请求路径  
	data: {'term':'oneNight','fromDate':'2017-04-01','toDate':'2017-06-04'},//发送至服务器的校验数据 
	success: function(result){
			alert("控制台里查看数据与调试！")
			console.log(JSON.stringify(result));
			//shibor_s5.setOption(option_s5); 
			//渲染图像
			//setImage(XData,Ydata,OtherData);
	},
})
/*
function setImage(opt1,opt2,opt3){
	var _option = {
		title: opt3.title,
		xAxis:opt1,
		yAxis:opt2,
		...
	}
	shibor_s5.setOption(_option); 

}
*/
