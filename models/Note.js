import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
    {
    title : {
        type: String,
        required: true,
        maxLength: 100
    }, 

    content : {
        type : String,
        required: true,
        maxLength: 5000
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt: {
        type : Date,
        default : Date.now
    }
},
);

NotesSchema.pre("save" , function(next){
    this.updatedAt = Date.now()
    next()
})

export default mongoose.model("Note" , NotesSchema)

