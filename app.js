const express = require('express');
const app = express();

// 引入第三方插件
const bodyParser = require('body-parser');
const session = require('express-session')
const cors = require('cors');                       


// 引入自己写的API接口
const userService = require('./routers/userService');
const directoryService = require('./routers/directoryService');
const apiArticleService = require('./routers/articleService');

// 使用中间件
app.use(bodyParser.json());                             // 当post请求时，里面的参数可以通过req.body()获取一个对象
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());                                        // 当请求跨域时，允许获取资源
app.use(session({                       // 设置登录的验证方式之一 session 另外一种是token
    secret: 'keyboard cat',             // 用于数字签名 必须要
    resave: false,                      // 即使session没有被修改，也保存session值，默认为true
    saveUninitialized: false,           // 强制未初始化的session保存在存储区,保存新创建但未修改的session
    cookie: {                           // 设置cookie
        path: '/',                      // cookie的使用路径
        httpOnly: false,                // 如果您在cookie中设置了HttpOnly属性，那么通过js脚本将无法读取到cookie信息，这样能有效的防止XSS攻击
        secure: false,                  // 设置cookie在https传输 如果是http协议 则无法传输
        maxAge: 6000,                   // 设置cookie的失效时间
    }
}))

// 测试


// 使用API接口
app.use(userService);
app.use(directoryService);
app.use(apiArticleService);

app.set('trust proxy', 1) // trust first proxy

app.listen(3000,()=>{
    console.log("启动服务: localhost:3000")
});
