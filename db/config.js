const {MongoClient}=require("mongodb");
const url="mongodb://127.0.0.1:27017";
const dbase ="newrealstate";
const main=async()=>{
    const client=new MongoClient(url);
    const result=await client.connect();
    const db=result.db(dbase);
    const users=db.collection("user");
    return users;

}
module.exports={main}