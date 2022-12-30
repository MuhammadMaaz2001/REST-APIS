const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/noice" ,{
   
   //useCreateIndex:true
    useNewUrlParser:true,
    useUnifiedTopology:true,
     /*the MongoDB driver will try to find a server to send any 
    given operation to, and keep retrying for serverSelection*/
    
}).then(()=>{
    console.log("connection is successful");
}).catch((e)=>{
    console.log("No connection"); 
})