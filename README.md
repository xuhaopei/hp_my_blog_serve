# hp_my_blog_serve

## 0后台设计

采用了MVC+DAO+Service模式的设计，增强了后台服务器的可维护性。

## 1目录结构




```
app.js   // 服务器入口
public   // 公共静态资源
routers  // 存放各种请求处理
sql		 // 操作数据库
```

### app.js

后台项目的入口

### public

存放浏览器可以直接访问的文件

### routers

存放各种请求处理

#### userService.js

存放了对数据库中对user表的业务操作

#### directoryService.js

存放了对数据库中对directory表的业务操作

#### articleService.js

存放了对数据库中对article表的业务操作

### sql

各个数据库底层的操作

#### MongoDb

对mongodb数据库底层的操作

##### views

对各个表的进行增删改查

###### userDao.js

对user表进行增删改查的详细操作

###### directoryDao.js

对directory表进行增删改查的详细操作

###### articleDao.js

对article表进行增删改查的详细操作

##### hp_MongoDbBase.js

对MongoDb数据库的基础操作，设置与连接

#### MySql

对mysql数据库底层的操作

##### views

对各个表的进行增删改查

###### userDao.js

对user表进行增删改查的详细操作

## 数据库设计

### MongoDb数据库

#### hp_my_blog_serve



##### Directory表

| 字段名     | 是否可为空 | 数据类型 | 默认值       | 备注                                                         |
| ---------- | ---------- | -------- | ------------ | ------------------------------------------------------------ |
| _id        | 否         | String   | 系统自动生成 | 目录唯一ID                                                   |
| title      | 否         | String   |              | 目录名                                                       |
| titleId    | 否         | String   |              | 目录ID                                                       |
| smallItems | 否         | Array    |              | 这个数组类型包含了表article里面数据的ID名和articleName和目录 |

##### Article表

| 字段名         | 是否可为空 | 数据类型 | 默认值       | 备注         |
| -------------- | ---------- | -------- | ------------ | ------------ |
| _id            | 否         | String   | 系统自动生成 | 文章唯一ID   |
| articleId      | 否         | String   |              | 文章ID       |
| articleName    | 否         | String   |              | 文章名       |
| articleContent | 否         | String   |              | 文章内容     |
| zone           | 否         | String   |              | 文章所属区域 |
| creatDate      | 否         | Date     | Date.now     | 文章生成时间 |
| read           | 否         | Stirng   | 0            | 文章阅读次数 |



### MySql数据库

#### hp_my_blog_serve

##### User表

| 字段名    | 是否可为空 | 数据类型 | 默认值       | 备注             |
| --------- | ---------- | -------- | ------------ | ---------------- |
| _id       | 否         | String   | 系统自动生成 | 用户唯一ID       |
| userName  | 否         | String   |              | 用户名           |
| email     | 否         | String   |              | 用户邮箱         |
| password  | 否         | String   |              | 用户密码         |
| authority | 否         | Number   | 0            | 用户权限         |
| creatDate | 否         | Date     | Date.now     | 用户账号生成时间 |

Article表

| 字段名    | 是否可为空 | 数据类型 | 默认值       | 备注                                  |
| --------- | ---------- | -------- | ------------ | ------------------------------------- |
| id        | 否         | Int      | 系统自动生成 | 唯一ID                                |
| pid       | 否         | int      |              | 目录的上级目录ID                      |
| path      | 否         | String   |              | 关键路径，根据这个生成图形树          |
| name      | 否         | String   |              | 目录或者文章的名字                    |
| articleId | 否         | Number   | 0            | 如果为0则为目录，如果是其它值则为文章 |



## API设计

### 对用户操作的API

| 路径           | 方法 | get参数 | post参数                | 是否需要验证token | 功能     | 状态码                                    |
| -------------- | ---- | ------- | ----------------------- | ----------------- | -------- | :---------------------------------------- |
| /user/login    | post |         | username,password       |                   | 用户登录 | 200成功，500服务器有问题，404不存在此接口 |
| /user/register | post |         | username,email,password |                   | 用户注册 | 200成功，500服务器有问题，404不存在此接口 |
|                |      |         |                         |                   |          |                                           |

### 对目录操作的API

| 路径                       | 方法 | get参数 | post参数       | 是否需要验证token | 功能                  | 状态码                                    |
| -------------------------- | ---- | ------- | -------------- | ----------------- | --------------------- | :---------------------------------------- |
| /Directory/getAllDirectory | get  |         |                | 需要              | 获取所有目录信息      | 200成功，500服务器有问题，404不存在此接口 |
| /Directory/updateDirectory | post |         | title，obj对象 | 需要              | 根据title更新目录信息 | 200成功，500服务器有问题，404不存在此接口 |
|                            |      |         |                |                   |                       |                                           |

### 对文章操作的API

| 路径             | 方法 | get参数 | post参数                                         | 是否需要验证token | 功能               | 状态码                                    |
| ---------------- | ---- | ------- | ------------------------------------------------ | ----------------- | ------------------ | :---------------------------------------- |
| /Article/find    | get  | id      |                                                  | 需要              | 根据文章id查询文章 | 200成功，500服务器有问题，404不存在此接口 |
| /Article/findAll | get  |         |                                                  | 需要              | 查询所有文章       | 200成功，500服务器有问题，404不存在此接口 |
| /Article/update  | post |         | id,articleName,articleContent,zone,articleAutho  | 需要              | 根据文章id更新文章 | 200成功，500服务器有问题，404不存在此接口 |
| /Article/add     | post |         | id,articleName,articleContent,zone,articleAuthor | 需要              | 添加文章           | 200成功，500服务器有问题，404不存在此接口 |
| /Article/delete  | get  | id      |                                                  | 需要              | 删除文章           | 200成功，500服务器有问题，404不存在此接口 |

### 

