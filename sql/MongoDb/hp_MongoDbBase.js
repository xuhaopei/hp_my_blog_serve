var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hp_my_blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});  // 创建数据库test 它的位置在D:/data/db里面 这跟之前设置的路径有关系。 

// 创建连接
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("数据库连接成功")
});

module.exports = mongoose;

