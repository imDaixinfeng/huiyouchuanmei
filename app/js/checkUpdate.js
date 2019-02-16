function checkUpdate(wgtVer) {
	var needUpdate = false;
	mui.ajax(base_url + 'index.php/index/checkUpdate', {
		dataType: 'text', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 20000, //超时时间设置为20秒
		async: false,
		success: function(newVer) {
			var reg = /\d+[.]\d+[.]\d+/g;
			if (reg.test(newVer) && wgtVer != newVer) {
				needUpdate = true;
			}
		}
	});
	return needUpdate;
}

var wgtWaiting = null;

function downWgt() {
	wgtWaiting = plus.nativeUI.showWaiting("开始下载...");
	var wgtUrl = base_url_root + "update/H5C862819.wgt";
	var task = plus.downloader.createDownload(wgtUrl, {
		filename: "_doc/update/"
	}, function(download, status) {
		if (status == 200) {
			console.log(download.filename + '下载完成');
			wgtWaiting.setTitle("开始安装...");
			installWgt(download.filename);
		} else {
			mui.alert("请检查您的网络连接是否正常！", '更新失败');
			wgtWaiting.close();
		}
	});

	task.addEventListener("statechanged", function(download, status) {
		switch (download.state) {
			case 2:
				wgtWaiting.setTitle("已连接到服务器...");
				break;
			case 3:
				var percent = download.downloadedSize / download.totalSize * 100;
				wgtWaiting.setTitle("已下载 " + parseInt(percent) + "%");
				break;
			case 4:
				wgtWaiting.setTitle("下载完成！");
				break;
		}
	});
	task.start();
};

function installWgt(wgtpath) {
	plus.runtime.install(wgtpath, {}, function(success) {
		wgtWaiting.close();
		delWgtFile(wgtpath);
		//ios 安卓最好不要提示
		//mui.alert("应用资源更新完成！", '更新完成', function() {
		plus.runtime.restart();
		//});
	}, function(error) {
		alert(error.message);
		wgtWaiting.close();
		delWgtFile(wgtpath);
		mui.alert("应用更新失败，请下载最新版APP直接安装！", '更新失败');
	});
};

function delWgtFile() {
	plus.io.resolveLocalFileSystemURL('_doc/update/', function(entry) {
		entry.removeRecursively(function(entry) {
			console.log("Remove succeeded");
		}, function(e) {
			console.log("清除缓存文件失败[" + e.code + "]：" + e.message);
		});
	});
}
