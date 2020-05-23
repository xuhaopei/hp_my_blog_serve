const express = require('express');
const app = express();

// 引入第三方插件
const bodyParser = require('body-parser');
const cors = require('cors');

// 引入自己写的API接口
const apiUser = require('./routers/user')

// 使用第三方插件
app.use(bodyParser.json());                             // 当post请求时，里面的参数可以通过req.body()获取一个对象
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());                                        // 当请求跨域时，允许获取资源

// 使用API接口
app.use(apiUser);

app.listen(3000,()=>{
    console.log("启动服务: localhost:3000")
});
