(function() {
    $.fn.extend({
        tabs: function(options) {
            var _that = this, //保存当前上下文环境（this指针
                init = null,
                defaults = {
                    event: 'click',
                    activ: 'activ',
                    show: 'show'
                };
            options = $.extend(defaults, options); // 合并对象 以新对象为主
            init = function() {
                var tabsBtn = _that.children('ul').children('li'); //此处用_that而不用this是因为这里的this是windows
                tabsDiv = _that.children('div');
                // tabsBtn.eq(0).addClass(options.activ);
                // tabsDiv.eq(0).addClass(options.show);
                tabsBtn.on(options.event, function() {
                    var _index = tabsBtn.index($(this)); //此处的this是绑定事件，点谁指向谁
                    $(this).addClass(options.activ).siblings().removeClass(options.activ);
                    tabsDiv.eq(_index).addClass(options.show).siblings().removeClass(options.show);
                });
            }
            init();
        }
    });
})(jQuery)