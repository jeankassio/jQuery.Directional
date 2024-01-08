(function($){

  $.fn.Directional = function(options){
	
	let defaults = {
		rewriteindexes: false,
		selectlement: false,
		clickonenter: false
	};
	
	let settings = $.extend(defaults, options);
	
	if(settings.rewriteindexes){
		ReWriteIndexes();
	}
	
	if(settings.selectelement){
		
		if(settings.selectelement instanceof jQuery){
			settings.selectelement.focus();
		}else{
			$(settings.selectelement).focus();
		}
		
	}
	
    $(document).on("keyup", function(e){
		
		switch(e.which){
			
			case 37:{
				e.preventDefault();
				KeyToLeft();
				break;
			}
			
			case 38:{
				e.preventDefault();
				KeyToUp();
				break;
			}
			
			case 39:{
				e.preventDefault();
				KeyToRight();
				break;
			}
			
			case 40:{
				e.preventDefault();
				KeyToDown();
				break;
			}
			
			case 13:{
				if(settings.clickonenter){
					$(document.activeElement).click();
				}
				break;
			}
			
		}
		
	});
	
	function ReWriteIndexes(){
		
		$tbIndex = $('[tabindex]').filter(function(){
			return $(this).attr('tabindex') >= 0;
		});
		
		$i = 0;
		
		$.each($tbIndex, function(i, obj){
			
			if($(`[tabindex="${$i}"]`).length == 0){
				
				$(obj).attr('tabindex', $i);
				
			}else{
				
				while($(`[tabindex="${$i}"]`).length > 0){
					$i++;
				}
				
				$(obj).attr('tabindex', $i);
				
			}
			
			$i++;
			
		});
		
	}
	
	function GetDataActiveElement(){
		
		const focused = document.activeElement;
		return Coordinates(focused);
		
	}
	
	function GetBound($self){
		
		return Coordinates($self[0]);
		
	}
	
	function KeyToUp(){
		
		MoveToY(true);
		
	}
	
	function KeyToDown(){
		
		MoveToY(false);
		
	}
	
	function KeyToLeft(){
		
		MoveToX(true);
		
	}
	
	function KeyToRight(){
		
		MoveToX(false);
		
	}
	
	function MoveToY($toUp){
		
		$active = GetDataActiveElement();
		
		$tbIndex = $('[tabindex]').filter(function(){
			const $bound = GetBound($(this));
			
			const $posIndex = ($(this).attr('tabindex') >= 0);
			const $toHeigth = ($toUp ? $bound.top < $active.top : (($active.bottom - $bound.top) < 0));
			const $isSame = ($(document.activeElement).attr('tabindex') !== $(this).attr('tabindex'));
			const $toWidth = ((($bound.left - $active.left) < ($active.width)) && (($active.right - $bound.right) < ($active.width)));
			
			
			
			if($(this).hasClass("d-flex")){
				console.log($active.top);
				console.log($bound.top);
				console.log($(this).html());
			}
			
			return $posIndex && $toHeigth && $isSame;		
		});
		
		let $el;
		let $last = 0;
		
		$.each($tbIndex, function(i, obj){
			
			console.log(obj);
			
			const $bound = GetBound($(obj));
			const $distance = CalculateDistance($active.left, $active.top, $bound.left, ($bound.top + $bound.height));
			
			console.log($distance);
			console.log($bound);
			
			if(typeof $el != 'undefined'){
				
				if($distance < $last){
					$el = $(obj);
					$last = $distance;
				}
				
			}else{
				$el = $(obj);
				$last = $distance;
			}
			
		});
		
		if(typeof $el != 'undefined' && $el.length > 0){
			console.log($el);
			$el.focus();
			window.scrollTo({ top: ($el.offset().top + ($el.height() / 2) - ($(window).height() / 2)), behavior: "smooth" });
		}
		
		
	}
	
	function MoveToX($toLeft){
		
		$active = GetDataActiveElement();
		
		$tbIndex = $('[tabindex]').filter(function(){
			const $bound = GetBound($(this));
			
			const $posIndex = ($(this).attr('tabindex') >= 0);
			const $toWidth = ($toLeft ? $bound.left < $active.left : (($active.left - $bound.right) < 0));			
			const $isSame = ($(document.activeElement).attr('tabindex') !== $(this).attr('tabindex'));
			const $toHeigth = ((($bound.top - $active.top) < ($active.height)) && (($active.bottom - $bound.bottom) < ($active.height)));
			
			return $posIndex && $toWidth && $toHeigth && $isSame;
		});
		
		let $el;
		let $last = 0;
		
		$.each($tbIndex, function(i, obj){
			
			console.log(obj);
			
			const $bound = GetBound($(obj));
			const $distance = CalculateDistance($active.left, $active.top, $bound.left, $bound.top);
			
			if(typeof $el != 'undefined'){
				
				if($distance < $last){
					$el = $(obj);
					$last = $distance;
				}
				
			}else{
				$el = $(obj);
				$last = $distance;
			}
			
		});
		
		if(typeof $el != 'undefined' && $el.length > 0){
			console.log($el);
			$el.focus();
			window.scrollTo({ top: ($el.offset().top + ($el.height() / 2) - ($(window).height() / 2)), behavior: "smooth" });
		}
		
	}
	
	function CalculateDistance(x1, y1, x2, y2){
		return Math.hypot(x2 - x1, y2 - y1);
	}
	
	function GetOffsetTop(el){
		if (el.offsetParent) return el.offsetTop + GetOffsetTop(el.offsetParent)
		return el.offsetTop || 0
	}
	
	function GetOffsetLeft(el){
		if (el.offsetParent) return el.offsetLeft + GetOffsetLeft(el.offsetParent)
		return el.offsetleft || 0
	}
	
	function Coordinates(el){
		let rect = el.getBoundingClientRect();
		/*
		rect.top = GetOffsetTop(el) - window.scrollY;
		rect.left = GetOffsetLeft(el) - window.scrollX;
		rect.bottom = rect.top + el.offsetHeight;
		rect.right = rect.left + el.offsetWidth;
		*/
		return rect;
	}
	
	
    return this;
	
  };

  $(document).ready(function(){
    /*
	$.fn.Directional({
		rewriteIndexes: true
	});
	*/
  });

})(jQuery);
