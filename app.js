const express = require("express");
require("./db/conn");
const User = require("./models/user");


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post("/user",async(req,res)=>{
    
    try{const user = new User(req.body);
        const createUser = await user.save();
        res.send(createUser);
         res.status(201)}
         catch(e){
              res.status(400).send(e);
         }
})


app.get("/user",async(req,res)=>{
    
    try{
        const userData = await User.find();
        res.send(userData);
    }
         catch(e){
              res.send(e);
         }
})

app.get("/user/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const  userData = await User.findById(_id); // findById returns the document where the _id field matches the specified id 
        if (!userData){
            return res.status(404).send();
        }else{
            res.send(userData);
        }
    }catch(e){
        res.send(e);
        res.send(500);
    }
})

app.patch("/user/:id", async(req,res)=>{
    try{
     const _id = req.params.id;
    const updateUser  = await User.findByIdAndUpdate(_id,req.body,{ new : true});
    /*The findByIdAndUpdate() function is used to find a matching document, 
    updates it according to the update arg, passing any options, 
    and returns the found document */
  
    res.send(updateUser);
    }catch(e){
        res.status(400);
        res.send(e);

    }
})

app.delete("/user/:id", async(req,res)=>{
    try{
     
    const deleteUser = await User.findByIdAndDelete(req.params.id);
     // The findByIdAndDelete() function is used to find a matching document, removes it
   if(!req.params.id){ 
      return res.status(400).send();
   }
    res.send(deleteUser);
    }catch(e){
        res.status(500);
        res.send(e);
    }
})

app.get("/search/:key",async(req,res)=>{
let data = await User.find(
    {
        "$or":[
            {firstname : {$regex : req.params.key}}, 
            {lastname : {$regex : req.params.key}},
            {username : {$regex : req.params.key}},
            {Email : {$regex : req.params.key}}
        ]  
        /* An object containing parameter values parsed from the URL path
        For example if you have the route /user/:name , then the "name" from 
        the URL path wil be available as req.params.name
        */
    }
)

  res.send(data);
})
 
app.listen(port,()=>{
    console.log("connected..");
})