const dbconnect = require("./config");
const jwt =require("jsonwebtoken");
var bcrypt = require('bcryptjs');
var emailsend=require("../utils/email");
const userRagister = async (req, res) => {
const otp= Math.floor(100000 + Math.random()*900000)
const fname=req.body.fname;
const lname=req.body.lname;
const email=req.body.email;
const mobile=req.body.mobile;
const password=req.body.password;
let is_verified=0;
let is_delete=0;
const response=await dbconnect.main();
const findData =await response.findOne({email});
if(findData==null){
    
    let salt = await bcrypt.genSaltSync(10);
    let hashPassword=await bcrypt.hash(password,salt)
    const data=await response.insertOne({fname:fname,lname:lname,email:email,
        mobile:mobile,password:hashPassword,otp,is_verified,is_delete});
        let emailSendFunction=await emailsend.mail(email,otp,fname)
        res.send({message:"register successfully",status:1})
}
else{
    res.send({message:"you are alredy register",status:0})
}
    console.log("alldata", findData);

    // if(findData.length > 0) {
    //     res.send({message:"email is already ragisterd please enter unique email",status:0});
    //     }
    // else if(data){
    //     res.send({message:"ragistered sucessfully ",data:data,status:1});
    // }
    // else{
    //     res.send({message:"not registered please try again",status:0});
    // }
};
const verifiedCode=async(req,res)=>{
    let {email,otp}=req.body;
    let response=await dbconnect.main();
    let findData=await response.findOne({email});
    if(findData){
        console.log("satish",findData.is_verified==true)
        if(findData.is_verified==false){
            console.log("code",otp)
            if(findData.otp==otp){
                // console.log("code",code)
                let updateOtp=response.updateOne({email:email},{$set:{is_verified:1}});
                res.json({message:'otp verified successfully',status:1,otp});
            }
            else{
                res.send({message:"Code Does Not Matched Please Enter Valid Code",status:0});
            }
        }
        else{
            res.send({message:"email already verified"});
        }
    }
    else{
        res.send({message:"You Are Not Exit please First SignUp"})
    }
}
 const resetEmailOtp=async(req,res)=>{
    const email=req.body.email;
    const response=await dbconnect.main();
    const findData=await response.findOne({email});
    console.log(findData)
    if(findData==null){
        res.send({message:"email not found",status:0});
    }
    else{
        const data=
        res.send({message:"email is find"});
    }
}
const userLogin=async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const response=await dbconnect.main();
    const data=await response.find({email}).toArray();
    if(data.length>0)
    {
        res.send({message:"login successfully",data:data,status:1});
    }
    else{
        res.send({message:"email and password does not mathed",status:0});
    }
};

const userProfileController=async(req,res)=>{
    const email="satesh7415@gmail.com";
    const response=await dbconnect.main();
    console.log("yeah",req.file)
    var profile_name=req.file.originalname;
    console.log("sat",profile_name)
    const data=await response.find({email}).toArray();

    if(data){
        if(!req.file){
            res.send({message:"please select an image to upload"})
        }
        else{
            const data = response.updateOne({email:email},{$set:{profile_Pic:profile_name}});
            res.send({message:"Profile uploaded",status:1,data:data});
        } 
        
    }
    else{
        res.send({message:"profile photo not uploaded",status:0});
    }
}
const findmobile=async(req,res)=>{
    const lname=req.body.lname;
    const response=await dbconnect.main();
    const find=await response.find({lname:lname}).toArray();
    const findtmobil=find[0].mobile;
    console.log("satish",find[0].email)
    res.send({message:"yeah bro",findtmobil,status:1});
}

const login=async(req,res)=>{
const name=req.body.name;
const email=req.body.email;
const password=req.body.password;
const mobile=req.body.mobile;
const token=jwt.sign({_id:this._id },"mytoken");
const response=await dbconnect.main();
const data = await response.insertOne({token,name: name, email: email, password: password, mobile});  
// const token= jwt.sign({_id:"6433cff598166df76a990f29" },"mytoken");
// console.log("my token",token)
// const userver=await jwt.verify(token,"mytoken");
// console.log("verify",userver);
}


// module.exports={login};
module.exports={userRagister,userLogin,userProfileController,findmobile,login,verifiedCode,resetEmailOtp}