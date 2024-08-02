import mongoose, { Schema } from "mongoose"
import { Moo_Lah_Lah } from "next/font/google";

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
        location :{
            type: String
        },
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
        education  : [{
            index : Number,
            university : String,
            branch: String
        }],
        ImpLinks  : [{
            index : Number,
            linkType : String,
            url : String
         }],
        about : {
            type:String
        },
        age : {
            type:Number
        },
        workExp :{
            type:Number
        },
        currentJob:{
            type:String
        },
        currentTitle:{
            type:String
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