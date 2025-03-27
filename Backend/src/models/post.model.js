import mongoose, {Schema} from "mongoose";

const postSchema = new Schema({
    postName: {
        type: String,
        required: true
    },
    postDescriptin: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
})

export const Post = mongoose.model("Post", postSchema)