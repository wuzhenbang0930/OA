var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = new Schema({
    goods_name   : String,
    goods_id     : Number,
    price        : Number,
    stock        : Number,
    xuni        : Number,
    flag        :Number, 
    create_date: { type: Date, default: Date.now }
});
// 创建model对象
var UserModel = mongoose.model('ddf', User);
// 公开对象，暴露接口
module.exports = UserModel;