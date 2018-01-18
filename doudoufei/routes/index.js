var express = require('express');
var router = express.Router();
var UserModel = require("../model/User");
var multiparty = require("multiparty");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/api/regist4ajax', function(req, res, next) {
	var username = req.body.username;
	var pwd = req.body.pwd;
	var result = {
		code : 1, 
		message : "登陆成功"
	};
	if(username == "admin" && pwd == "h5h5h5h5"){
		res.json(result)
	} else {
		result.code = -101;
		result.message = "用户名密码错误";
		res.json(result)
	}

});


router.post('/list', function(req, res, next) {

  var goods_name = req.body.goods_name;

  var goods_id = req.body.goods_id;
  var price = req.body.price;
  var xuni = req.body.xuni;
  var stock = req.body.stock;
  var result = {
  	code : 1,
  	message : "添加成功"
  }
function goodsnum(){
	var Num=""; 
    for(var i=0;i<6;i++) { 
        Num += Math.floor(Math.random()*10); 
    } 
     return Num;
}

  var um = new UserModel();
	  um.goods_name = goods_name;
	  um.goods_id = goodsnum();
	  um.price = price;
	  um.xuni = xuni;
	  um.stock = stock;
	  um.flag = 1;
  um.save(function(err){
			if(err) {
				result.code = -110;
				result.message = "添加失败";
			}
	});

});
router.get('/getremove', function(req, res, next) {
  	var remm = req.query.remm;
  	UserModel.remove({goods_name : remm},function(err){
  		if(!err){
  			res.send("删除成功")
  		}
  	})
});

router.get('/backstage', function(req, res, next) {
  res.render('backstage', { title: 'Express' });
});

router.get('/get',function(req,res,next){
	var condition =  1;
	// 注意代码的健壮性
	// 测试中，有异常系测试。 后端最头疼的是异常系测试。
	var pageNO = req.query.pageNO || 1;
	pageNO = parseInt(pageNO);
	var perPageCnt = req.query.perPageCnt || 2;
	perPageCnt = parseInt(perPageCnt);

	var query = UserModel.count({flag : 1}, function(err, count){
		console.log("数量:" + count);
		var plus = Math.ceil(count / perPageCnt)
		var query = UserModel.find({flag:1}).skip((pageNO-1)*perPageCnt).limit(perPageCnt)
		query.exec(function(err, docs){
			var result = {
				total: count,
				data: docs,
				pageNO: pageNO,
				plus : plus
			}
			res.json(result);
		});
	})
	
	
	// 	var query = GoodsModel.find({goods_name: {$regex: condition}}).skip((pageNO-1)*perPageCnt).limit(perPageCnt);
	// 	query.exec(function(err, docs){
	// 		console.log(err, docs);
	// 		var result = {
	// 			total: count,
	// 			data: docs,
	// 			pageNO: pageNO
	// 		}
	// 		res.json(result);
	// 	});
	// })
})

router.post('/list1',function(req,res,next){
	var a = req.body.goos
	console.log(a)
	UserModel.find({goods_name: a},function(err,docs){
		res.send(docs)
	})	
})


router.post('/src1',function(req,res,next){
	var a = req.body.a
	console.log(a)
	UserModel.find({goods_name:{$regex : a}},function(err,docs){
		res.send(docs)
	})	
})

module.exports = router;
