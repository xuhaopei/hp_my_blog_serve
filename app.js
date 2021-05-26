const express = require('express');
const app = express();

// 引入第三方插件
const bodyParser = require('body-parser');
const cors = require('cors');

// 引入监听的路由
const userAdd = require('./routers/user/add.js');
const userAlter = require('./routers/user/alter.js');
const userDelete = require('./routers/user/delete.js');
const userQuery = require('./routers/user/query.js');

const articleAdd = require('./routers/article/add.js');
const articleAlter = require('./routers/article/alter.js');
const articleDelete = require('./routers/article/delete.js');
const articleQuery = require('./routers/article/query.js');

const calenderplanAdd = require('./routers/calenderplan/add.js');
const calenderplanAlter = require('./routers/calenderplan/alter.js');
const calenderplanDelete = require('./routers/calenderplan/delete.js');
const calenderplanQuery = require('./routers/calenderplan/query.js');

const commentAdd = require('./routers/comment/add.js');
const commentAlter = require('./routers/comment/alter.js');
const commentDelete = require('./routers/comment/delete.js');
const commentQuery = require('./routers/comment/query.js');

const directorAdd = require('./routers/director/add.js');
const directorAlter = require('./routers/director/alter.js');
const directorDelete = require('./routers/director/delete.js');
const directorQuery = require('./routers/director/query.js');

const imageAdd =  require('./routers/image/add.js');

// 引入自己的网络配置文件
const IpAndPort = require('./net/IpAndPort');

app.use(bodyParser.json({
    "limit": "10000kb"
}));     
//app.use(cors());



// 开放静态资源
app.use('/public/', express.static('./public')); // 以 /public/ 开头的url 都会到后面的文件夹public查找
app.use(express.static('./dist'));

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

app.use(imageAdd);


app.listen(IpAndPort.port, () => {
    console.log(`启动服务: ${IpAndPort.ip}:${IpAndPort.port}`);
});