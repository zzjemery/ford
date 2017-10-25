(function($) {
    $.fn.extend({
        slider: function(options) {
            var _that = this,
                //将所有会成为对象的变量赋值为null
                main = null, //主函数  入口
                start = null, //开始动画
                stop = null, //停止动画
                init = null, //初始化
                next = null, //播放下一张
                prev = null, //播放上一张
                timeout = null, //定时器
                elems = {}, //元素集合
                defaults = {
                    speed: 600,
                    delay: 3000
                }

            options = $.extend(defaults, options);

            init = function() { //初始化
                elems._index = 1; //当前播放的图片编号
                elems.sliderDiv = _that.children('div');
                elems.btn = _that.children('span');
                elems.sliderDiv.append(elems.sliderDiv.children('img').first().clone()); //对象需要克隆

                _that.hover(function() {
                    stop();
                }, function() {
                    timeout = setInterval(function() { start(1); }, options.delay + options.speed);
                });
                elems.btn.on('click', function() {
                    if (elems.btn.index($(this))) { //点击下一张按钮时
                        next();
                    } else {
                        prev();
                    }
                });
            };
            start = function(direction) {
                var left = "-=1349";
                if (!direction) {
                    left = "+=1349";
                    if (elems._index <= 1) {
                        var imgleft = elems.sliderDiv.children('img').last().offset().left,
                            divleft = _that.offset().left;
                        elems._index = 5;
                        elems.sliderDiv.css('left', '-' + (imgleft - divleft) + 'px'); //将最后这一张图片移至当前位置
                    }
                }
                elems.sliderDiv.animate({
                    left: left
                }, options.speed, function() {
                    if (direction) {
                        elems._index++;
                    } else {
                        elems._index--;
                    }
                    if (elems._index == 5) {
                        elems.sliderDiv.css('left', 0);
                        elems._index = 1;
                    }
                }).delay(options.delay);
            }
            next = function() {
                stop();
                start(1);
            }
            prev = function() {
                stop();
                start(0);
            }
            stop = function() {
                elems.sliderDiv.stop(true, true); //第一个是清空所有动画队列   第二个是
                clearInterval(timeout);
            }
            main = function() {
                init();
                timeout = setInterval(function() { start(1); }, options.delay + options.speed);
            }
            main();
        }
    })
})(jQuery)