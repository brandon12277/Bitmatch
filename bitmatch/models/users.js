import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    name : {
        type: String,
        required  : [true]
    },
    password : {
        type: String,
    },
    email : {
        type: String,
        required : [true],
        unique  :true,
    },
    userProfileSet : {
        type : Boolean
    },
    userDetails : {
        img : [{
            type:String   
       }],
        stack :[{
             type:String   
        }],
        gender: {
            type: String,
            enum: ['male', 'female'],
        },
        about : {
            type:String
        },
        age : {
            type:Number
        }



    },
    communities : [
        {
            commId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Communities', 
                required: true
              },
              role:{
                type : String
              }
        }
    ]



});



const Users = mongoose.models.Users  || mongoose.model('Users',userSchema)



export default Users;