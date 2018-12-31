//定义滚动函数
function scroll(object, time) {
    var time = time ? time : 30;
    var ul = object.find('ul');
    ul.append(ul.children().clone(true));
    object.time = null;
    var len = ul.height() / 2;
    if (!!$(this)[0]) {
        object.time = window.setInterval(function () {
            var t = ul.css('top');
            //把t由字符串换成数值
			if(t !== undefined)
            t = t.replace('px', '');
            if (t > -len) {
                t--;
                ul.css('top', t + 'px');
            } else {
                ul.css('top', 0);
            }
        }, time);
        ul.hover(
        function () {
                window.clearInterval(object.time);
            },
            function () {
                object.time = window.setInterval(function () {
                    var t = ul.css('top');
                    //把t由字符串换成数值
                    t = t.replace('px', '');
                    if (t > -len) {
                        t--;
                        ul.css('top', t + 'px');
                    } else {
                        ul.css('top', 0);
                    }
                }, time);
            });
    }
}
var scroll_1 = $('.cont_1_scroll');
scroll(scroll_1, 30);
var scroll_2 = $('.cont_3_scroll');
scroll(scroll_2, 30);


//点我加好友弹框
//wechat
var cover = document.querySelector('.cover');

cover.style.height = window.screen.height + 'px';



var cancel = document.querySelector('.cancel');
// var wechat = document.querySelector('.fixed_r');


var wechat = new Clipboard('#cpWechat');
wechat.on('success', function(e) {
  alert('复制成功');

  // cover.style.display = "block";
  // _taq.push({convert_id:"93502372072", event_type:"wechat"})
  window.location.href = 'weixin://';
  e.clearSelection();

}).on('error', function(e) {
  //alert('复制失败');
  window.location.href = 'weixin://';

  //console.log(e);
});
// console.log(wechat);
// wechat.onclick = function () {
//     cover.style.display ="block";
// };
cancel.onclick = function () {
    cover.style.display ="none";
};