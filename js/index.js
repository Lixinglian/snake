$(function(){
	$('.help').on('click',function(){
		$('.tanchu').css('display','block');
	})
	$('.close').on('click',function(){
		$('.tanchu').css('display','none');
	})
	$('.reset').on('click',function(){
		kaishi()
	})
	kaishi()
	function kaishi(){
		$('.start').on('click',function(){
		$('.anniu').css('display','none');
		$('.end').css('display','block');
		$('.reset').css('display','block');
		$('span').css('display','none');
		$('.end').on('click',function(){
			clearInterval(t)
			$('.scene').css('display','none');
		})
			//添加背景
		for(var i=0;i<20;i++){
			for(var j=0;j<30;j++){
				var r=Math.floor(Math.random()*25);
				var g=Math.floor(Math.random()*105);
				var b=Math.floor(Math.random()*195);
				var color='rgba('+r+','+g+','+b+',0.1)';
				$('<div>')
				.attr('id',''+i+'_'+j+'')
				.addClass('block')
				.css({
					backgroundColor:color
				})
				.appendTo('.scene')
			}	
		}
		//创建蛇对象，把蛇添加到页面中
		var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
		var shebiao={'0_0':true,'0_1':true,'0_2':true}
		function findDiv(x,y){
			return $('#'+x+'_'+y+'')
		}
		//找出蛇
		$.each(she,function(i,v){
			findDiv(v.x,v.y).addClass('she')
		})
		//新头的改变
		var direction='r';
			move=function(){
			var oldTou=she[she.length-1]
			if(direction=='r'){
				var newTou={x:oldTou.x,y:oldTou.y+1}
			}
			if(direction=='l'){
				var newTou={x:oldTou.x,y:oldTou.y-1}
			}
			if(direction=='t'){
				var newTou={x:oldTou.x-1,y:oldTou.y}
			}
			if(direction=='b'){
				var newTou={x:oldTou.x+1,y:oldTou.y}
			}


			if(shebiao[newTou.x+'_'+newTou.y]){
				clearInterval(t)
				alert('撞自己啦！笨蛋')
			}



			if(newTou.x<0||newTou.x>19||newTou.y<0||newTou.y>29){
				clearInterval(t)
				alert('撞到墙了')
			}
			she.push(newTou)
			shebiao[newTou.x+'_'+newTou.y]=true
			findDiv(newTou.x,newTou.y).addClass('she')


			//吃食物
			if(newTou.x==food.x&&newTou.y==food.y){
				findDiv(food.x,food.y).removeClass('food')
				food=addFood()
			}else{
				var weiba=she.shift();
				delete shebiao[weiba.x+'_'+weiba.y]
				findDiv(weiba.x,weiba.y).removeClass('she')
			}
			
		}

		//键盘事件
		var biao={37:'l',38:'t',39:'r',40:'b'};
		var fanbiao={'l':37,'t':38,'r':39,'b':40}
		t=setInterval(move,200)
		$(document).on('keyup',function(e){ 
			if (Math.abs(e.keyCode-fanbiao[direction])==2) {
				return;

			}
			if(biao[e.keyCode]){
				direction=biao[e.keyCode];
			}
		})
		//添加食物
		function addFood(){
			do{
				var x=Math.floor(Math.random()*19);
				var y=Math.floor(Math.random()*19);
			}while(shebiao[x+'_'+y])	
			findDiv(x,y).addClass('food')
			return {x:x,y:y}
		}
		var food=addFood()
	})
	}
	
	



























})
