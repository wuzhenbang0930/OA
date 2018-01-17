$.ajax({
			url: '/get',
			type: 'GET',
			success : function(res){
				console.log(res)
				var len = res.length;

				for(let i = 0 ; i < len ; i ++){
					var sId = 10000
					var str = '<tr class="tra"><td><input type="checkbox" name="checkboxes[]" value="174">' + (i+1) + '</td><td><span>' + res[i].goods_name + '</span></td><td>' + (sId+1) + '</td><td>' + res[i].num + '</td><td><img src="images/back/yes.gif" alt=""></td><td><img src="images/back/yes.gif" alt=""></td><td><img src="images/back/yes.gif" alt=""></td><td><img src="images/back/yes.gif" alt=""></td><td>' + res[i].goods_id + '</td><td>43</td><td>' + res[i].xuni + '</td><td class="tra1><a href="#"><img src="images/back/icon_view.gif" alt=""></a><a href="#"><img src="images/back/icon_edit.gif" alt=""></a><a href="#"><img src="images/back/icon_copy.gif" alt=""></a><a href="#" ><img src="images/back/icon_trash.gif" alt=""></a></td></tr>'
					$("#brfor").after(str);
				}
				$("#totalRecords").html(len);
				var lens = $(".tra").length
				for(var i = 1 ; i < lens ; i ++ ){
					
					var a = $(".tra").eq(i).children('.tra1').html()
					console.log(a)
					// $(".tra:eq(i):last-of-type").click(function(){
					// 	var a = $(this).index();
					// });
				}

			}
		})
$(".click").click(function(event){
	if($(".none").css("display") == "none"){
		$(".none").css("display","block");
	} else {
		$(".none").css("display","none")
	}
	event.stopPropagation();
})

$(".tab p span").click(function(){
	 var $index = $(this).index() 
	$(".tab p span").eq($index).css("background","#fff");
	$(this).siblings('span').css("background","#efefef");
	$(this).parent("p").siblings('.haha').eq($index).css({
		display: 'block'
	});
	$(this).parent("p").siblings('.haha').eq($index).siblings('.haha').css({
		display: 'none'
	});
})

$("#shoplist").click(
	function(){
		$(this).css("background","#888");
		$(this).siblings('li').css("background","#575757")
		$(".tab2").css("display","block")
		$(".tab2").siblings('.tab').css("display","none")
	})

$("#add").click(function(){
	$(this).css("background","#888")
	$(this).siblings('li').css("background","#575757")
	$(".tab").css("display","block");
	$(".tab").siblings('.tab2').css("display","none")
});

function Add(){
	if($("#goods_name").val() == "" && $("#price").val() == "" && $("#stock").val() == "" && $("#xuni").val() == "" ){
		alert("请完善消息")
	}else{
		$.ajax({
			url : "/list",
			type : "post",
			data : {
				goods_name : $("#goods_name").val(),
				goods_id : $("#goods_id").val(),
				price : $("#price").val(),
				stock: $("#stock").val(),
				xuni : $("#xuni").val()
			},
			success:function(res){
				if(res.code == 1 ){
					$(".tab").css("display","none")
				}else {
					alert("请完善消息")
				}
			}
		})
				history.go(0)
	}
	

}

function Page(){
	var page = $("#gotoPage option:selected").val();
	$.ajax({
			url : "/list1",
			type : "post",
			data: {
				page : page
			},
			success:function(res){
				console.log(res)
			}
		})
}

function goodsnum(){
	var Num=""; 
    for(var i=0;i<6;i++) { 
        Num += Math.floor(Math.random()*10); 
    } 
     $("#goods_num").val(Num)  
}




