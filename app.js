const express = require('express');
const app = express();
const path = require("path");
const os = require('os');

// 引入第三方插件
const bodyParser = require('body-parser');
const session = require('express-session')
const cookieParser = require("cookie-parser");
const cors = require('cors');                       


// 引入自己写的API接口
const userService       = require('./routers/userService');
const directoryService  = require('./routers/directoryService');
const apiArticleService = require('./routers/articleService');
const apiFileService    = require('./routers/fileService');
const filter            = require('./filter/baseFilter');

// 引入自己的网络配置文件
const IpAndPort = require('./net/IpAndPort');

// 使用中间件
app.use(bodyParser.json());                             // 当post请求时，里面的参数可以通过req.body()获取一个对象
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors({                                       // 当请求跨域时，如果要设置身份验证 需要用到这个配置选项
//     credentials: true, 
//     origin: 'http://192.168.0.130:8080',             //指定跨域资源只有这个地址可以获取。
// }));    
app.use(cors());    
app.use(cookieParser());
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


// 开放静态资源
app.use('/public/',express.static('./public')); // 以 /public/ 开头的url 都会到后面的文件夹public查找
app.use(express.static('./dist')); 

// 使用API接口
app.use(filter);
app.use(userService);
app.use(directoryService);
app.use(apiArticleService);
app.use(apiFileService);



// 测试

app.set('trust proxy', 1) // trust first proxy

app.listen(IpAndPort.port,()=>{
    console.log(`启动服务: ${IpAndPort.ip}:${IpAndPort.port}`);
});
