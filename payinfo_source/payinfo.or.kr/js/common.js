$(function(){

	//cnb
	var cnbWrap = $('.cnb_wrap');
	var cnbMain = $('.main .wrap_in');
	var cnb = $('.cnb');
	var cnbI = cnb.find('>li');
	var cnbGuide = $('.cnb li .tit_guide');
	var cnbII = $('.cnb li ul li');
	var subm = $('.submenu');
	var mOut = $('.cnb_wrap');
	var cnbBg = $('#cnb_bg');
	var whole = $('#btnWhole a');
	var wholeC = $('#wholeService .close');
	var wholeS = $('#wholeService');
	var wholeM = $('#wholeService .menu');
	var mainWhole = $('body.main #wholeService');
	var mainCnb = $('body.main .cnb_wrap');
	var mainCnbBg = $('body.main #cnb_bg');

	subm.hide();
	cnbBg.hide();
	wholeC.hide();
	wholeM.hide();
	mainWhole.hide();
	mainCnbBg.css("height" , "226px");
	mainCnbBg.show();
	cnbBg.show();

	function cnbToggle(event){
		if (!$(this).parent().is('.on')) {
			subm.hide();
			wholeS.hide();
			$(this).parent('li').find('.submenu').fadeIn(500);
			subm.find('.close').animate({'opacity':'0'})
			cnbI.removeClass('on');
			cnbWrap.removeClass('on');
			wholeM.slideUp(200);
			whole.fadeIn(500);
			wholeC.fadeIn('hide').fadeOut(500);
			$(this).parent('li').find('.close').animate({'opacity':'1'},200).stop();
			$(this).parent('li').addClass('on');
			if($('body').hasClass('main')) {
				if ($(this).parent().is('li.m2')){
					mainCnbBg.animate({'height':'567px'},300)
				}else {
					mainCnbBg.animate({'height':'567px'},300)
				}
			}else {
				// (2016.12.16) 추가 시작 : 메뉴의 높이에 따라 높이값 다르게 나오게
				if ($(this).parent().is('li.m2')){
					cnbBg.animate({'height':'292px'},300) //2018-11-19 수정
				}else if ($(this).parent().is('li.m1')){
					cnbBg.animate({'height':'292px'},300)
				}else {
					cnbBg.animate({'height':'156px'},300)
				}
				// (2016.12.16) 추가 끝 : 메뉴의 높이에 따라 높이값 다르게 나오게
			}
			return false;
		} else {
			subm.slideUp(200);
			wholeM.slideUp(200);
			wholeS.hide();
			cnbI.removeClass('on');
			cnbBg.animate({'height':'0'},300);
			var $target = $(this).parent().parent().find('>a');
			$target.attr('tabindex', '0').focus();
		}
		return false;
	};
	cnbI.eq(0).find('.tit').click(cnbToggle);
	cnbI.eq(1).find('.tit').click(cnbToggle);
	cnbI.eq(2).find('.tit').click(cnbToggle);
	cnbGuide.click(cnbToggle);

	function cnbout(){
		subm.slideUp(200);
		wholeM.slideUp(200);
		mainWhole.slideUp(200);
		wholeS.hide();
		cnbI.removeClass('on');
		mainCnbBg.show();

		var $target = $(this).parent().parent().find('>a');
		$target.attr('tabindex', '0').focus();

		if($('body').hasClass('main')) {
			mainCnbBg.animate({'height':'226px'},300);
		}else {
			cnbBg.animate({'height':'0'},300);
		}
		return false;
	};
	subm.find('>a.close[href=#]').click(cnbout);


	//전체 서비스
	function wholeToggle(event){
		var t = $(this);
		if (!$(this).is('.on')) {
			cnbMain.find('.submenu').hide();
			wholeC.fadeIn('slow').fadeIn(500);
			wholeS.show();
			whole.addClass('on');
			wholeM.slideDown(300);
			cnbI.removeClass('on');
			cnbBg.css("height" , "0");
			cnbWrap.addClass('on');
			subm.slideUp(200);
		} else {
			wholeM.slideUp(200);
			whole.removeClass('on');
			whole.fadeIn(500);
			wholeC.fadeIn('hide').fadeOut(500);
			cnbWrap.removeClass('on');
			var $target = $('.wrap_in #btnWhole a');
			$target.attr('tabindex', '0').focus();
		}
		return false;
	};
	function wholeout(){
		wholeM.slideUp(200);
		whole.removeClass('on');
		whole.fadeIn(500);
		wholeC.fadeIn('hide').fadeOut(500);
		mainWhole.slideUp(200);
		mainCnbBg.animate({'height':'226px'},300);
		cnbWrap.removeClass('on');
		var $target = $('.wrap_in #btnWhole a');
		$target.attr('tabindex', '0').focus();
		return false;
	};
	whole.click(wholeToggle);
	wholeC.find('a').click(wholeout);

	//2depth 메뉴 
	function cnbDep2(){
		cnbII.removeClass('on');
		$(this).addClass('on');
		return false;
	};
	function cnbDepOut(){
		cnbII.removeClass('on');
	};
	cnbII.mouseover(cnbDep2);
	cnbII.focus(cnbDep2);
	cnbII.mouseleave(cnbDepOut);

});

