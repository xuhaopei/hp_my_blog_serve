(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a3560212"],{"6d2b":function(e,r,t){"use strict";var s=t("bcfb"),a=t.n(s);a.a},bbd5:function(e,r,t){"use strict";t.d(r,"a",(function(){return a}));var s=t("e799");function a(e,r){return s["a"].post(e,r)}},bcfb:function(e,r,t){},fdd9:function(e,r,t){"use strict";t.r(r);var s=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"EditUser"},[t("el-row",{staticClass:"EditUser-content"},[t("el-col",{attrs:{span:12,offset:6}},[t("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"center"}},[t("h1",[e._v("修改信息")])]),t("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"center"}},[t("el-col",{attrs:{span:24}},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"姓名",prop:"name"}},[t("el-input",{model:{value:e.ruleForm.userName,callback:function(r){e.$set(e.ruleForm,"userName",r)},expression:"ruleForm.userName"}})],1),t("el-form-item",{attrs:{label:"学校",prop:"school"}},[t("el-cascader",{staticStyle:{width:"100%"},attrs:{options:e.schools,props:{expandTrigger:"hover"},size:"medium"},model:{value:e.ruleForm.school,callback:function(r){e.$set(e.ruleForm,"school",r)},expression:"ruleForm.school"}})],1),t("el-form-item",{attrs:{label:"专业",prop:"major"}},[t("el-cascader",{staticStyle:{width:"100%"},attrs:{options:e.majors,props:{expandTrigger:"hover"}},model:{value:e.ruleForm.major,callback:function(r){e.$set(e.ruleForm,"major",r)},expression:"ruleForm.major"}})],1),t("el-form-item",{attrs:{label:"年级",prop:"class"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择年级"},model:{value:e.ruleForm.class,callback:function(r){e.$set(e.ruleForm,"class",r)},expression:"ruleForm.class"}},[t("el-option",{attrs:{label:"2017届",value:"2017届"}}),t("el-option",{attrs:{label:"2018届",value:"2018届"}}),t("el-option",{attrs:{label:"2019届",value:"2019届"}}),t("el-option",{attrs:{label:"2020届",value:"2020届"}})],1)],1),t("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[t("el-input",{attrs:{type:"email"},model:{value:e.ruleForm.email,callback:function(r){e.$set(e.ruleForm,"email",r)},expression:"ruleForm.email"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{attrs:{type:"password"},model:{value:e.ruleForm.password,callback:function(r){e.$set(e.ruleForm,"password",r)},expression:"ruleForm.password"}})],1),t("el-form-item",{attrs:{label:"权限",prop:"right"}},[t("el-select",{attrs:{placeholder:"请设置权限"},model:{value:e.ruleForm.authority,callback:function(r){e.$set(e.ruleForm,"authority",r)},expression:"ruleForm.authority"}},[t("el-option",{attrs:{label:"管理员",value:1}}),t("el-option",{attrs:{label:"普通用户",value:0}})],1)],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("修改")]),t("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)],1)],1)],1)],1)},a=[],l=(t("bbd5"),t("39e0")),o=t("acbd"),i=t("16e3"),u={name:"article-titleList",components:{},model:{},props:{user:{}},data:function(){return{ruleForm:{},rules:{userName:[{required:!0,message:"请输入您的名字",trigger:"blur"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"blur"}],school:[{required:!0,message:"请选择学校",trigger:"change"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{required:!0,pattern:/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,message:"请输入正确的邮箱格式",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:8,message:"长度在 6 到 8 个字符",trigger:"blur"}],major:[{required:!0,message:"请选择专业",trigger:"blur"}],class:[{required:!0,message:"请选择您的年级",trigger:"blur"}],authority:[{required:!0,message:"请选择权限",trigger:"blur"}]},schools:l["a"],majors:o["a"]}},watch:{$route:function(e,r){this.getData(this.$route.params.id)}},created:function(){this.getData(this.$route.params.id)},methods:{submitForm:function(e){var r=this;this.$refs[e].validate((function(e){if(!e)return r.$message.error("修改失败"),!1;Object(i["g"])(r.$route.params.id,r.ruleForm).then((function(e){r.$message({message:"修改成功",type:"success"})}),(function(e){r.$message.error(e)}))}))},resetForm:function(e){this.$refs[e].resetFields()},getData:function(e){var r=this;Object(i["d"])(e).then((function(e){var t=e.data;r.ruleForm=t,r.ruleForm.major=JSON.parse(t.major),r.ruleForm.school=JSON.parse(t.school)})).catch((function(e){r.$message({type:"error",message:e})}))}}},m=u,n=(t("6d2b"),t("2877")),c=Object(n["a"])(m,s,a,!1,null,null,null);r["default"]=c.exports}}]);
//# sourceMappingURL=chunk-a3560212.c25be66f.js.map