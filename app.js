const express = require('express');
const app = express();

// 引入第三方插件
const bodyParser = require('body-parser');
const session = require('express-session')
const cookieParser = require("cookie-parser");
const cors = require('cors');                       


// 引入自己写的API接口
// const filter            = require('./filter/baseFilter');
// const userService       = require('./routers/userService');
// const directoryService  = require('./routers/directoryService');
// const apiArticleService = require('./routers/articleService');
// const apiFileService    = require('./routers/fileService');
// const calenderplanService   = require('./routers/calenderplanService')
const userAdd              = require('./routers/user/add.js');
const userAlter            = require('./routers/user/alter.js');
const userDelete           = require('./routers/user/delete.js');
const userQuery            = require('./routers/user/query.js');

const articleAdd              = require('./routers/article/add.js');
const articleAlter            = require('./routers/article/alter.js');
const articleDelete           = require('./routers/article/delete.js');
const articleQuery            = require('./routers/article/query.js');

const calenderplanAdd              = require('./routers/calenderplan/add.js');
const calenderplanAlter            = require('./routers/calenderplan/alter.js');
const calenderplanDelete           = require('./routers/calenderplan/delete.js');
const calenderplanQuery            = require('./routers/calenderplan/query.js');

const commentAdd              = require('./routers/comment/add.js');
const commentAlter            = require('./routers/comment/alter.js');
const commentDelete           = require('./routers/comment/delete.js');
const commentQuery            = require('./routers/comment/query.js');

const directorAdd              = require('./routers/director/add.js');
const directorAlter            = require('./routers/director/alter.js');
const directorDelete           = require('./routers/director/delete.js');
const directorQuery            = require('./routers/director/query.js');

// 引入自己的网络配置文件
const IpAndPort = require('./net/IpAndPort');

// 使用中间件
app.use(bodyParser.json({"limit":"10000kb"}));             // 当post请求时，里面的参数可以通过req.body()获取
// app.use(bodyParser.urlencoded({"limit":"10000kb"}));
// // app.use(cors({                                       // 当请求跨域时，如果要设置身份验证 需要用到这个配置选项
// //     credentials: true, 
// //     origin: 'http://192.168.0.130:8080',             //指定跨域资源只有这个地址可以获取。
// // }));    
app.use(cors());    
// app.use(cookieParser());
// app.use(session({                       // 设置登录的验证方式之一 session 另外一种是token
//     secret: 'keyboard cat',             // 用于数字签名 必须要
//     resave: false,                      // 即使session没有被修改，也保存session值，默认为true
//     saveUninitialized: false,           // 强制未初始化的session保存在存储区,保存新创建但未修改的session
//     cookie: {                           // 设置cookie
//         path: '/',                      // cookie的使用路径
//         httpOnly: false,                // 如果您在cookie中设置了HttpOnly属性，那么通过js脚本将无法读取到cookie信息，这样能有效的防止XSS攻击
//         secure: false,                  // 设置cookie在https传输 如果是http协议 则无法传输
//         maxAge: 6000,                   // 设置cookie的失效时间
//     }
// }))


// 开放静态资源
app.use('/public/',express.static('./public')); // 以 /public/ 开头的url 都会到后面的文件夹public查找
app.use(express.static('./dist')); 

// 使用API接口
// app.use(userService);
// app.use(directoryService);
// app.use(apiArticleService);
// app.use(apiFileService);
// app.use(calenderplanService);
// app.use(filter);
app.use(userAdd);
app.use(userAlter);
app.use(userDelete);
app.use(userQuery);

app.use(articleAdd);
app.use(articleAlter);
app.use(articleDelete);
app.use(articleQuery);

app.use(calenderplanAdd);
app.use(calenderplanAlter);
app.use(calenderplanDelete);
app.use(calenderplanQuery);

app.use(commentAdd);
app.use(commentAlter);
app.use(commentDelete);
app.use(commentQuery);

app.use(directorAdd);
app.use(directorAlter);
app.use(directorDelete);
app.use(directorQuery);

// 测试

app.set('trust proxy', 1) // trust first proxy

app.listen(IpAndPort.port,()=>{
    console.log(`启动服务: ${IpAndPort.ip}:${IpAndPort.port}`);
});
