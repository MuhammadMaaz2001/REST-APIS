const mongoose =  require("mongoose");
const validator  = require("validator");

const userSchema = new mongoose.Schema({
    firstname: {
        type:String,
        require:true, 
        trim:true,   
        minlength: 3, 
        maxlength: 10
      }, 
      lastname:  {
        type :String, 
        require:true,
        trim:true,
        minlength: 4,
        maxlength: 8
      },
      username: {type: String,
         require:true,
         trim:true,
         unique : [true,"username already exists"],   // unique username must have unique value
         minlength: 4,
         maxlength: 8,
        
        },
      Email: {type :String,
        require:true,
        trim:true,
        unique :[true,"Email already exists"] ,     // unique email must have unique value
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")

            }
        }
      },
      Password: {
        type :String,
        require:true,
        minlength: 8,
        maxlength: 12 
      }
})

//we will create a new collection 
const User = new mongoose.model('User',userSchema);

module.exports = User;