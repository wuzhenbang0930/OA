$.ajax({
			url: '/get',
			type: 'GET',
			data : {
				pageNO : $("#pageCurrent").html(),
				perPageCnt : $("#pageSize").attr("value")
			},
			success : function(res){
				console.log(res)
				var res1 = res.data;
				var len = res.data.length
				for(let i = 0 ; i < len ; i ++){
					var str = '<tr class="tra"><td><input type="checkbox" name="checkboxes[]" value="174">' + (i+1) + '</td><td><span>' + res1[i].goods_name + '</span></td><td>' + res1[i].goods_id + '</td><td>' + res1[i].price + '</td><td><img src="images/back/yes.gif" alt=""></td><td><img src="images/back/yes.gif" alt=""></td><td><img src="images/back/yes.gif" alt=""></td><td><img src="images/back/yes.gif" alt=""></td><td>' + res1[i].goods_id + '</td><td>43</td><td>' + res1[i].xuni + '</td><td class="tra1><a href="#"><img src="images/back/icon_view.gif" alt=""></a><a href="javascript:;" onclick= "edit(this)"><img src="images/back/icon_edit.gif" alt=""></a><a href="#"><img src="images/back/icon_copy.gif" alt=""></a><a href="javascript:;" onclick= "remove(this)"><img src="images/back/icon_trash.gif" alt=""></a></td></tr>'
					$("#brfor").after(str);
				}
				$("#totalRecords").html(res.total);
				$("#totalPages").html(res.plus)
				$("#pageCurrent").html(res.pageNO);
			}
		})
function gotoPageNext(){
	var page = parseInt($("#pageCurrent").html()) + 1;
	// var pages = $("#pageCurrent").text()
	if(page >= $("#totalPages").html()){
		page = $("#totalPages").html()
	}
	$.ajax({
			url: '/get',
			type: 'GET',
			data : {
				pageNO : page ,
				perPageCnt : $("#pageSize").attr("value")
			},
			success : function(res){
			
				$(".tra").remove();
				var res1 = res.data;
				var num1 = res.total - 1;
				var len = res.data.length
				for(let i = 0 ; i < len ; i ++){	
					var str = '<tr class="tra"><td><input type="checkbox" name="checkboxes[]" value="174">' + (num1 ++) + '</td><td><span>' + res1[i].goods_name + '</span></td><td>' + res1[i].goods_id + '</td><td>' + res1[i].price + '</td><td><img src="images/back/yes.gif" alt=""></td><td><img src="images/back/yes.gif" alt=""></td><td><img src="images/back/yes.gif" alt=""></td><td><img src="images/back/yes.gif" alt=""></td><td>' + res1[i].goods_id + '</td><td>43</td><td>' + res1[i].xuni + '</td><td class="tra1><a href="#"><img src="images/back/icon_view.gif" alt=""></a><a href="javascript:;" onclick= "edit(this)"><img src="images/back/icon_edit.gif" alt=""></a><a href="#"><img src="images/back/icon_copy.gif" alt=""></a><a href="javascript:;" onclick= "remove(this)" ><img src="images/back/icon_trash.gif" alt=""></a></td></tr>'
					$("#brfor").after(str);
				}
				$("#pageCurrent").html((res.pageNO))
			}
		})

}

function gotoPageLast(){
	var page = parseInt($("#pageCurrent").html()) - 1;
	// var pages = $("#pageCurrent").text()
	if(page <= 1){
		page = 1
	}
	$.ajax({
			url: '/get',
			type: 'GET',
			data : {
				pageNO : page ,
				perPageCnt : $("#pageSize").attr("value")
			},
			success : function(res){
				$(".tra").remove();
				var res1 = res.data;
				var num1 = res.total - 1;
				var len = res.data.length;
				
					for(let i = 0 ; i < len ; i ++){	
					var str = '<tr class="tra"><td><input type="checkbox" name="checkboxes[]" value="174">' + (num1 ++) + '</td><td><span>' + res1[i].goods_name + '</span></td><td>' + res1[i].goods_id + '</td><td>' + res1[i].price + '</td><td><img src="images/back/yes.gif" alt=""></td><td><img src="images/back/yes.gif" alt=""></td><td><img src="images/back/yes.gif" alt=""></td><td><img src="images/back/yes.gif" alt=""></td><td>' + res1[i].goods_id + '</td><td>43</td><td>' + res1[i].xuni + '</td><td class="tra1"><a href="#"><img src="images/back/icon_view.gif" alt=""></a><a href="javascript:;" onclick= "edit(this)"><img src="images/back/icon_edit.gif" alt=""></a><a href="#"><img src="images/back/icon_copy.gif" alt=""></a><a href="javascript:;" onclick= "remove(this)"><img src="images/back/icon_trash.gif" alt=""></a></td></tr>'
					$("#brfor").after(str);
				}
				$("#pageCurrent").html((res.pageNO))	
				
				
				
			}
		})
}


 remove = function (obj){

 	 $(obj).parent().parent(".tra").remove()
var a = $(obj).parent().parent(".tra").children().eq(1).text()
	$.ajax({
		url: '/getremove',
		type: 'GET',
		data : {
				remm : a 
		},
		success : function(res){
			console.log(res)
		}
	})
console.log(a)
 }



edit = function(obj){
	$(".tab").css("display","block")
	$(".tab2").css("display","none")
	$.ajax({
			url : "/list1",
			type : "post",
			data : {
				goos : $(obj).parent().parent(".tra").children().eq(1).text()
			},
			success:function(res){
				console.log(res)
				// if(res.code == 1 ){
				// 	// $(".tab").css("display","none")
				// }else {
				// 	alert("请完善消息")
				// }
				$("#goods_name").val(res[0].goods_name)
				$("#goods_id").val(res[0].goods_id)
				$("#price").val(res[0].price)
				$("#stock").val(res[0].stock)
				$("#xuni").val(res[0].xuni)
			}
		})

}
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
				xuni : $("#xuni").val(),
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

// keyword11  值
// src1  按钮搜索
$("#src1").click(function(){
	var keyword11 = $("#keyword11").val()
	$.ajax({
		url:"/src1",
		type : "post",
		data : {
			a : keyword11
		},
		success:function(res1){
   			$(".tra").remove();
				var len = res1.length;
					for(let i = 0 ; i < len ; i ++){	
					var str = '<tr class="tra"><td><input type="checkbox" name="checkboxes[]" value="174">' + (i +1) + '</td><td><span>' + res1[i].goods_name + '</span></td><td>' + res1[i].goods_id + '</td><td>' + res1[i].price + '</td><td><img src="images/back/yes.gif" alt=""></td><td><img src="images/back/yes.gif" alt=""></td><td><img src="images/back/yes.gif" alt=""></td><td><img src="images/back/yes.gif" alt=""></td><td>' + res1[i].goods_id + '</td><td>43</td><td>' + res1[i].xuni + '</td><td class="tra1"><a href="#"><img src="images/back/icon_view.gif" alt=""></a><a href="javascript:;" onclick= "edit(this)"><img src="images/back/icon_edit.gif" alt=""></a><a href="#"><img src="images/back/icon_copy.gif" alt=""></a><a href="javascript:;" onclick= "remove(this)"><img src="images/back/icon_trash.gif" alt=""></a></td></tr>'
					$("#brfor").after(str);
				}

		}
	})
});


function Page(){
	var page = $("#gotoPage option:selected").val();
	$.ajax({
			url : "/list1",
			type : "post",
			data: {
				condition : "goos_name",
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
     return Num;
}




