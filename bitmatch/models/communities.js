import mongoose, { Schema } from "mongoose"

const Communities = new Schema({
    name : String,
    
    descp : String,
    
    type : {
        
            type: String,
            enum: ['male', 'female'],
       

    },
    img : String,
    
    
    stack :[{
        type:String   
   }],
    
    users : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users', 
            required: true
        }

    ],

    commChatId : String,
    
    messages: [{

        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users', 
          required: true
        },
        senderImg : {
            type  : String
        },
        text: {
          type: String,
          required: true
        },
      }]



});

mongoose.deleteModel("Communities")


const Comms = mongoose.models.Communities  || mongoose.model('Communities',Communities)



export default Comms;