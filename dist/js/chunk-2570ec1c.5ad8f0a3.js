(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2570ec1c"],{"4ec8":function(e,r,s){},5363:function(e,r,s){"use strict";s.r(r);var t=function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{staticClass:"RegisterByEle",on:{click:function(r){return r.target!==r.currentTarget?null:e.$router.push("/")}}},[s("div",{staticClass:"form-warpper"},[s("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"center"}},[s("h1",[e._v("注册")])]),s("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"center"}},[s("el-col",{attrs:{span:24}},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"姓名",prop:"userName"}},[s("el-input",{model:{value:e.ruleForm.userName,callback:function(r){e.$set(e.ruleForm,"userName",r)},expression:"ruleForm.userName"}})],1),s("el-form-item",{attrs:{label:"学校",prop:"school"}},[s("el-cascader",{attrs:{options:e.schools,props:{expandTrigger:"hover"}},model:{value:e.ruleForm.school,callback:function(r){e.$set(e.ruleForm,"school",r)},expression:"ruleForm.school"}})],1),s("el-form-item",{attrs:{label:"专业",prop:"major"}},[s("el-cascader",{attrs:{options:e.majors,props:{expandTrigger:"hover"}},model:{value:e.ruleForm.major,callback:function(r){e.$set(e.ruleForm,"major",r)},expression:"ruleForm.major"}})],1),s("el-form-item",{attrs:{label:"年级",prop:"class"}},[s("el-select",{attrs:{placeholder:"请选择您的年级"},model:{value:e.ruleForm.class,callback:function(r){e.$set(e.ruleForm,"class",r)},expression:"ruleForm.class"}},e._l(e.classes,(function(e,r){return s("el-option",{key:r,attrs:{label:e,value:e}})})),1)],1),s("el-form-item",{attrs:{label:"性别",prop:"sex"}},[s("el-select",{attrs:{placeholder:"请选择您的性别"},model:{value:e.ruleForm.sex,callback:function(r){e.$set(e.ruleForm,"sex",r)},expression:"ruleForm.sex"}},[s("el-option",{attrs:{label:"男",value:"男"}}),s("el-option",{attrs:{label:"女",value:"女"}})],1)],1),s("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[s("el-input",{attrs:{type:"email"},model:{value:e.ruleForm.email,callback:function(r){e.$set(e.ruleForm,"email",r)},expression:"ruleForm.email"}})],1),s("el-form-item",{attrs:{label:"密码",prop:"password"}},[s("el-input",{attrs:{type:"password"},model:{value:e.ruleForm.password,callback:function(r){e.$set(e.ruleForm,"password",r)},expression:"ruleForm.password"}})],1),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("立即注册")]),s("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)],1),s("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"center"}},[s("div",{staticClass:"tip-wrapper"},[e._v(" 已有账号？请点击这里的"),s("router-link",{staticStyle:{color:"red"},attrs:{to:"/LoginByEle"}},[e._v("登录")]),e._v("吧 ")],1)])],1)])},l=[],a=s("9261"),o=s("4ad1"),u=s("16e3"),i={data:function(){return{ruleForm:{userName:"",school:"",major:"",class:"",email:"",password:"",sex:""},rules:{userName:[{required:!0,message:"请输入您的名字",trigger:"blur"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"blur"}],school:[{required:!0,message:"请选择学校",trigger:"change"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{required:!0,pattern:/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,message:"请输入正确的邮箱格式",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:8,message:"长度在 6 到 8 个字符",trigger:"blur"}],major:[{required:!0,message:"请选择专业",trigger:"blur"}],class:[{required:!0,message:"请选择您的年级",trigger:"blur"}],sex:[{required:!0,message:"请选择您的性别",trigger:"blur"}]},schools:a["a"],majors:o["a"],classes:[]}},created:function(){this.classes=this.SetClasses()},methods:{submitForm:function(e){var r=this;this.$refs[e].validate((function(e){if(!e)return r.$message.error("注册失败，请重新注册"),!1;Object(u["b"])(r.ruleForm).then((function(e){r.$message({message:"注册成功,请您登录",type:"success"})}),(function(e){r.$message({message:"注册失败，该邮箱已经被注册",type:"error"})}))}))},resetForm:function(e){this.$refs[e].resetFields()},SetClasses:function(){for(var e=new Date,r=[],s=e.getFullYear()-4;s<e.getFullYear();s++)r.push(s+"届");return r}}},m=i,n=(s("6107"),s("2877")),c=Object(n["a"])(m,t,l,!1,null,null,null);r["default"]=c.exports},6107:function(e,r,s){"use strict";var t=s("4ec8"),l=s.n(t);l.a}}]);