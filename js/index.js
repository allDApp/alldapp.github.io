var dappAddress = "n1qXszbra1YfLx15xC798QfJcv3bmifQeUo";
$(function() {
	
	
		var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
		var nebpay = new NebPay();

		
		//var dappAddress = "n1qXszbra1YfLx15xC798QfJcv3bmifQeUo";
		var txHash = "691671bc692ec0a0cd16c6c73e44cd8a9c83e6b1915c608363efc771a1fcb0ab";
		
		
	$("#alldapps").click(function() {
		$("#detailTitle").text("All DApps-全部DApp");

		var to = dappAddress;
		var value = "0";
		var callFunction = "getdapp";
		var callArgs = "[]";
		nebpay.simulateCall(to, value, callFunction, callArgs, {
			listener: function(resp) {
				//console.log(JSON.stringify(resp.result));
				if(resp.result == ""){
					$("#searchresult").html('<div class="panel-body" >没有记录</div>');
					return;
				}
				var res = JSON.parse(resp.result);
				if(res.length == 0){
					$("#searchresult").html('<div class="panel-body">没有记录</div>');
					return;
				}

				var tempStr = "";

				for (var i = 0; i < res.length; i++) {
					if (i % 2 == 0) {
						tempStr += '<div class="panel-body"> ';
					} else {
						tempStr += '<div class="panel-footer">';
					}

					//					
					tempStr += '<p>';
					tempStr += res[i].content;
					tempStr += '</p>';
					tempStr += '<p>';
					tempStr += '<small><cite>' + 'DApp提交ID:' + res[i].author + '</cite></small>';
					tempStr += '<br>';
					tempStr += '<a class="btn" href="javascript:void(0)" id="like" onclick="addMydapp(';
					tempStr += res[i].index;
					tempStr += ')">我的Dapp</a>';

					tempStr += '</p> </div> ';
				}
				console.log(tempStr);
				$("#searchresult").html(tempStr);
			}
		});

	});
	$("#alldapps").click();

	$("#mydapps").click(function() {
		$("#detailTitle").text("My DApps-我的DApp");



		var to = dappAddress;
		var value = "0";
		var callFunction = "getMydapp";
		var callArgs = "[]";
		nebpay.simulateCall(to, value, callFunction, callArgs, {
			listener: function(resp) {
				//console.log(JSON.stringify(resp.result));
				if(resp.result == ""){
					$("#searchresult").html('<div class="panel-body">没有记录</div>');
					return;
				}
				var res = JSON.parse(resp.result);
				if(res.length == 0){
					$("#searchresult").html('<div class="panel-body">没有记录</div>');
					return;
				}
				

				var tempStr = "";

				for (var i = 0; i < res.length; i++) {
					if (i % 2 == 0) {
						tempStr += '<div class="panel-body"> ';
					} else {
						tempStr += '<div class="panel-footer">';
					}

					//					
					tempStr += '<p>';
					tempStr += res[i].content;
					tempStr += '</p>';
					tempStr += '<p>';
					tempStr += '<small><cite>' + 'DApp提交ID:' + res[i].author + '</cite></small>';
					tempStr += '<br>';
					tempStr += '<a class="btn" href="#" id="unMydapp" onclick="unMydapp(';
					tempStr += res[i].index;
					tempStr += ')">移除</a>';
					
					tempStr += '</p> </div> ';
				}
				console.log(tempStr);
				$("#searchresult").html(tempStr);
			}
		});

	});

	$("#newdapp").click(function() {
		$("#detailTitle").text("New DApp-提交新DApp源码")

		var tempStr = '';
		tempStr += '<div class="panel-body"> ';
		tempStr += '<form role="form">';
		tempStr += '<div class="form-group">';
		tempStr += '<p>DApp名称 </p>';
		tempStr += '<textarea class="form-control" rows="1" id="name" >中文名-英文名</textarea>';
		tempStr += '<p>DApp源码挂载地址 请填写16位以内数字/英文字母 不要与已有地址重复</br>不需要输入网站域名前缀等，不需要输入‘/’，‘；’等符号</br>提交成功后你的DApp将可以在永久地址‘http://alldapp.github.io/<你的地址>/’</br>或短地址‘http://dapps.ga/<你的地址>/’访问</p>';
		tempStr += '<textarea class="form-control" rows="1" id="ids" ><你的地址></textarea>';
		tempStr += '<p>如果可以公开源码，请打包源码上传网盘并将地址贴在下方描述中。</br>如不想公开源码，请将源码打包/网盘地址发送至LowEntropy@yahoo.com</p>';
		tempStr += '<p>DApp描述/介绍</p>';
		tempStr += '<textarea class="form-control" rows="10" id="content" >DApp源码:未公开/<源码访问地址></textarea>';
		tempStr += '<button type="button" class="btn btn-primary" id="savebutton" onclick="save();">提交DApp</button>';		
		tempStr += '</div>';
		tempStr += '</form>';
		tempStr += '</div> ';
		console.log(tempStr);

		$("#searchresult").html(tempStr);
	});

});

function addMydapp(index){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
	var nebpay = new NebPay();
		var to = dappAddress;
		var value = "0";
		var callFunction = "addMydapp";
		var callArgs = "[\"" + index + "\"]";
		nebpay.call(to, value, callFunction, callArgs, {
			listener: function(resp) {
				console.log(JSON.stringify(resp.result));
			}
		});
};

function unMydapp(index){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
	var nebpay = new NebPay();
		var to = dappAddress;
		var value = "0";
		var callFunction = "unMydapp";
		var callArgs = "[\"" + index + "\"]";
		nebpay.call(to, value, callFunction, callArgs, {
			listener: function(resp) {
				console.log(JSON.stringify(resp.result));
			}
		});
};

function save(){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
	var nebpay = new NebPay();
		var content = $("#content").val();
		var name = $("#name").val();
		var ids = $("#ids").val();
		if (content == "") {
			alert("请输入描述/代码公开情况。");
			return;
		}
		if (ids == "") {
			alert("请输入托管代码的上传位置。");
			return;
		}
		if (name == "") {
			alert("请输入Dapp名。");
			return;
		}
		
		content= content.replace(/\n/g,"<br>"); 
		name= name.replace(/\n/g,"<br>"); 
		var to = dappAddress;
		var value = "0";
		var callFunction = "savedapp";
		var callArgs = "[\"" + name + "\u003cbr\u003e地址:http://alldapp.github.io/" + ids + "/\u003cbr\u003e描述:" + content + "\"]";
		nebpay.call(to, value, callFunction, callArgs, {
			listener: function Push(resp) {
				console.log("response of push: " + JSON.stringify(resp))
				var respString = JSON.stringify(resp);
				if(respString.search("rejected by user") !== -1){
					alert("关闭交易,取消上传你的Dapp信息")
				}else if(respString.search("txhash") !== -1){
					alert("上传Hash: " + resp.txhash+"请等待交易确认,如果上传失败请检查内容是否含有特殊字符")
				}
			}
		});
	
};