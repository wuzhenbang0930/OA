var express = require('express');
var router = express.Router();
var UserModel = require("../model/User");

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

  var um = new UserModel();
	  um.goods_name = goods_name;
	  um.goods_id = goods_id;
	  um.price = price;
	  um.xuni = xuni;
	  um.stock = stock;
  um.save(function(err){
			if(err) {
				result.code = -110;
				result.message = "添加失败";
			}
	});

});

router.get('/backstage', function(req, res, next) {
  res.render('backstage', { title: 'Express' });
});

router.get('/get',function(req,res,next){
	UserModel.find({},function(err,docs){
		res.send(docs)
	})
})

router.post('/list1',function(req,res,next){
	
	var page = req.body.page;
	var b = UserModel.find({}).limit(3).skip((page-1)*3).exec()
	// console.log(b)
})

module.exports = router;
