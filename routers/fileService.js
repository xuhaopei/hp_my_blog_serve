const epxress = require('express');
const formidable = require("formidable");
const fs = require('fs');
const path = require("path");

//const User = require('../sql/MongoDb/views/userDao');       // 引用mongoDB
const apiRouter = require('./baseRouter');
const IpAndPort = require('../net/IpAndPort');

const routerPath = apiRouter.files;
const router = epxress.Router();

router.post(routerPath.uploadImage, (req, res, next) => {
  var form = new formidable.IncomingForm();
  var uploadDir = path.normalize(__dirname + '/' + "../public/image");  // 设置存放图片的文件夹
  
  form.uploadDir = uploadDir;
  
  // 将图片写入图片系统 files代表的是所有的图片对象，也就是前端传给我们的图片集合
  form.parse(req, function (err, fields, files) {
    
    // 代码执行到此处时（22行的时候），图片已经写入了我们的服务端的电脑，但是没有后缀名且没有将图片返回给前端。

    // 这里我们需要将图片修改成有后缀名，且将图片地址传给我们的客户端。
    for (item in files) {
      (function () {
        let image = files[item];    
        var oldname = image.path;                               // 获取服务器电脑上图片的地址
        var newname = oldname + "." + image.name.split('.')[1]; // 将服务器电脑上图片的地址修改成有后缀名（这个后缀名与前端上传的图片格式一致）
        
        fs.rename(oldname, newname, function (err) {            // 进行修改
          if (err) console.log(err);
          // 回传给客户端
          
          /* 针对window操作系统的 */
          //newname = newname.split('\\');
          //let imageUrl = `http:${IpAndPort.ip}:${IpAndPort.port}` +'/' + newname[newname.length - 3] + '/' + newname[newname.length - 2] + '/' + newname[newname.length - 1];
          
          /**针对linux操作系统 */
          newname = newname.split('/');
          let imageUrl = `/${newname[newname.length - 3]}/${newname[newname.length - 2]}/${newname[newname.length - 1]}`
          
          let image = {};
          image.errno = 0;
          image.data = [];
          image.data.push(imageUrl);
          return res.send(image);
        })
      })();
    }
  })
})
module.exports = router;