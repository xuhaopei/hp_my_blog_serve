const epxress = require('express');
const formidable = require("formidable");
const fs = require('fs');
const path = require("path");
const hp_jwt = require('../../validate/token.js');
const router = epxress.Router();
const os = require('os');
router.post('/imageAdd', (req, res, next) => {

    // 这里判断用户权限
    let token = hp_jwt.validateToken(req.headers.token);
    if (token === null) {
        res.status(401).send('上传失败，请您登录');
        return;
    }

    // 这里设置想把图片存放在哪里。
    const uploadDir = path.normalize(__dirname + '/' + "../../public/image");

    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;

    form.parse(req, function (err, fields, files) {
        for (item in files) {
            (function () {
                let image = files[item];
                let oldname = image.path;

                // 这里修改文件名                            
                let newname = oldname + "." + image.name.split('.')[1];

                fs.rename(oldname, newname, function (err) {
                    if (err) console.log(err);
                    let platform = os.platform();
                    newname = platform === 'win32' ? newname.split('\\') : newname.split('/');

                    // 这里获取服务器上图片的地址返回给前端
                    //let imageUrl = `http:${IpAndPort.ip}:${IpAndPort.port}` + '/' + newname[newname.length - 3] + '/' + newname[newname.length - 2] + '/' + newname[newname.length - 1];
                    let imageUrl = `/${newname[newname.length - 3]}/${newname[newname.length - 2]}/${newname[newname.length - 1]}`;

                    let image = {};
                    image.errno = 0;
                    image.data = [];
                    image.data.push(imageUrl);
                    return res.status(200).send(image);
                })
            })();
        }
    })
})

/************************服务器报错*************************************/
router.use((err, req, res, next) => {
    if (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router;