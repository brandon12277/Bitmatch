import mongoose, { Schema } from "mongoose"

const LikeSchema = new Schema({
    liked_by : {
        type: String,
        required  : [true]
    },
    liked : {
        type: String,
        required  : [true]
    },
    like : Boolean
});

mongoose.deleteModel("Likes")

const Likes = mongoose.models.Likes  || mongoose.model('Likes',LikeSchema)



export default Likes;