$(function(){
	$(".tbl_list_inquiry thead th:last-child").addClass('last');
	$(".tbl_list_inquiry2 thead th:last-child").addClass('last');
	$(".tbl_list_inquiry2 tbody td:last-child").addClass('last');
	$("#gnb > li:last-child").addClass('last');

	// 예시보기 open / close
	function bisView(){
		$('.cont_view').slideUp(200);
		$(this).next('.cont_view').slideDown(300).show();
		return false;
	};
	function bisViewOut(){
		$(this).parent().slideUp(200);
	};
	$('.box_view .btn_view').click(bisView);
	$('.box_view .cont_view .close').click(bisViewOut);

	// tooltip
	$(".btn_tip1").hover(function(event) {
		event.preventDefault()
		$(".layer_tooltip").css('display', 'block');
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'none');
		$(".layer_tooltip55").css('display', 'none');
	});
	$(".btn_tip2").hover(function(event) {
		event.preventDefault()
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'block');
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'none');
		$(".layer_tooltip55").css('display', 'none');
	});
	$(".btn_tip3").hover(function(event) {
		event.preventDefault()
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'block');
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'none');
		$(".layer_tooltip55").css('display', 'none');
	});
	$(".btn_tip4").hover(function(event) {
		event.preventDefault()
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'block');
		$(".layer_tooltip5").css('display', 'none');
		$(".layer_tooltip55").css('display', 'none');
	});
	$(".btn_tip5").hover(function(event) {
		event.preventDefault()
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'block');
		$(".layer_tooltip55").css('display', 'none');
	});
	$(".btn_tip55").hover(function(event) {
		event.preventDefault()
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'none');
		$(".layer_tooltip55").css('display', 'block');
	});
	// 2018-11-23 추가 - 6->66 으로 변경
	$(".btn_tip66").hover(function(event) {
		event.preventDefault()
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'none');
		$(".layer_tooltip55").css('display', 'none');
		$(".layer_tooltip66").css('display', 'block');
	});
	
	// 2018-11-27 추가 - 7->77 로 변경
	$(".btn_tip77").hover(function(event) {
		event.preventDefault()
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'none');
		$(".layer_tooltip55").css('display', 'none');
		$(".layer_tooltip77").css('display', 'block');
	});	

	// tab
	$(".btn_tip1").click(function(event) {
		event.preventDefault()
		$(".layer_tooltip").css('display', 'block');
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'none');
	});
	$(".btn_tip2").click(function(event) {
		event.preventDefault()
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'block');
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'none');
	});
	$(".btn_tip3").click(function(event) {
		event.preventDefault()
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'block');
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'none');
	});
	$(".btn_tip4").click(function(event) {
		event.preventDefault()
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'block');
		$(".layer_tooltip5").css('display', 'none');
	});
	$(".btn_tip5").click(function(event) {
		event.preventDefault()
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'block');
	});

	//닫기
	$(".btn_tip1").mouseleave(function(event) {
		event.preventDefault();
		$(".layer_tooltip").css('display', 'none');
	});
	$(".btn_tip2").mouseleave(function(event) {
		event.preventDefault();
		$(".layer_tooltip2").css('display', 'none');
	});
	$(".btn_tip3").mouseleave(function(event) {
		event.preventDefault();
		$(".layer_tooltip3").css('display', 'none');
	});
	$(".btn_tip4").mouseleave(function(event) {
		event.preventDefault();
		$(".layer_tooltip4").css('display', 'none');
	});
	$(".btn_tip5").mouseleave(function(event) {
		event.preventDefault();
		$(".layer_tooltip5").css('display', 'none');
	});
	$(".btn_tip55").mouseleave(function(event) {
		event.preventDefault();
		$(".layer_tooltip55").css('display', 'none');
	});
	// 2018-11-23 추가 - 6->66 으로 변경
	$(".btn_tip66").mouseleave(function(event) {
		event.preventDefault();
		$(".layer_tooltip66").css('display', 'none');
	});
	// 2018-11-27 추가 - 7 ->77 로 변경
	$(".btn_tip77").mouseleave(function(event) {
		event.preventDefault();
		$(".layer_tooltip77").css('display', 'none');
	});

	// 2018-12-12 추가
	$(".c_title").after("<div class='layer_text'><a href='#none' class='layer_close'>닫기</a><div class='l_txt'></div></div>");
	$(".c_title2").after("<div class='layer_text'><a href='#none' class='layer_close'>닫기</a><div class='l_txt'></div></div>");
	$(".layer_text").hide();
	
	$(".c_title").click(function(event) {
		var cTxt = $(this).text();
		$(this).next('.layer_text').show();
		$(this).next('.layer_text').find('.l_txt').text(cTxt);
		
		$('.layer_close').click(function(event) {
			$(this).parents('.layer_text').hide();
		});
	});	

	$(".c_title2").click(function(event) {
		var cTxt = $(this).text();
		$(this).next('.layer_text').show();
		$(this).next('.layer_text').find('.l_txt').text(cTxt);
		
		$('.layer_close').click(function(event) {
			$(this).parents('.layer_text').hide();
		});
	});

	//tab 닫기
	$(".layer_tooltip .btn_tooltip_close").click(function(event) {
		event.preventDefault();
		$(".btn_tip1").focus();
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'none');
	});

	$(".layer_tooltip2 .btn_tooltip_close").click(function(event) {
		event.preventDefault();
		$(".layer_tooltip").css('display', 'none');
		$(".btn_tip2").focus();
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'none');
	});

	$(".layer_tooltip3 .btn_tooltip_close").click(function(event) {
		event.preventDefault();
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'none');
		$(".btn_tip3").focus();
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'none');
	});
	$(".layer_tooltip4 .btn_tooltip_close").click(function(event) {
		event.preventDefault();
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'none');
		$(".btn_tip4").focus();
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'none');
	});
	$(".layer_tooltip5 .btn_tooltip_close").click(function(event) {
		event.preventDefault();
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'none');
		$(".btn_tip5").focus();
		$(".layer_tooltip5").css('display', 'none');
	});
	$(".layer_tooltip55 .btn_tooltip_close").click(function(event) {
		event.preventDefault();
		$(".layer_tooltip").css('display', 'none');
		$(".layer_tooltip2").css('display', 'none');
		$(".layer_tooltip3").css('display', 'none');
		$(".layer_tooltip4").css('display', 'none');
		$(".layer_tooltip5").css('display', 'none');
		$(".btn_tip55").focus();
		$(".layer_tooltip55").css('display', 'none');
	});

	// 동의자료열람 추가 2017-05
	// tooltip
	$(".btn_tip6").hover(function(event) {
		event.preventDefault()
		$(".layer_tooltip6").css('display', 'block');
		$(".layer_tooltip7").css('display', 'none');
		$(".layer_tooltip8").css('display', 'none');
		$(".layer_tooltip9").css('display', 'none');
	});
	$(".btn_tip7").hover(function(event) {
		event.preventDefault()
		$(".layer_tooltip6").css('display', 'none');
		$(".layer_tooltip7").css('display', 'block');
		$(".layer_tooltip8").css('display', 'none');
		$(".layer_tooltip9").css('display', 'none');
	});
	$(".btn_tip8").hover(function(event) {
		event.preventDefault()
		$(".layer_tooltip6").css('display', 'none');
		$(".layer_tooltip7").css('display', 'none');
		$(".layer_tooltip8").css('display', 'block');
		$(".layer_tooltip9").css('display', 'none');
	});
	$(".btn_tip9").hover(function(event) {
		event.preventDefault()
		$(".layer_tooltip6").css('display', 'none');
		$(".layer_tooltip7").css('display', 'none');
		$(".layer_tooltip8").css('display', 'none');
		$(".layer_tooltip9").css('display', 'block');
	});

	//닫기
	$(".btn_tip6").mouseleave(function(event) {
		event.preventDefault();
		$(".layer_tooltip6").css('display', 'none');
	});
	$(".btn_tip7").mouseleave(function(event) {
		event.preventDefault();
		$(".layer_tooltip7").css('display', 'none');
	});
	$(".btn_tip8").mouseleave(function(event) {
		event.preventDefault();
		$(".layer_tooltip8").css('display', 'none');
	});
	$(".btn_tip9").mouseleave(function(event) {
		event.preventDefault();
		$(".layer_tooltip9").css('display', 'none');
	});
	
});

