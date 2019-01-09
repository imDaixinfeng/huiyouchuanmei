/**
 * 加载到外部URL的文件，用于下载图片；
 */
/**
 * 打开长按事件
 * http://dev.dcloud.net.cn/mui/event/#gesture
 */
mui.init({
	gestureConfig: {
		longtap: true
	}
});
mui.plusReady(function() {
	document.addEventListener("longtap", function(event) {
		/**
		 * 获取目标节点的tagName
		 */
		var name = event.target.tagName;
		name = name.toLowerCase();
		/**
		 * 如果是图片，则弹出选择框决定是否下载；
		 */
		if(name === "img") {
			var imgUrl = event.target.src;
			console.log('图片地址：' + imgUrl);
			var suffix = cutImageSuffix(imgUrl);
			/**
			 * http://dev.dcloud.net.cn/mui/ui/#dialog
			 */
			mui.confirm("是否保存此图片", "确认保存？", ["保存", "不保存"], function(event) {
				/**
				 * index从0开始
				 */
				var index = event.index;
				if(index == 0) {
					/**
					 * 创建下载任务
					 * http://www.html5plus.org/doc/zh_cn/downloader.html#plus.downloader.createDownload
					 */
					var downLoader = plus.downloader.createDownload(imgUrl, {
						method: 'GET',
						filename: '_downloads/image' + suffix
					}, function(download, status) {
						var fileName = download.filename;
						console.log('文件名:' + fileName);
						console.log('下载状态：' + status);
						/**
						 * 保存至本地相册
						 * http://www.html5plus.org/doc/zh_cn/gallery.html#plus.gallery.save
						 */
						plus.gallery.save(fileName, function() {
							/**
							 * 保存后，弹出对话框是否查看；
							 * http://dev.dcloud.net.cn/mui/ui/#dialog
							 */
//							mui.confirm("打开相册", "打开相册？", ["打开", "不看"], function(event) {
//								var gindex = event.index;
//								if(gindex == 0) {
//									/**
//									 * 选择图片
//									 * http://www.html5plus.org/doc/zh_cn/gallery.html#plus.gallery.pick
//									 */
//									plus.gallery.pick(function(file) {
//										mui.toast("你选择了图片：" + file);
//									}, function(error) {
//										console.log(error);
//									}, {
//
//									});
//								}
//							});
						});
					});
					/**
					 * 开始下载任务
					 * http://www.html5plus.org/doc/zh_cn/downloader.html#plus.downloader.Download.start
					 */
					downLoader.start();
				}
			});
		}
	});
});

// 截取图片后缀用于重命名图片，防止%E5%85%89%E6%98%8E%E8%A1%8C编码的文件不被系统相册识别；
function cutImageSuffix(imageUrl) {
	var index = imageUrl.lastIndexOf('.');
	return imageUrl.substring(index);
}