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
			var newName = getNewImageName(imgUrl);
			mui.confirm("是否保存此图片？", "确认保存", ["不保存", "保存"], function(event) {
				var index = event.index;
				if(index == 1) {
					var downLoader = plus.downloader.createDownload(imgUrl, {
						method: 'GET',
						filename: '_downloads/' + newName
					}, function(download, status) {
						var fileName = download.filename;
						console.log('文件名:' + fileName);
						console.log('下载状态：' + status);
						plus.gallery.save(fileName);
					});
					downLoader.start();
				}
			},'div');
		}
	});
});

function getNewImageName(imageUrl) {
	var index = imageUrl.lastIndexOf('.');
	var newName = randomWord(false, 18);
	return newName+imageUrl.substring(index);
}

/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
** xuanfeng 2014-08-28
*/
function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}