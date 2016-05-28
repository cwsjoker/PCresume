//导航条，hover效果使导航栏下的小横线随着鼠标移动
$('.nav-list li').hover(function(){
	var nIndex = $(this).index();
	var nValueX = $(this).position().left;
	$('.nav-slide').stop(true).animate({
		'left' : nValueX
	}, 300);
},function() {
	var oIndex = $('.active').index();
	var oValueX = oIndex * $(this).width();
	$('.nav-slide').stop(true).animate({
		'left' : oValueX
	}, 300);
});
// 导航栏显示，点击导航栏横线滑动，并滚动条自动滚到相应区域
$('.nav-list li').click(function() {
	$(window).unbind('scroll');
	//设置样式
	$(this).addClass('active').siblings().removeClass('active');
	var index = $(this).index();
	//自动跳转相应内容
	$('body').animate({
		'scrollTop' : $('body section').eq(index).offset().top
	}, 300, function() {
		$(window).bind('scroll', wScroll);
	})
	// $(window).bind('scroll', wScroll);
});
// 项目查看查看二维码按钮，自动跳到二维码模块
$('.viewCode').on('click', function() {
	$(window).unbind('scroll');
	var index = 4;
	$('.nav-list li').eq(index).addClass('active').siblings().removeClass('active');
	//自动跳转相应内容
	$('body').animate({
		'scrollTop' : $('body section').eq(index).offset().top
	}, 300, function() {
		$(window).bind('scroll', wScroll);
	})
});
//实时监听滚动条,根据滚动的高度来判断到达某一模块导航栏做具体变化
$(window).bind('scroll', wScroll);
function wScroll() {
	var scrollTop = $('body').scrollTop();
	$('body section').each(function() {
		if(scrollTop >= $(this).offset().top && scrollTop <= $(this).next().offset().top){
			$('.nav-list li').eq($(this).index() - 1).addClass('active').siblings().removeClass('active');
			$('.nav-slide').stop(true).animate({
				'left' : $('.nav-list li').eq(0).width() * ($(this).index() - 1)
			}, 300);
		}
	});
	//加载技能条,当滑动高度到达350出发技能条动画
	if($(window).scrollTop() >= 350){
		$('.ability-list h4').eq(0).css({
			'width' : 800
		});
		$('.ability-list h4').eq(1).css({
			'width' : 750
		});
		$('.ability-list h4').eq(2).css({
			'width' : 600
		});
		$('.ability-list h4').eq(3).css({
			'width' : 600
		});
		$('.ability-list h4').eq(4).css({
			'width' : 500
		});
	}
}

// ability模块鼠标上移显示对应技能详细介绍
$('.ability-list li').hover(function() {
	$(this).children('.item-ab').fadeIn();
},function() {
	$(this).children('.item-ab').fadeOut();
});


//滚动框
var scrollBtn = true;
var index = 0;
var timer = setInterval(autoScroll, 5000);
function scroll() {
	if(timer) {
		clearInterval(timer);
	}
	scrollBtn = false;
	if(index == 3){
		index = 0;
	}
	$('.inf-list li').eq(index).addClass('active').siblings().removeClass('active');
	$('.inf-scroll').stop(true).animate({
		'scrollLeft' : $('.inf-scroll-box').width() * 0.3333 * index
	}, 500, function() {
		scrollBtn = true;
		timer = setInterval(autoScroll, 5000);
	});
}
function autoScroll() {
	index++;
	if(index == 3) {
		index = 0;
	}
	scroll();
}
$('.inf-pre').on('click',function(){
	if(!scrollBtn){
		return;
	}
	index--;
	if(index == -1){
		index = 2;
	}
	scroll();
});
$('.inf-next').on('click',function(){
	if(!scrollBtn){
		return;
	}
	index++;
	if(index == 3){
		index = 0;
	}
	scroll();
});
$('.inf-list li').on('click', function() {
	if(!scrollBtn || index == $(this).index()){
		return;
	}
	index = $(this).index();
	scroll();
});
// dome模块的css3效果
$('.demo-list li').on('click', function() {
	var index = $(this).index();
	if(index == 4) {
		$('.demo-content li').each(function() {
			if($(this).index() <= 3) {
				$(this).css({
					'-webkit-transform' : 'translate(' + $(this).index() * 280 + 'px, 0px) scale3d(1,1,1)',
					'opacity' : 1
				});
			}else {
				$(this).css({
					'-webkit-transform' : 'translate(' + ($(this).index() - 4) * 280 + 'px, 280px) scale3d(1,1,1)',
					'opacity' : 1
				});
			}
		});
	}else {
		var one = $(this).index();
		var two = $(this).index() + 4;
		$('.demo-content li').each(function() {
			if($(this).index() == one || $(this).index() == two) {
				console.log(1);
				if($(this).index() == one) {
					$(this).css({
						'-webkit-transform' : 'translate(280px, 150px) scale3d(1,1,1)',
						'opacity' : 1
					});
				}else {
					$(this).css({
						'-webkit-transform' : 'translate(560px, 150px) scale3d(1,1,1)',
						'opacity' : 1
					});
				}
			}else{
				if($(this).index() <= 3) {
					$(this).css({
					'-webkit-transform' : 'translate(' + $(this).index() * 280 + 'px, 0px) scale3d(0.001,0.001,1)',
					'opacity' : 0
					});
				}else {
					$(this).css({
						'-webkit-transform' : 'translate(' + ($(this).index() - 4) * 280 + 'px, 280px) scale3d(0.001,0.001,1)',
						'opacity' : 0
					});
				}
			}
		})
	}
	$(this).addClass('select').siblings().removeClass('select');
});