$(function(){
	// footer select, 개인정보처리방침 select
	var select_root = $('.select');
	var select_value = $('.my_value');
	var select_value2 = $('.my_value2');
	var select_a = $('.select>ul>li>a');

	function show_option(){
		$(this).parents('.select:first').toggleClass('open');
	}
	function i_hover(){
		$(this).parents('ul:first').children('li').removeClass('hover');
		$(this).parents('li:first').toggleClass('hover');
	}
	function hide_option(){
		var t = $(this);
		setTimeout(function(){
			t.parents('.select:first').removeClass('open');
		}, 1);
	}
	function set_anchor(){
		var $target = $(this).parent().parent().parent().find('>button');
		$target.attr('tabindex', '0').focus();
	}
	$('*:not("div.select a")').focus(function(){
		$('.list').parent('.select').removeClass('open');
	});

	// 패밀리 사이트 div 닫기(ESC키)
	$('.familysite').keydown(function(event){
		if(event.keyCode == 27) {
			select_root.removeClass('open');
			select_value.focus();
			return false;
		}
	});
	// 이전 개인정보처리방침 보기 div 닫기(ESC키)
	$('.sel_personinfo').keydown(function(event){
		if(event.keyCode == 27) {
			select_root.removeClass('open');
			select_value2.focus();
			return false;
		}
	});
	
	select_value.click(show_option);
	select_value2.click(show_option);
	select_root.removeClass('open');
	select_root.mouseleave(function(){$(this).removeClass('open');});
	select_a.click(set_anchor).click(hide_option).focus(i_hover).hover(i_hover);
});
