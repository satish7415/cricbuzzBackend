var express = require('express');
var app=express();
var router = express.Router();
var userController=require("../db/index");
var multer=require("multer");

app.use(express.urlencoded({extended: false})); //it's parse from  data

var storage=multer.diskStorage({destination: function(req,file,cb){
  cb(null,"public/uploads/")},
  filename : function(req,file,cb){
    cb(null,file.originalname);
  }
});
var upload=multer({storage:storage});
router.post("/uploadFile",upload.single("avatar"),userController.userProfileController)
router.post("/ragister",userController.userRagister);
router.post("/login",userController.userLogin);
router.get("/findEmail",userController.findmobile);
router.post("/yeahbro",userController.login);
router.post("/verified",userController.verifiedCode);
router.post("/resetEmailOtp",userController.resetEmailOtp);
module.exports = router;
