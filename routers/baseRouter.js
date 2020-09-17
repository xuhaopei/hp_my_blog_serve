/**
 * 存放各个路由路径，统一化处理，方便维护
 */

module.exports = {
    articleServilce: {
        add:        '/Article/add',
        find:       '/Article/find',
        findNear:   '/Article/findNear',
        findLike:   '/Article/query',
        findLikeSum:'/Article/queryArticleSum',
        findAll:    '/Article/findAll',
        findSome:   '/Article/findSome',
        findSum:    '/Article/findArticleSum',
        update:     '/Article/update',
        updateRead: '/Article/updateRead',
        delete:     '/Article/delete'
    },
    directoryService: {
        add:        '/Directory/createDirectory',
        findAll:    '/Directory/getAllDirectory',
        update:     '/Directory/updateDirectory',
        delete:     '/Directory/deleteDirectory',
    },
    userService: {
        add:'/user/register',
        find:'/user/login',
    },
    files:{
        uploadImage:'/uploadImage',
        uploadFile:'/uploadFile',
    },
}
